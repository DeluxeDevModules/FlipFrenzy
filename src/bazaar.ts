declare function setTimeout(func: () => void, ms: number): number;
import type { BazaarProducts, Hypixel } from "./api";

let cache: BazaarProducts | null = null;

export async function getBazaarData(hypixel: Hypixel) {
  if (cache !== null) {
    return cache;
  }
  cache = await hypixel.bazaar();
  setTimeout(() => {
    cache = null;
  }, 15000);
  return cache;
}
