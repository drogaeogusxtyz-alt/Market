import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, Star, Download, Clock, FileCode, ShoppingCart, 
  Heart, Share2, Check, ChevronRight
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ModCard, ModCardSkeleton } from "@/components/mod-card";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Mod } from "@shared/schema";

export default function ModDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items } = useCart();
  const { toast } = useToast();

  const { data: mod, isLoading } = useQuery<Mod>({
    queryKey: [`/api/mods/${id}`],
  });

  const { data: relatedMods = [], isLoading: relatedLoading } = useQuery<Mod[]>({
    queryKey: ['/api/mods'],
  });

  const isInCart = items.some(item => item.modId === id);

  const handleAddToCart = () => {
    if (mod) {
      addToCart(mod);
      toast({
        title: "Adicionado ao carrinho",
        description: `${mod.name} foi adicionado ao seu carrinho.`,
      });
    }
  };

  const filteredRelated = relatedMods
    .filter(m => m.id !== id && m.game === mod?.game)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Skeleton className="aspect-video rounded-lg" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-6" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Mod não encontrado</h1>
          <p className="text-muted-foreground mb-8">O mod que você está procurando não existe.</p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Home
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = mod.originalPrice 
    ? Math.round((1 - mod.price / mod.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/?game=${mod.game.toLowerCase().replace(/\s+/g, '')}`} className="hover:text-foreground transition-colors">
              {mod.game}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">{mod.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-3">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={mod.imageUrl}
                  alt={mod.name}
                  className="w-full h-full object-cover"
                />
                {mod.isFeatured && (
                  <Badge className="absolute top-4 left-4 gradient-gaming border-0 text-white">
                    Destaque
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-green-500 border-0 text-white">
                    -{discount}%
                  </Badge>
                )}
              </div>

              {mod.gallery && mod.gallery.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <div className="w-24 h-16 rounded-md overflow-hidden border-2 border-primary shrink-0">
                    <img src={mod.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  {mod.gallery.map((img, i) => (
                    <div key={i} className="w-24 h-16 rounded-md overflow-hidden border border-border shrink-0 hover:border-primary transition-colors cursor-pointer">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <Card className="sticky top-24 border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">{mod.game}</Badge>
                      <h1 className="text-2xl font-bold mb-2">{mod.name}</h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={mod.creatorAvatar || undefined} alt={mod.creator} />
                      <AvatarFallback>{mod.creator.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">por <span className="font-medium">{mod.creator}</span></span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {mod.rating?.toFixed(1) || '0.0'} ({mod.reviewCount || 0} avaliações)
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {mod.downloadCount?.toLocaleString() || 0}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-6">
                    {mod.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        R$ {mod.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-3xl font-bold font-mono text-gradient-gaming">
                      R$ {mod.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full gradient-gaming border-0 text-white min-h-12 text-base"
                      onClick={handleAddToCart}
                      disabled={isInCart}
                      data-testid="button-add-to-cart"
                    >
                      {isInCart ? (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          No Carrinho
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Adicionar ao Carrinho
                        </>
                      )}
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="secondary" className="flex-1" data-testid="button-favorite">
                        <Heart className="h-4 w-4 mr-2" />
                        Favoritar
                      </Button>
                      <Button variant="secondary" size="icon" data-testid="button-share">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <FileCode className="h-4 w-4" />
                        Tamanho
                      </span>
                      <span className="font-medium">{mod.fileSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Versão
                      </span>
                      <span className="font-medium">{mod.version}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
              <TabsTrigger value="description" className="data-[state=active]:bg-background">
                Descrição
              </TabsTrigger>
              <TabsTrigger value="requirements" className="data-[state=active]:bg-background">
                Requisitos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card className="border-card-border">
                <CardContent className="p-6 prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {mod.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requirements" className="mt-6">
              <Card className="border-card-border">
                <CardContent className="p-6">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {mod.requirements || "Este mod não possui requisitos especiais. Basta instalar e jogar!"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {filteredRelated.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Mods Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedLoading ? (
                  Array.from({ length: 4 }).map((_, i) => <ModCardSkeleton key={i} />)
                ) : (
                  filteredRelated.map((m) => <ModCard key={m.id} mod={m} />)
                )}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
