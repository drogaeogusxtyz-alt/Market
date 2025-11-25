import { pgTable, text, varchar, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const mods = pgTable("mods", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  price: real("price").notNull(),
  originalPrice: real("original_price"),
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery").array(),
  game: text("game").notNull(),
  category: text("category").notNull(),
  creator: text("creator").notNull(),
  creatorAvatar: text("creator_avatar"),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  downloadCount: integer("download_count").default(0),
  fileSize: text("file_size").notNull(),
  version: text("version").notNull(),
  isFeatured: boolean("is_featured").default(false),
  requirements: text("requirements"),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id", { length: 36 }).primaryKey(),
  sessionId: varchar("session_id", { length: 36 }).notNull(),
  modId: varchar("mod_id", { length: 36 }).notNull(),
  quantity: integer("quantity").default(1),
});

export const orders = pgTable("orders", {
  id: varchar("id", { length: 36 }).primaryKey(),
  sessionId: varchar("session_id", { length: 36 }).notNull(),
  email: text("email").notNull(),
  total: real("total").notNull(),
  status: text("status").notNull().default("pending"),
  paymentMethod: text("payment_method").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }).notNull(),
  modId: varchar("mod_id", { length: 36 }).notNull(),
  price: real("price").notNull(),
});

export const insertModSchema = createInsertSchema(mods).omit({ id: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });

export type Mod = typeof mods.$inferSelect;
export type InsertMod = z.infer<typeof insertModSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export type CartItemWithMod = CartItem & { mod: Mod };

export const games = [
  { id: "minecraft", name: "Minecraft", icon: "Pickaxe" },
  { id: "gtav", name: "GTA V", icon: "Car" },
  { id: "skyrim", name: "Skyrim", icon: "Sword" },
  { id: "cyberpunk", name: "Cyberpunk 2077", icon: "Cpu" },
  { id: "witcher3", name: "The Witcher 3", icon: "Shield" },
  { id: "fallout4", name: "Fallout 4", icon: "Radiation" },
  { id: "rdr2", name: "Red Dead 2", icon: "Target" },
  { id: "eldenring", name: "Elden Ring", icon: "Flame" },
] as const;

export const categories = [
  { id: "graphics", name: "Gráficos" },
  { id: "gameplay", name: "Gameplay" },
  { id: "characters", name: "Personagens" },
  { id: "maps", name: "Mapas" },
  { id: "vehicles", name: "Veículos" },
  { id: "weapons", name: "Armas" },
  { id: "ui", name: "Interface" },
  { id: "audio", name: "Áudio" },
] as const;
  
