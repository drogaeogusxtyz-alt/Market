import { Link } from "wouter";
import { Star, Download, Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Mod } from "@shared/schema";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";

interface ModCardProps {
  mod: Mod;
  featured?: boolean;
}

export function ModCard({ mod, featured = false }: ModCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(mod);
    toast({
      title: "Adicionado ao carrinho",
      description: `${mod.name} foi adicionado ao seu carrinho.`,
    });
  };

  const discount = mod.originalPrice 
    ? Math.round((1 - mod.price / mod.originalPrice) * 100) 
    : 0;

  return (
    <Link href={`/mod/${mod.id}`} data-testid={`card-mod-${mod.id}`}>
      <Card className={`group overflow-visible border-card-border hover-elevate active-elevate-2 transition-all duration-300 ${featured ? 'lg:col-span-1' : ''}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-md">
          <img
            src={mod.imageUrl}
            alt={mod.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {mod.isFeatured && (
            <Badge className="absolute top-3 left-3 gradient-gaming border-0 text-white">
              Destaque
            </Badge>
          )}
          
          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-green-500 border-0 text-white">
              -{discount}%
            </Badge>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/70 mb-1 truncate">{mod.game}</p>
                <h3 className="font-semibold text-white truncate text-lg">{mod.name}</h3>
              </div>
              <div className="text-right shrink-0">
                {mod.originalPrice && (
                  <p className="text-xs text-white/50 line-through">
                    R$ {mod.originalPrice.toFixed(2)}
                  </p>
                )}
                <p className="font-bold text-white font-mono text-lg">
                  R$ {mod.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 bg-black/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ visibility: discount > 0 ? 'hidden' : 'visible' }}
            data-testid={`button-favorite-${mod.id}`}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
            {mod.shortDescription}
          </p>
          
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                {mod.rating?.toFixed(1) || '0.0'}
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                {mod.downloadCount?.toLocaleString() || 0}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border border-border">
                <AvatarImage src={mod.creatorAvatar || undefined} alt={mod.creator} />
                <AvatarFallback className="text-xs">
                  {mod.creator.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground truncate max-w-[80px]">
                {mod.creator}
              </span>
            </div>
          </div>
          
          <Button 
            className="w-full gradient-gaming border-0 text-white"
            onClick={handleAddToCart}
            data-testid={`button-add-cart-${mod.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ModCardSkeleton() {
  return (
    <Card className="overflow-hidden border-card-border">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-3 bg-muted rounded animate-pulse w-full" />
        <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
        <div className="h-9 bg-muted rounded animate-pulse w-full" />
      </CardContent>
    </Card>
  );
}
