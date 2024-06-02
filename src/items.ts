export interface Item {
  item: string;
  name: string;
  damage?: number;
  lore: string[];
  nbt: string;
  recipe?: Array<string | null>;
  crafttext?: string;
}

export const items: Record<string, Item> = JSON.parse(
  FileLib.read("bzflipper", "./data.json")!
);

export const bazaarToReal: Record<string, string | undefined> = {
  BAZAAR_COOKIE: "BOOSTER_COOKIE",
  ENCHANTED_CARROT_ON_A_STICK: "ENCHANTED_CARROT_STICK",
};
