import { Shield, Zap, Headphones, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const trustItems = [
  {
    icon: Shield,
    title: "Pagamento Seguro",
    description: "Suas transações são protegidas com criptografia de ponta a ponta via Stripe."
  },
  {
    icon: Zap,
    title: "Download Instantâneo",
    description: "Após a confirmação do pagamento, acesse seus mods imediatamente."
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Nossa equipe está sempre disponível para ajudar você."
  },
  {
    icon: CreditCard,
    title: "PIX e Cartão",
    description: "Pague como preferir: PIX instantâneo ou cartão de crédito."
  }
];

export function TrustSection() {
  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Por que escolher a ModStore?</h2>
          <p className="text-muted-foreground">Milhares de gamers confiam em nós</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <Card key={index} className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-gaming flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
