import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CreditCard, QrCode, Shield, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const checkoutSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  paymentMethod: z.enum(["card", "pix"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  cardName: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, getTotal, clearCart, sessionId } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const total = getTotal();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cardName: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderData = {
        sessionId,
        email: data.email,
        total,
        paymentMethod: data.paymentMethod,
        items: items.map(item => ({
          modId: item.modId,
          price: item.mod.price
        }))
      };
      return apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      clearCart();
      setLocation("/success");
    },
    onError: () => {
      toast({
        title: "Erro ao processar pagamento",
        description: "Tente novamente ou use outro método de pagamento.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de finalizar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    createOrderMutation.mutate(data);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-8">Adicione mods ao carrinho para continuar.</p>
          <Link href="/">
            <Button className="gradient-gaming border-0 text-white" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Explorar Mods
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao carrinho
        </Link>

        <h1 className="text-2xl font-bold mb-8">Finalizar Compra</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-card-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="seu@email.com" 
                              type="email"
                              {...field} 
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Você receberá os links de download neste e-mail.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-card-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Método de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              <Label
                                htmlFor="card"
                                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                                  field.value === "card" 
                                    ? "border-primary bg-primary/5" 
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <RadioGroupItem value="card" id="card" />
                                <CreditCard className="h-5 w-5" />
                                <span className="font-medium">Cartão</span>
                              </Label>
                              <Label
                                htmlFor="pix"
                                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                                  field.value === "pix" 
                                    ? "border-primary bg-primary/5" 
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <RadioGroupItem value="pix" id="pix" />
                                <QrCode className="h-5 w-5" />
                                <span className="font-medium">PIX</span>
                              </Label>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {paymentMethod === "card" && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número do Cartão</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="0000 0000 0000 0000" 
                                  {...field} 
                                  data-testid="input-card-number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome no Cartão</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="NOME COMPLETO" 
                                  {...field} 
                                  data-testid="input-card-name"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardExpiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Validade</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="MM/AA" 
                                    {...field} 
                                    data-testid="input-card-expiry"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cardCvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="123" 
                                    {...field} 
                                    data-testid="input-card-cvc"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "pix" && (
                      <div className="pt-4 border-t border-border">
                        <div className="bg-muted/50 rounded-lg p-6 text-center">
                          <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                            <QrCode className="w-24 h-24 text-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            O QR Code será gerado após confirmar o pedido
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                      <Lock className="h-4 w-4" />
                      <span>Seus dados estão protegidos com criptografia SSL</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-card-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0">
                          <img 
                            src={item.mod.imageUrl} 
                            alt={item.mod.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.mod.name}</p>
                          <p className="text-xs text-muted-foreground">{item.mod.game}</p>
                        </div>
                        <p className="text-sm font-mono shrink-0">R$ {item.mod.price.toFixed(2)}</p>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="font-mono">R$ {total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-4">
                    <Button 
                      type="submit"
                      className="w-full gradient-gaming border-0 text-white min-h-12 text-base"
                      disabled={isProcessing}
                      data-testid="button-pay"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processando...
                        </span>
                      ) : (
                        <>
                          <Shield className="h-5 w-5 mr-2" />
                          Pagar R$ {total.toFixed(2)}
                        </>
                      )}
                    </Button>
                    
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Compra segura
                      </span>
                      <span className="flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        SSL criptografado
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
}
