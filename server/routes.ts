import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const sampleMods = [
  {
    name: "Shaders Ultra Realista",
    description: "Transforme seu Minecraft com os shaders mais realistas disponíveis. Este pack inclui efeitos de iluminação dinâmica, reflexos em água realistas, sombras suaves e muito mais. Compatível com a maioria dos mods populares e otimizado para performance.\n\nCaracterísticas:\n- Iluminação volumétrica\n- Reflexos em tempo real\n- Nuvens 3D realistas\n- Sombras dinâmicas\n- Efeitos de chuva e neve",
    shortDescription: "Shaders ultra realistas com iluminação dinâmica e reflexos em água",
    price: 29.90,
    originalPrice: 49.90,
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    gallery: [],
    game: "Minecraft",
    category: "graphics",
    creator: "ShaderMaster",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShaderMaster",
    rating: 4.8,
    reviewCount: 1250,
    downloadCount: 45000,
    fileSize: "156 MB",
    version: "2.5.1",
    isFeatured: true,
    requirements: "Minecraft Java Edition 1.19+\nOptiFine ou Iris Shaders\n8GB RAM recomendado\nPlaca de vídeo com 4GB VRAM"
  },
  {
    name: "Carros de Luxo Pack",
    description: "Adicione os carros mais luxuosos do mundo ao seu GTA V. Este pack inclui mais de 50 veículos detalhados incluindo Ferrari, Lamborghini, Porsche, McLaren e muito mais. Todos os carros possuem interiores detalhados e handling realista.",
    shortDescription: "Pack com mais de 50 carros de luxo incluindo Ferrari, Lamborghini e Porsche",
    price: 39.90,
    originalPrice: 59.90,
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
    gallery: [],
    game: "GTA V",
    category: "vehicles",
    creator: "AutoModsBR",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AutoModsBR",
    rating: 4.9,
    reviewCount: 890,
    downloadCount: 32000,
    fileSize: "2.3 GB",
    version: "3.1.0",
    isFeatured: true,
    requirements: "GTA V versão mais recente\nScript Hook V\n16GB RAM recomendado"
  },
  {
    name: "Armaduras Épicas",
    description: "Coleção de armaduras épicas inspiradas em mitologias nórdicas e fantasia medieval. Cada armadura possui efeitos visuais únicos e bônus especiais. Inclui sets completos para guerreiros, magos e arqueiros.",
    shortDescription: "Armaduras épicas com efeitos visuais únicos para guerreiros, magos e arqueiros",
    price: 24.90,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    gallery: [],
    game: "Skyrim",
    category: "characters",
    creator: "NordicCraft",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NordicCraft",
    rating: 4.7,
    reviewCount: 567,
    downloadCount: 18500,
    fileSize: "890 MB",
    version: "1.8.2",
    isFeatured: false,
    requirements: "Skyrim Special Edition\nSKSE64\nSkyUI"
  },
  {
    name: "Mapa Cidade Cyberpunk",
    description: "Um novo distrito inteiro para explorar em Night City. Este mapa adiciona áreas totalmente novas com missões secundárias, NPCs únicos e locais secretos para descobrir. Expansão de aproximadamente 10 horas de gameplay.",
    shortDescription: "Novo distrito com missões, NPCs e áreas secretas para explorar",
    price: 34.90,
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",
    gallery: [],
    game: "Cyberpunk 2077",
    category: "maps",
    creator: "NightCityDev",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NightCityDev",
    rating: 4.6,
    reviewCount: 423,
    downloadCount: 15200,
    fileSize: "4.7 GB",
    version: "2.0.0",
    isFeatured: false,
    requirements: "Cyberpunk 2077 versão 2.0+\n32GB RAM recomendado"
  },
  {
    name: "Texturas HD Realistas",
    description: "Pack de texturas em alta definição que transforma completamente a aparência do The Witcher 3. Inclui texturas 4K para terrenos, vegetação, edifícios e personagens. Melhora significativa nos detalhes visuais.",
    shortDescription: "Texturas 4K para terrenos, vegetação e personagens",
    price: 19.90,
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    gallery: [],
    game: "The Witcher 3",
    category: "graphics",
    creator: "WitcherHD",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WitcherHD",
    rating: 4.5,
    reviewCount: 789,
    downloadCount: 28000,
    fileSize: "8.2 GB",
    version: "4.0.1",
    isFeatured: false,
    requirements: "The Witcher 3 GOTY Edition\n16GB RAM\nPlaca de vídeo 6GB VRAM"
  },
  {
    name: "Armas Legendárias",
    description: "Coleção de armas legendárias com designs únicos e habilidades especiais. Cada arma possui sua própria história e pode ser encontrada através de quests exclusivas. Inclui espadas, machados, arcos e bastões mágicos.",
    shortDescription: "Armas com designs únicos, habilidades especiais e quests exclusivas",
    price: 22.90,
    originalPrice: 29.90,
    imageUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=600&fit=crop",
    gallery: [],
    game: "Elden Ring",
    category: "weapons",
    creator: "TarnishedArms",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TarnishedArms",
    rating: 4.8,
    reviewCount: 345,
    downloadCount: 12800,
    fileSize: "450 MB",
    version: "1.5.0",
    isFeatured: true,
    requirements: "Elden Ring versão 1.10+\nMod Engine 2"
  },
  {
    name: "Interface Minimalista",
    description: "Redesign completo da interface do usuário para uma experiência mais limpa e imersiva. Remove elementos desnecessários e adiciona opções de customização. HUD completamente configurável.",
    shortDescription: "Interface limpa e customizável para maior imersão",
    price: 14.90,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    gallery: [],
    game: "Fallout 4",
    category: "ui",
    creator: "CleanUI",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CleanUI",
    rating: 4.4,
    reviewCount: 234,
    downloadCount: 9500,
    fileSize: "45 MB",
    version: "3.2.1",
    isFeatured: false,
    requirements: "Fallout 4\nFallout 4 Script Extender (F4SE)"
  },
  {
    name: "Pack Sons Ambiente",
    description: "Sons ambientes imersivos para Red Dead Redemption 2. Melhora os sons da natureza, cidades e interações. Inclui novos sons de animais, clima e ambientes noturnos mais atmosféricos.",
    shortDescription: "Sons de natureza, cidades e clima mais imersivos e atmosféricos",
    price: 17.90,
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    gallery: [],
    game: "Red Dead 2",
    category: "audio",
    creator: "WildWestSound",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WildWestSound",
    rating: 4.6,
    reviewCount: 178,
    downloadCount: 7200,
    fileSize: "1.8 GB",
    version: "2.1.0",
    isFeatured: false,
    requirements: "Red Dead Redemption 2 PC\nLennys Mod Loader"
  },
  {
    name: "Biomas Épicos",
    description: "Adicione 15 novos biomas ao seu mundo Minecraft. Inclui florestas mágicas, desertos de cristal, planícies flutuantes e muito mais. Cada bioma possui suas próprias estruturas, mobs e recursos únicos.",
    shortDescription: "15 novos biomas com estruturas, mobs e recursos únicos",
    price: 27.90,
    originalPrice: 34.90,
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f897a?w=800&h=600&fit=crop",
    gallery: [],
    game: "Minecraft",
    category: "maps",
    creator: "BiomeCreator",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BiomeCreator",
    rating: 4.7,
    reviewCount: 892,
    downloadCount: 35000,
    fileSize: "320 MB",
    version: "1.19.4",
    isFeatured: false,
    requirements: "Minecraft Java Edition 1.19+\nFabric ou Forge"
  },
  {
    name: "Vida Real Mod",
    description: "Sistema completo de necessidades realistas para GTA V. Inclui fome, sede, cansaço, higiene e muito mais. Adiciona também sistema de emprego, aluguel de apartamentos e economia realista.",
    shortDescription: "Sistema de necessidades realistas com emprego e economia",
    price: 32.90,
    imageUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop",
    gallery: [],
    game: "GTA V",
    category: "gameplay",
    creator: "RealLifeMods",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RealLifeMods",
    rating: 4.5,
    reviewCount: 567,
    downloadCount: 22000,
    fileSize: "890 MB",
    version: "5.2.0",
    isFeatured: false,
    requirements: "GTA V versão mais recente\nScript Hook V\nScript Hook V .NET"
  },
  {
    name: "Companheiros Épicos",
    description: "Adicione 20 novos companheiros ao Skyrim, cada um com personalidade única, diálogos e quests pessoais. Inclui guerreiros, magos, arqueiros e até um dragão domesticado.",
    shortDescription: "20 companheiros com diálogos únicos e quests pessoais",
    price: 28.90,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop",
    gallery: [],
    game: "Skyrim",
    category: "characters",
    creator: "CompanionMaster",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CompanionMaster",
    rating: 4.9,
    reviewCount: 1123,
    downloadCount: 41000,
    fileSize: "1.2 GB",
    version: "2.8.0",
    isFeatured: true,
    requirements: "Skyrim Special Edition\nSKSE64\nSkyUI\nRaceMenu"
  },
  {
    name: "Hacking Avançado",
    description: "Sistema de hacking completamente redesenhado com novos minigames, ferramentas e possibilidades. Hackeie drones, veículos, sistemas de segurança e muito mais com mecânicas mais profundas.",
    shortDescription: "Sistema de hacking redesenhado com novos minigames e ferramentas",
    price: 21.90,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    gallery: [],
    game: "Cyberpunk 2077",
    category: "gameplay",
    creator: "NetRunner",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NetRunner",
    rating: 4.4,
    reviewCount: 289,
    downloadCount: 11500,
    fileSize: "180 MB",
    version: "1.6.0",
    isFeatured: false,
    requirements: "Cyberpunk 2077 versão 2.0+\nCyber Engine Tweaks"
  }
];

