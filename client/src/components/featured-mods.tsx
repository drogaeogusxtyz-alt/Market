import { Link } from "wouter";
import { ArrowRight, Star, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Mod } from "@shared/schema";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";

interface FeaturedModsProps {
  mods: Mod[];
  isLoading?: boolean;
}

export function FeaturedMods({ mods, isLoading }: FeaturedModsProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent, mod: Mod) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(mod);
    toast({
      title: "Adicionado ao carrinho",
      description: `${mod.name} foi adicionado ao seu carrinho.`,
    });
  };

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-9 w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredMods = mods.filter(m => m.isFeatured).slice(0, 2);

  if (featuredMods.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Em Destaque</h2>
            <p className="text-muted-foreground">Os mods mais populares da semana</p>
          </div>
          <Link href="/?featured=true">
            <Button variant="ghost" className="gap-2" data-testid="button-view-all-featured">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredMods.map((mod) => (
            <Link 
              key={mod.id} 
              href={`/mod/${mod.id}`}
              className="group"
              data-testid={`featured-mod-${mod.id}`}
            >
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden hover-elevate active-elevate-2">
                <img
                  src={mod.imageUrl}
                  alt={mod.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <Badge className="absolute top-4 left-4 gradient-gaming border-0 text-white">
                  Destaque
                </Badge>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/70 mb-1">{mod.game}</p>
                      <h3 className="text-2xl font-bold text-white mb-2 truncate">{mod.name}</h3>
                      <p className="text-sm text-white/70 line-clamp-2 mb-3">{mod.shortDescription}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          {mod.rating?.toFixed(1) || '0.0'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {mod.downloadCount?.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <div className="text-right">
                        {mod.originalPrice && (
                          <p className="text-sm text-white/50 line-through">
                            R$ {mod.originalPrice.toFixed(2)}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-white font-mono">
                          R$ {mod.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <Button 
                        className="gradient-gaming border-0 text-white"
                        onClick={(e) => handleAddToCart(e, mod)}
                        data-testid={`button-featured-add-cart-${mod.id}`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
              }
