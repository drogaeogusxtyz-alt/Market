import { Link } from "wouter";
import { ArrowLeft, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";

export default function Cart() {
  const { items, removeFromCart, getTotal, clearCart } = useCart();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">
              Adicione mods incríveis ao seu carrinho e transforme sua experiência de jogo.
            </p>
            <Link href="/">
              <Button className="gradient-gaming border-0 text-white" data-testid="button-explore">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Explorar Mods
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Seu Carrinho</h1>
            <p className="text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCart}
            className="text-muted-foreground hover:text-destructive"
            data-testid="button-clear-cart"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar carrinho
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-card-border" data-testid={`cart-item-${item.modId}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link href={`/mod/${item.mod.id}`} className="shrink-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-24 rounded-md overflow-hidden bg-muted">
                        <img 
                          src={item.mod.imageUrl} 
                          alt={item.mod.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">{item.mod.game}</p>
                          <Link href={`/mod/${item.mod.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors truncate">
                              {item.mod.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            por {item.mod.creator}
                          </p>
                        </div>
                        
                        <div className="text-right shrink-0">
                          {item.mod.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              R$ {item.mod.originalPrice.toFixed(2)}
                            </p>
                          )}
                          <p className="font-bold font-mono text-lg">
                            R$ {item.mod.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFromCart(item.modId)}
                          className="text-muted-foreground hover:text-destructive"
                          data-testid={`button-remove-${item.modId}`}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-card-border">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.length} itens)</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto</span>
                  <span className="text-green-500">- R$ 0,00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="font-mono">R$ {total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Link href="/checkout" className="w-full">
                  <Button className="w-full gradient-gaming border-0 text-white min-h-12 text-base" data-testid="button-checkout">
                    Finalizar Compra
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/" className="w-full">
                  <Button variant="ghost" className="w-full" data-testid="button-continue-shopping">
                    Continuar Comprando
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
                              }
