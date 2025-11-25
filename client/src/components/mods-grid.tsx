import { ModCard, ModCardSkeleton } from "@/components/mod-card";
import type { Mod } from "@shared/schema";

interface ModsGridProps {
  mods: Mod[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function ModsGrid({ mods, isLoading, title, description }: ModsGridProps) {
  return (
    <section className="py-12" id="mods">
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="mb-8">
            {title && <h2 className="text-2xl font-bold mb-1">{title}</h2>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ModCardSkeleton key={i} />
            ))}
          </div>
        ) : mods.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum mod encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou fazer uma nova busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mods.map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
