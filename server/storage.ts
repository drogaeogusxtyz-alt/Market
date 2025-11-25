import { 
  mods, cartItems, orders, orderItems,
  type Mod, type InsertMod,
  type CartItem, type InsertCartItem,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem
} from "@shared/schema";
import { db } from "./db";
import { eq, and, ilike, or } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllMods(): Promise<Mod[]>;
  getModById(id: string): Promise<Mod | undefined>;
  getModsByGame(game: string): Promise<Mod[]>;
  getFeaturedMods(): Promise<Mod[]>;
  searchMods(query: string): Promise<Mod[]>;
  createMod(mod: InsertMod): Promise<Mod>;
  
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(sessionId: string, modId: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrdersBySession(sessionId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllMods(): Promise<Mod[]> {
    return db.select().from(mods);
  }

  async getModById(id: string): Promise<Mod | undefined> {
    const [mod] = await db.select().from(mods).where(eq(mods.id, id));
    return mod || undefined;
  }

  async getModsByGame(game: string): Promise<Mod[]> {
    return db.select().from(mods).where(eq(mods.game, game));
  }

  async getFeaturedMods(): Promise<Mod[]> {
    return db.select().from(mods).where(eq(mods.isFeatured, true));
  }

  async searchMods(query: string): Promise<Mod[]> {
    const searchPattern = `%${query}%`;
    return db.select().from(mods).where(
      or(
        ilike(mods.name, searchPattern),
        ilike(mods.description, searchPattern),
        ilike(mods.game, searchPattern)
      )
    );
  }

  async createMod(mod: InsertMod): Promise<Mod> {
    const id = randomUUID();
    const [newMod] = await db.insert(mods).values({ ...mod, id }).returning();
    return newMod;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const [newItem] = await db.insert(cartItems).values({ ...item, id }).returning();
    return newItem;
  }

  async removeFromCart(sessionId: string, modId: string): Promise<void> {
    await db.delete(cartItems).where(
      and(eq(cartItems.sessionId, sessionId), eq(cartItems.modId, modId))
    );
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const [newOrder] = await db.insert(orders).values({ ...order, id }).returning();
    return newOrder;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getOrdersBySession(sessionId: string): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.sessionId, sessionId));
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const [newItem] = await db.insert(orderItems).values({ ...item, id }).returning();
    return newItem;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
}

export const storage = new DatabaseStorage();
