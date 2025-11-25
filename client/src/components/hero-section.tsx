import { Link } from "wouter";
import { ArrowRight, Download, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-gaming opacity-90" />
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm mb-8 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Novos mods adicionados diariamente
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Descubra os <br className="hidden sm:block" />
            <span className="relative">
              Melhores Mods
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-white/30" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
            <br className="hidden sm:block" />
            para Seus Games
          </h1>
          
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transforme sua experiência de jogo com mods premium. 
            Minecraft, GTA V, Skyrim e muito mais. 
            Pagamento seguro via PIX e cartão.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/#mods">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 min-h-12 text-base"
                data-testid="button-explore-mods"
              >
                Explorar Mods
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/?featured=true">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 min-h-12 text-base"
                data-testid="button-view-featured"
              >
                Ver Destaques
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-3 text-white/80">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <Download className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-xl text-white">1000+</p>
                <p className="text-sm text-white/60">Mods</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white/80">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-xl text-white">50k+</p>
                <p className="text-sm text-white/60">Downloads</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white/80">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <Shield className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-xl text-white">100%</p>
                <p className="text-sm text-white/60">Seguro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
