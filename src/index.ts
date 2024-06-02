import dedent from "ts-dedent";
import leven from "leven";
import { BazaarProduct, Hypixel } from "./api";
import { getBazaarData } from "./bazaar";
import { getItemPlan, ItemPlan, stringifyPlan } from "./item-plan";
import { bazaarToReal, Item, items } from "./items";
import { commaify } from "./util";

const API_KEY_MSG =
  "Please set your Hypixel API key (obtainable with /api new) with /bzf setkey <key>";
let apiKey = FileLib.read("bzflipper", "apikey.txt");
let hypixel: Hypixel | null = null;
if (apiKey === null) {
  ChatLib.chat(API_KEY_MSG);
} else {
  hypixel = new Hypixel(apiKey);
}

let targetItem: Item | undefined = undefined;
let targetBazaar: BazaarProduct | undefined = undefined;
let targetPlan: ItemPlan | undefined = undefined;

const commands: Record<string, (...args: string[]) => void | Promise<void>> = {
  help() {
    ChatLib.chat(
      dedent`
        §a§l--- bzflipper ---
        §b/bzf set <item name> §7-§a Calculates the optimal method of getting the item
        §b/bzf clear §7-§a Hides the GUI
        §b/bzf find §7-§a Finds the item with the best profit percentage which is undersupplied
        §b/bzf setkey <key>§7-§a Sets your Hypixel API key
      `
    );
  },
  set(...givenName) {
    if (hypixel === null) {
      ChatLib.chat(API_KEY_MSG);
      return;
    }

    new Thread(() => {
      const id = Object.entries(items)
        .map(
          ([id, item]) =>
            [
              id,
              leven(givenName.join(" "), item.name.replace(/§./g, "")),
            ] as const
        )
        .sort(([, a], [, b]) => a - b)[0][0];

      const item = items[id];
      if (item === undefined) {
        ChatLib.chat("Unknown item");
        return;
      }
      targetItem = item;
      targetBazaar = undefined;
      targetPlan = undefined;
      getBazaarData(hypixel!).then((bazaar) => {
        targetBazaar = bazaar[id];
      });
      getItemPlan(hypixel!, id).then((plan) => {
        targetPlan = plan;
      });
    }).start();
  },
  clear() {
    targetItem = undefined;
    targetBazaar = undefined;
    targetPlan = undefined;
  },
  async find() {
    if (hypixel === null) {
      ChatLib.chat(API_KEY_MSG);
      return;
    }

    targetItem = undefined;
    targetBazaar = undefined;
    targetPlan = undefined;
    const allBazaar = await getBazaarData(hypixel);

    let bestRatio = -Infinity;
    for (const [bazaarName, bazaar] of Object.entries(allBazaar)) {
      if (bazaar.quick_status.sellVolume > bazaar.quick_status.buyVolume) {
        continue;
      }

      const itemName = bazaarToReal[bazaarName] ?? bazaarName.split(":")[0];
      const plan = await getItemPlan(hypixel!, itemName);
      if (plan === undefined) {
        continue;
      }

      const ratio = bazaar.quick_status.sellPrice / plan.cost;

      if (ratio > bestRatio) {
        bestRatio = ratio;
        targetItem = items[itemName];
        targetBazaar = allBazaar[itemName];
        targetPlan = plan;
      }
    }
  },
  async setkey(key) {
    apiKey = key;
    hypixel = new Hypixel(key);
    try {
      await hypixel.key();
    } catch (err) {
      ChatLib.chat(err.message);
      return;
    }
    FileLib.write("bzflipper", "apikey.txt", key);
    ChatLib.chat("API key set.");
  },
};

register("command", (name, ...args) => {
  const command = commands[name ?? "help"];
  if (command === undefined) {
    ChatLib.chat(`Unknown subcommand. Try "/bzf help"`);
  } else {
    command(...args);
  }
}).setCommandName("bzf");

register("renderOverlay", () => {
  let parts = [];

  if (targetItem !== undefined && targetPlan === undefined) {
    parts.push(`Get ${targetItem.name}`);
    parts.push("");
  }
  if (targetPlan !== undefined) {
    const plan = targetPlan;
    parts.push(stringifyPlan(plan));
    parts.push("");
    parts.push(`Cost: $${commaify(Math.round(plan.cost * 10) / 10)}`);
  }
  if (targetBazaar !== undefined) {
    parts.push(
      `Gross: $${commaify(
        Math.round(targetBazaar.quick_status.sellPrice * 10) / 10
      )}`
    );
  }
  if (targetBazaar !== undefined && targetPlan !== undefined) {
    const profit = targetBazaar.quick_status.sellPrice - targetPlan.cost;
    parts.push(
      `Profit: §${profit < 0 ? "c" : profit > 0 ? "a" : "f"}$${commaify(
        Math.round(profit * 10) / 10
      )} = ${
        Math.round(
          (targetBazaar.quick_status.sellPrice / targetPlan.cost - 1) *
            100 *
            100
        ) / 100
      }%`
    );
  }

  if (targetBazaar !== undefined) {
    parts.push("");
    parts.push(`Buy volume: ${commaify(targetBazaar.quick_status.buyVolume)}`);
    parts.push(
      `Sell volume: ${commaify(targetBazaar.quick_status.sellVolume)}`
    );
    const difference =
      targetBazaar.quick_status.sellVolume -
      targetBazaar.quick_status.buyVolume;
    parts.push(
      `Market state: §${difference < 0 ? "a" : difference > 0 ? "c" : "f"}${
        difference < 0 ? "Shortage" : difference > 0 ? "Surplus" : "Equilibrium"
      } of ${commaify(Math.abs(difference))}`
    );
  }

  Renderer.drawString(parts.join("\n"), 10, 10);
});
