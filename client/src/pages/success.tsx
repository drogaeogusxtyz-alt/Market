import { Link } from "wouter";
import { CheckCircle2, Download, ArrowRight, Mail } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto rounded-full gradient-gaming flex items-center justify-center animate-pulse-slow">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full gradient-gaming opacity-30 blur-xl" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Pagamento Confirmado!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Seu pedido foi processado com sucesso. Você receberá os links de download no e-mail informado.
          </p>

          <Card className="border-card-border mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">E-mail Enviado</h3>
                  <p className="text-sm text-muted-foreground">
                    Verifique sua caixa de entrada
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Download Disponível</h3>
                  <p className="text-sm text-muted-foreground">
                    Acesse seus mods agora
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Tudo Pronto</h3>
                  <p className="text-sm text-muted-foreground">
                    Aproveite seus mods!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button className="gradient-gaming border-0 text-white min-w-[200px]" data-testid="button-continue-shopping">
                Continuar Comprando
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Precisa de ajuda? Entre em contato com nosso suporte: suporte@modstore.com
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