async function seedMods() {
  const existingMods = await storage.getAllMods();
  if (existingMods.length === 0) {
    console.log("Seeding database with sample mods...");
    for (const mod of sampleMods) {
      await storage.createMod(mod);
    }
    console.log(`Seeded ${sampleMods.length} mods`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  await seedMods();

  app.get("/api/mods", async (req, res) => {
    try {
      const { game, search, featured } = req.query;
      let result;

      if (search && typeof search === "string") {
        result = await storage.searchMods(search);
      } else if (featured === "true") {
        result = await storage.getFeaturedMods();
      } else if (game && typeof game === "string") {
        result = await storage.getModsByGame(game);
      } else {
        result = await storage.getAllMods();
      }

      res.json(result);
    } catch (error) {
      console.error("Error fetching mods:", error);
      res.status(500).json({ error: "Failed to fetch mods" });
    }
  });

  app.get("/api/mods/:id", async (req, res) => {
    try {
      const mod = await storage.getModById(req.params.id);
      if (!mod) {
        return res.status(404).json({ error: "Mod not found" });
      }
      res.json(mod);
    } catch (error) {
      console.error("Error fetching mod:", error);
      res.status(500).json({ error: "Failed to fetch mod" });
    }
  });

  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const items = await storage.getCartItems(req.params.sessionId);
      const itemsWithMods = await Promise.all(
        items.map(async (item) => {
          const mod = await storage.getModById(item.modId);
          return { ...item, mod };
        })
      );
      res.json(itemsWithMods.filter(item => item.mod));
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const schema = z.object({
        sessionId: z.string(),
        modId: z.string(),
        quantity: z.number().optional().default(1)
      });

      const data = schema.parse(req.body);
      const item = await storage.addToCart(data);
      res.json(item);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.delete("/api/cart/:sessionId/:modId", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.sessionId, req.params.modId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const schema = z.object({
        sessionId: z.string(),
        email: z.string().email(),
        total: z.number(),
        paymentMethod: z.string(),
        items: z.array(z.object({
          modId: z.string(),
          price: z.number()
        }))
      });

      const data = schema.parse(req.body);
      
      const order = await storage.createOrder({
        sessionId: data.sessionId,
        email: data.email,
        total: data.total,
        paymentMethod: data.paymentMethod,
        status: "completed"
      });

      for (const item of data.items) {
        await storage.createOrderItem({
          orderId: order.id,
          modId: item.modId,
          price: item.price
        });
      }

      await storage.clearCart(data.sessionId);

      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:sessionId", async (req, res) => {
    try {
      const orders = await storage.getOrdersBySession(req.params.sessionId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
