import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { GameFilter } from "@/components/game-filter";
import { FeaturedMods } from "@/components/featured-mods";
import { ModsGrid } from "@/components/mods-grid";
import { TrustSection } from "@/components/trust-section";
import type { Mod } from "@shared/schema";

export default function Home() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const gameFilter = searchParams.get('game');
  const searchQuery = searchParams.get('search');
  const featuredOnly = searchParams.get('featured') === 'true';

  const buildApiUrl = () => {
    const params = new URLSearchParams();
    if (gameFilter) params.set('game', gameFilter);
    if (searchQuery) params.set('search', searchQuery);
    if (featuredOnly) params.set('featured', 'true');
    const queryString = params.toString();
    return queryString ? `/api/mods?${queryString}` : '/api/mods';
  };

  const { data: mods = [], isLoading } = useQuery<Mod[]>({
    queryKey: [buildApiUrl()],
  });

  const filteredMods = mods.filter(mod => {
    if (gameFilter && mod.game.toLowerCase() !== gameFilter.toLowerCase() && 
        !mod.game.toLowerCase().includes(gameFilter.toLowerCase())) {
      const gameMap: Record<string, string> = {
        'minecraft': 'Minecraft',
        'gtav': 'GTA V',
        'skyrim': 'Skyrim',
        'cyberpunk': 'Cyberpunk 2077',
        'witcher3': 'The Witcher 3',
        'fallout4': 'Fallout 4',
        'rdr2': 'Red Dead 2',
        'eldenring': 'Elden Ring'
      };
      if (mod.game !== gameMap[gameFilter]) return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!mod.name.toLowerCase().includes(query) && 
          !mod.description.toLowerCase().includes(query) &&
          !mod.game.toLowerCase().includes(query)) {
        return false;
      }
    }
    if (featuredOnly && !mod.isFeatured) return false;
    return true;
  });

  const getGridTitle = () => {
    if (searchQuery) return `Resultados para "${searchQuery}"`;
    if (featuredOnly) return "Mods em Destaque";
    if (gameFilter) {
      const gameMap: Record<string, string> = {
        'minecraft': 'Minecraft',
        'gtav': 'GTA V',
        'skyrim': 'Skyrim',
        'cyberpunk': 'Cyberpunk 2077',
        'witcher3': 'The Witcher 3',
        'fallout4': 'Fallout 4',
        'rdr2': 'Red Dead 2',
        'eldenring': 'Elden Ring'
      };
      return `Mods para ${gameMap[gameFilter] || gameFilter}`;
    }
    return "Todos os Mods";
  };

  const showHero = !gameFilter && !searchQuery && !featuredOnly;
  const showFeatured = !featuredOnly && !searchQuery && !gameFilter;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {showHero && <HeroSection />}
        
        <GameFilter activeGame={gameFilter || undefined} />
        
        {showFeatured && (
          <FeaturedMods mods={mods} isLoading={isLoading} />
        )}
        
        <ModsGrid 
          mods={filteredMods} 
          isLoading={isLoading}
          title={getGridTitle()}
          description={filteredMods.length > 0 ? `${filteredMods.length} mods encontrados` : undefined}
        />
        
        {showHero && <TrustSection />}
      </main>
      <Footer />
    </div>
  );
}
