declare function setTimeout(func: () => void, ms: number): number;
import type { Hypixel } from "./api";
import { getBazaarData } from "./bazaar";
import { items } from "./items";
import { commaify } from "./util";

export type ItemPlan = (
  | {
      type: "craft";
      ingredients: Array<{ amount: number; plan: ItemPlan }>;
      recipe: Array<string | null>;
    }
  | { type: "bazaar_buy" }
) & {
  item: string;
  cost: number;
};

const cache = new Map<string, ItemPlan>();
export async function getItemPlan(
  hypixel: Hypixel,
  name: string,
  parents: string[] = []
): Promise<ItemPlan | undefined> {
  const cacheName = [...parents, name].join(" ");
  const cached = cache.get(cacheName);
  if (cached !== undefined) {
    return cached;
  }

  const item = items[name];
  if (item === undefined) {
    throw new Error(`Unknown item: ${JSON.stringify(name)}`);
  }

  const plans: ItemPlan[] = [];

  if (item.recipe !== undefined) {
    const ingredientsMap: Record<string, number> = {};
    let sawParent = false;
    for (const ingredient of item.recipe) {
      if (ingredient === null) {
        continue;
      }
      const [name, amountStr] = ingredient.split(":");
      if (parents.includes(name)) {
        sawParent = true;
        break;
      }
      const amount = parseInt(amountStr);
      ingredientsMap[name] ??= 0;
      ingredientsMap[name] += amount;
    }

    if (!sawParent) {
      const ingredients = await Promise.all(
        Object.entries(ingredientsMap).map(async ([item, amount]) => ({
          amount,
          plan: await getItemPlan(hypixel, item, [...parents, name]),
        }))
      );

      let cost = 0;
      let undefinedIngredient = false;

      for (const ingredient of ingredients) {
        if (ingredient.plan === undefined) {
          undefinedIngredient = true;
          break;
        }
        cost += ingredient.amount * ingredient.plan.cost;
      }
      if (!undefinedIngredient) {
        plans.push({
          type: "craft",
          ingredients: ingredients as Array<{ amount: number; plan: ItemPlan }>,
          recipe: item.recipe,
          item: name,
          cost,
        });
      }
    }
  }

  const bazaar = (await getBazaarData(hypixel))[name];
  if (bazaar !== undefined) {
    plans.push({
      type: "bazaar_buy",
      item: name,
      cost: bazaar.quick_status.buyPrice,
    });
  }

  const bestPlan = plans.sort((a, b) => a.cost - b.cost)[0];
  setTimeout(() => {
    cache.delete(cacheName);
  }, 15000);
  return bestPlan;
}

export function stringifyPlan(plan: ItemPlan, amount = 1): string {
  const item = `${items[plan.item].name}§r${
    amount === 1 ? "" : ` x${commaify(amount)}`
  }`;
  switch (plan.type) {
    case "bazaar_buy": {
      return `Buy ${item} for $${commaify(
        Math.round(plan.cost * amount * 10) / 10
      )}`;
    }
    case "craft": {
      return `Craft ${item}${
        items[plan.item].crafttext === undefined ||
        items[plan.item].crafttext === ""
          ? ""
          : ` (${items[plan.item].crafttext})`
      } with\n${plan.ingredients
        .map(({ amount, plan }) =>
          stringifyPlan(plan, amount)
            .split("\n")
            .map((line) => " ".repeat(2) + line)
            .join("\n")
        )
        .join("\n")}`;
    }
    default:
      return plan;
  }
}
