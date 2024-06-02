import Promise from "../PromiseV2";
global.Promise = Promise;

Object.defineProperty(Array.prototype, "flatMap", {
  configurable: true,
  writable: true,
  value() {
    return Array.prototype.map.apply(this, arguments).flat(1);
  },
});

import "./bzflipper";
import "./src/flipper";
