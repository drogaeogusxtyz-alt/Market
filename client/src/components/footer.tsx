import { Link } from "wouter";
import { Gamepad2, Mail, Shield, Zap, Headphones, MessageCircle, Twitter, Youtube, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="gradient-gaming rounded-lg p-2">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gradient-gaming">Mod</span>Store
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O maior marketplace de mods para games do Brasil. 
              Mods de qualidade com pagamento seguro.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="link-discord">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="link-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="link-youtube">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="link-twitch">
                <Tv className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Jogos Populares</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/?game=minecraft" className="hover:text-foreground transition-colors" data-testid="link-minecraft">Minecraft</Link></li>
              <li><Link href="/?game=gtav" className="hover:text-foreground transition-colors" data-testid="link-gtav">GTA V</Link></li>
              <li><Link href="/?game=skyrim" className="hover:text-foreground transition-colors" data-testid="link-skyrim">Skyrim</Link></li>
              <li><Link href="/?game=cyberpunk" className="hover:text-foreground transition-colors" data-testid="link-cyberpunk">Cyberpunk 2077</Link></li>
              <li><Link href="/?game=eldenring" className="hover:text-foreground transition-colors" data-testid="link-eldenring">Elden Ring</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Como instalar mods</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Política de reembolso</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contato</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Termos de uso</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Receba novidades e promoções exclusivas.
            </p>
            <form className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-muted/50 border-transparent"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" size="icon" className="shrink-0" data-testid="button-newsletter-submit">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Download Instantâneo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Headphones className="h-4 w-4 text-primary" />
                <span>Suporte 24/7</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ModStore. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
