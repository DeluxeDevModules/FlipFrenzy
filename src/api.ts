import { request } from "./request";

export interface KeyRecord {
  key: string;
  owner: string;
  limit: number;
  queriesInPastMin: number;
  totalQueries: number;
}

export interface BazaarOrder {
  amount: number;
  pricePerUnit: number;
  orders: number;
}

export interface BazaarProduct {
  product_id: string;
  sell_summary: BazaarOrder[];
  buy_summary: BazaarOrder[];
  quick_status: {
    productId: string;
    /** The weighted average of the top 2% of orders by volume */
    sellPrice: number;
    /** The sum of item amounts in all sell orders */
    sellVolume: number;
    /** The historic transacted volume from last 7d + live state */
    sellMovingWeek: number;
    /** The count of active orders */
    sellOrders: number;
    /** The weighted average of the top 2% of orders by volume */
    buyPrice: number;
    /** The sum of item amounts in all buy orders */
    buyVolume: number;
    /** The historic transacted volume from last 7d + live state */
    buyMovingWeek: number;
    /** The count of active orders */
    buyOrders: number;
  };
}

export type BazaarProducts = Record<string, BazaarProduct>;

export class Hypixel {
  constructor(private apiKey: string) {}
  private async request<T>(
    path: string,
    key: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    const response = await request({
      url: `https://api.hypixel.net/${path}`,
      qs: { ...params, key: this.apiKey },
    });
    const result = JSON.parse(response.body);
    if (result.success) {
      return result[key];
    } else {
      throw new Error(result.cause);
    }
  }

  key() {
    return this.request<KeyRecord>("key", "record");
  }

  bazaar() {
    return this.request<BazaarProducts>("skyblock/bazaar", "products");
  }
}
