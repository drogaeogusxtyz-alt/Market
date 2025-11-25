# ModStore - Marketplace de Mods para Games

## Overview
ModStore é um marketplace moderno de mods para games, desenvolvido com React + Express + PostgreSQL. Possui design gaming com gradientes vibrantes (roxo/azul/rosa), sistema de carrinho de compras e checkout com simulação de pagamento.

## Recent Changes
- **25/11/2024**: Criação do marketplace completo
  - Frontend com design gaming e gradientes vibrantes
  - Sistema de catálogo de mods com filtros por jogo
  - Carrinho de compras funcional
  - Checkout com suporte a cartão e PIX
  - Página de sucesso após pagamento
  - Tema escuro/claro

## Project Architecture

### Frontend (client/)
- **Framework**: React com Vite
- **Routing**: wouter
- **State**: TanStack Query + Context API para carrinho
- **Styling**: Tailwind CSS + shadcn/ui
- **Theme**: Dark/Light mode com ThemeProvider

### Backend (server/)
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon) com Drizzle ORM
- **Storage**: DatabaseStorage implementando IStorage interface

### Shared (shared/)
- **Schema**: Definições de tipos e esquemas Drizzle/Zod

## Key Files
```
client/src/
├── App.tsx               # Router e providers
├── pages/
│   ├── home.tsx          # Homepage com hero e catálogo
│   ├── mod-detail.tsx    # Página de detalhes do mod
│   ├── cart.tsx          # Carrinho de compras
│   ├── checkout.tsx      # Página de pagamento
│   └── success.tsx       # Confirmação do pedido
├── components/
│   ├── header.tsx        # Navegação principal
│   ├── footer.tsx        # Rodapé com links
│   ├── hero-section.tsx  # Banner principal
│   ├── mod-card.tsx      # Card de produto
│   ├── featured-mods.tsx # Mods em destaque
│   └── mods-grid.tsx     # Grid de produtos
└── lib/
    └── cart-context.tsx  # Context para carrinho

server/
├── routes.ts             # API endpoints
├── storage.ts            # Database operations
└── db.ts                 # Database connection

shared/
└── schema.ts             # Data models (mods, orders, etc.)
```

## API Endpoints
- `GET /api/mods` - Lista todos os mods (suporta ?game=, ?search=, ?featured=)
- `GET /api/mods/:id` - Detalhes de um mod
- `POST /api/orders` - Criar pedido

## Database Tables
- **mods**: Catálogo de mods
- **cart_items**: Itens no carrinho (por sessão)
- **orders**: Pedidos realizados
- **order_items**: Itens de cada pedido

## Design System
- **Primary Color**: Purple (hsl 271 91% 65%)
- **Gradients**: Purple → Blue → Pink
- **Fonts**: Poppins (UI), JetBrains Mono (prices)
- **Components**: shadcn/ui customizados

## Running the Project
```bash
npm run dev        # Start development server
npm run db:push    # Push schema changes to database
```

## User Preferences
- Preferência por design moderno com gradientes
- Interface em português (pt-BR)
- Suporte a tema escuro como padrão
