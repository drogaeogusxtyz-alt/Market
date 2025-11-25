import { useLocation } from "wouter";
import { 
  Pickaxe, Car, Sword, Cpu, Shield, Radiation, Target, Flame,
  Gamepad2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { games } from "@shared/schema";

const iconMap: Record<string, React.ElementType> = {
  Pickaxe,
  Car,
  Sword,
  Cpu,
  Shield,
  Radiation,
  Target,
  Flame,
};

interface GameFilterProps {
  activeGame?: string;
}

export function GameFilter({ activeGame }: GameFilterProps) {
  const [, setLocation] = useLocation();

  const handleGameClick = (gameId: string) => {
    if (activeGame === gameId) {
      setLocation('/');
    } else {
      setLocation(`/?game=${gameId}`);
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filtrar por Jogo</h2>
          {activeGame && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocation('/')}
              data-testid="button-clear-filter"
            >
              Limpar filtro
            </Button>
          )}
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-4">
            {games.map((game) => {
              const Icon = iconMap[game.icon] || Gamepad2;
              const isActive = activeGame === game.id;
              
              return (
                <Button
                  key={game.id}
                  variant={isActive ? "default" : "secondary"}
                  className={`shrink-0 gap-2 ${isActive ? 'gradient-gaming border-0 text-white' : ''}`}
                  onClick={() => handleGameClick(game.id)}
                  data-testid={`button-game-${game.id}`}
                >
                  <Icon className="h-4 w-4" />
                  {game.name}
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
