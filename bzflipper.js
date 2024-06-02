/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedent = void 0;
function dedent(templ) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var strings = Array.from(typeof templ === 'string' ? [templ] : templ.raw);
    strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, '');
    var indentLengths = strings.reduce(function (arr, str) {
        var matches = str.match(/\n([\t ]+|(?!\s).)/g);
        if (matches) {
            return arr.concat(matches.map(function (match) { var _a, _b; return (_b = (_a = match.match(/[\t ]/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0; }));
        }
        return arr;
    }, []);
    if (indentLengths.length) {
        var pattern_1 = new RegExp("\n[\t ]{" + Math.min.apply(Math, indentLengths) + "}", 'g');
        strings = strings.map(function (str) { return str.replace(pattern_1, '\n'); });
    }
    strings[0] = strings[0].replace(/^\r?\n/, '');
    var string = strings[0];
    values.forEach(function (value, i) {
        string += value + strings[i + 1];
    });
    return string;
}
exports.dedent = dedent;
exports.default = dedent;
//# sourceMappingURL=index.js.map
});

var dedent = /*@__PURE__*/getDefaultExportFromCjs(dist);

const array = [];
const charCodeCache = [];

const leven = (left, right) => {
	if (left === right) {
		return 0;
	}

	const swap = left;

	// Swapping the strings if `a` is longer than `b` so we know which one is the
	// shortest & which one is the longest
	if (left.length > right.length) {
		left = right;
		right = swap;
	}

	let leftLength = left.length;
	let rightLength = right.length;

	// Performing suffix trimming:
	// We can linearly drop suffix common to both strings since they
	// don't increase distance at all
	// Note: `~-` is the bitwise way to perform a `- 1` operation
	while (leftLength > 0 && (left.charCodeAt(~-leftLength) === right.charCodeAt(~-rightLength))) {
		leftLength--;
		rightLength--;
	}

	// Performing prefix trimming
	// We can linearly drop prefix common to both strings since they
	// don't increase distance at all
	let start = 0;

	while (start < leftLength && (left.charCodeAt(start) === right.charCodeAt(start))) {
		start++;
	}

	leftLength -= start;
	rightLength -= start;

	if (leftLength === 0) {
		return rightLength;
	}

	let bCharCode;
	let result;
	let temp;
	let temp2;
	let i = 0;
	let j = 0;

	while (i < leftLength) {
		charCodeCache[i] = left.charCodeAt(start + i);
		array[i] = ++i;
	}

	while (j < rightLength) {
		bCharCode = right.charCodeAt(start + j);
		temp = j++;
		result = j;

		for (i = 0; i < leftLength; i++) {
			temp2 = bCharCode === charCodeCache[i] ? temp : temp + 1;
			temp = array[i];
			// eslint-disable-next-line no-multi-assign
			result = array[i] = temp > result ? temp2 > result ? result + 1 : temp2 : temp2 > temp ? temp + 1 : temp2;
		}
	}

	return result;
};

var leven_1 = leven;
// TODO: Remove this for the next major release
var _default = leven;
leven_1.default = _default;

function request(opts) {
    var _a, _b;
    var options = __assign({ method: "GET", timeout: 0, connectTimeout: (_a = opts.timeout) !== null && _a !== void 0 ? _a : 0, readTimeout: (_b = opts.timeout) !== null && _b !== void 0 ? _b : 0, headers: {}, qs: {}, followRedirect: true }, opts);
    return new Promise(function (resolve, reject) {
        var JURL = Java.type("java.net.URL");
        var JDataOutputStream = Java.type("java.io.DataOutputStream");
        var JURLEncoder = Java.type("java.net.URLEncoder");
        var JBufferedReader = Java.type("java.io.BufferedReader");
        var JInputStreamReader = Java.type("java.io.InputStreamReader");
        var JString = Java.type("java.lang.String");
        var JOutputStreamWriter = Java.type("java.io.OutputStreamWriter");
        function getQueryString(obj) {
            var queryString = "";
            Object.keys(obj).forEach(function (qs) {
                queryString += JURLEncoder.encode(qs, "UTF-8") + "=" + JURLEncoder.encode(obj[qs], "UTF-8") + "&";
            });
            return queryString.length > 0
                ? queryString.substr(0, queryString.length - 1)
                : queryString;
        }
        new Thread(function () {
            try {
                var queryString = "?" + getQueryString(options.qs);
                if (queryString.length > 1)
                    options.url += queryString;
                var url = new JURL(options.url);
                var conn = url.openConnection();
                conn.setRequestMethod(options.method);
                conn.setDoOutput(true);
                conn.setConnectTimeout(options.connectTimeout);
                conn.setReadTimeout(options.readTimeout);
                conn.setInstanceFollowRedirects(options.followRedirect);
                Object.keys(options.headers).forEach(function (header) {
                    return conn.setRequestProperty(header, options.headers[header]);
                });
                if (options.method === "POST") {
                    if (typeof options.body === "object") {
                        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
                        var wr;
                        try {
                            wr = new JOutputStreamWriter(conn.getOutputStream());
                            wr.write(JSON.stringify(options.body));
                            wr.close();
                        }
                        finally {
                            wr === null || wr === void 0 ? void 0 : wr.close();
                        }
                    }
                    else if (typeof options.form === "object") {
                        var params = getQueryString(options.form);
                        var bytes = new JString(params).getBytes("UTF-8");
                        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                        conn.setRequestProperty("Content-Length", bytes.length.toString());
                        var wr;
                        try {
                            wr = new JDataOutputStream(conn.getOutputStream());
                            wr.write(bytes);
                        }
                        finally {
                            wr === null || wr === void 0 ? void 0 : wr.close();
                        }
                    }
                }
                var status = conn.getResponseCode();
                var content = "";
                var stream = conn[status > 299 ? "getErrorStream" : "getInputStream"]();
                var reader = new JBufferedReader(new JInputStreamReader(stream));
                while (true) {
                    var inputLine = reader.readLine();
                    if (!inputLine)
                        break;
                    content += inputLine;
                }
                reader.close();
                conn.disconnect();
                resolve({
                    statusCode: status,
                    body: content,
                });
            }
            catch (e) {
                reject(e);
            }
        }).start();
    });
}

var Hypixel = (function () {
    function Hypixel(apiKey) {
        this.apiKey = apiKey;
    }
    Hypixel.prototype.request = function (path, key, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request({
                            url: "https://api.hypixel.net/" + path,
                            qs: __assign(__assign({}, params), { key: this.apiKey }),
                        })];
                    case 1:
                        response = _a.sent();
                        result = JSON.parse(response.body);
                        if (result.success) {
                            return [2, result[key]];
                        }
                        else {
                            throw new Error(result.cause);
                        }
                }
            });
        });
    };
    Hypixel.prototype.key = function () {
        return this.request("key", "record");
    };
    Hypixel.prototype.bazaar = function () {
        return this.request("skyblock/bazaar", "products");
    };
    return Hypixel;
}());

var cache$1 = null;
function getBazaarData(hypixel) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (cache$1 !== null) {
                        return [2, cache$1];
                    }
                    return [4, hypixel.bazaar()];
                case 1:
                    cache$1 = _a.sent();
                    setTimeout(function () {
                        cache$1 = null;
                    }, 15000);
                    return [2, cache$1];
            }
        });
    });
}

var items = JSON.parse(FileLib.read("bzflipper", "./data.json"));
var bazaarToReal = {
    BAZAAR_COOKIE: "BOOSTER_COOKIE",
    ENCHANTED_CARROT_ON_A_STICK: "ENCHANTED_CARROT_STICK",
};

function commaify(n) {
    var s = n.toString();
    if (s.length <= 4) {
        return s;
    }
    else {
        return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

var cache = new Map();
function getItemPlan(hypixel, name, parents) {
    var _a;
    if (parents === void 0) { parents = []; }
    return __awaiter(this, void 0, void 0, function () {
        var cacheName, cached, item, plans, ingredientsMap, sawParent, _b, _c, ingredient, _d, name_1, amountStr, amount, ingredients, cost, undefinedIngredient, ingredients_1, ingredients_1_1, ingredient, bazaar, bestPlan;
        var e_1, _e, e_2, _f;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    cacheName = __spreadArray(__spreadArray([], __read(parents)), [name]).join(" ");
                    cached = cache.get(cacheName);
                    if (cached !== undefined) {
                        return [2, cached];
                    }
                    item = items[name];
                    if (item === undefined) {
                        throw new Error("Unknown item: " + JSON.stringify(name));
                    }
                    plans = [];
                    if (!(item.recipe !== undefined)) return [3, 2];
                    ingredientsMap = {};
                    sawParent = false;
                    try {
                        for (_b = __values(item.recipe), _c = _b.next(); !_c.done; _c = _b.next()) {
                            ingredient = _c.value;
                            if (ingredient === null) {
                                continue;
                            }
                            _d = __read(ingredient.split(":"), 2), name_1 = _d[0], amountStr = _d[1];
                            if (parents.includes(name_1)) {
                                sawParent = true;
                                break;
                            }
                            amount = parseInt(amountStr);
                            (_a = ingredientsMap[name_1]) !== null && _a !== void 0 ? _a : (ingredientsMap[name_1] = 0);
                            ingredientsMap[name_1] += amount;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (!!sawParent) return [3, 2];
                    return [4, Promise.all(Object.entries(ingredientsMap).map(function (_a) {
                            var _b = __read(_a, 2), item = _b[0], amount = _b[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            _c = {
                                                amount: amount
                                            };
                                            return [4, getItemPlan(hypixel, item, __spreadArray(__spreadArray([], __read(parents)), [name]))];
                                        case 1: return [2, (_c.plan = _d.sent(),
                                                _c)];
                                    }
                                });
                            });
                        }))];
                case 1:
                    ingredients = _g.sent();
                    cost = 0;
                    undefinedIngredient = false;
                    try {
                        for (ingredients_1 = __values(ingredients), ingredients_1_1 = ingredients_1.next(); !ingredients_1_1.done; ingredients_1_1 = ingredients_1.next()) {
                            ingredient = ingredients_1_1.value;
                            if (ingredient.plan === undefined) {
                                undefinedIngredient = true;
                                break;
                            }
                            cost += ingredient.amount * ingredient.plan.cost;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (ingredients_1_1 && !ingredients_1_1.done && (_f = ingredients_1.return)) _f.call(ingredients_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (!undefinedIngredient) {
                        plans.push({
                            type: "craft",
                            ingredients: ingredients,
                            recipe: item.recipe,
                            item: name,
                            cost: cost,
                        });
                    }
                    _g.label = 2;
                case 2: return [4, getBazaarData(hypixel)];
                case 3:
                    bazaar = (_g.sent())[name];
                    if (bazaar !== undefined) {
                        plans.push({
                            type: "bazaar_buy",
                            item: name,
                            cost: bazaar.quick_status.buyPrice,
                        });
                    }
                    bestPlan = plans.sort(function (a, b) { return a.cost - b.cost; })[0];
                    setTimeout(function () {
                        cache.delete(cacheName);
                    }, 15000);
                    return [2, bestPlan];
            }
        });
    });
}
function stringifyPlan(plan, amount) {
    if (amount === void 0) { amount = 1; }
    var item = items[plan.item].name + "\u00A7r" + (amount === 1 ? "" : " x" + commaify(amount));
    switch (plan.type) {
        case "bazaar_buy": {
            return "Buy " + item + " for $" + commaify(Math.round(plan.cost * amount * 10) / 10);
        }
        case "craft": {
            return "Craft " + item + (items[plan.item].crafttext === undefined ||
                items[plan.item].crafttext === ""
                ? ""
                : " (" + items[plan.item].crafttext + ")") + " with\n" + plan.ingredients
                .map(function (_a) {
                var amount = _a.amount, plan = _a.plan;
                return stringifyPlan(plan, amount)
                    .split("\n")
                    .map(function (line) { return " ".repeat(2) + line; })
                    .join("\n");
            })
                .join("\n");
        }
        default:
            return plan;
    }
}

var API_KEY_MSG = "Please set your Hypixel API key (obtainable with /api new) with /bzf setkey <key>";
var apiKey = FileLib.read("bzflipper", "apikey.txt");
var hypixel = null;
if (apiKey === null) {
    ChatLib.chat(API_KEY_MSG);
}
else {
    hypixel = new Hypixel(apiKey);
}
var targetItem = undefined;
var targetBazaar = undefined;
var targetPlan = undefined;
var commands = {
    help: function () {
        ChatLib.chat(dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        \u00A7a\u00A7l--- bzflipper ---\n        \u00A7b/bzf set <item name> \u00A77-\u00A7a Calculates the optimal method of getting the item\n        \u00A7b/bzf clear \u00A77-\u00A7a Hides the GUI\n        \u00A7b/bzf find \u00A77-\u00A7a Finds the item with the best profit percentage which is undersupplied\n        \u00A7b/bzf setkey <key>\u00A77-\u00A7a Sets your Hypixel API key\n      "], ["\n        \u00A7a\u00A7l--- bzflipper ---\n        \u00A7b/bzf set <item name> \u00A77-\u00A7a Calculates the optimal method of getting the item\n        \u00A7b/bzf clear \u00A77-\u00A7a Hides the GUI\n        \u00A7b/bzf find \u00A77-\u00A7a Finds the item with the best profit percentage which is undersupplied\n        \u00A7b/bzf setkey <key>\u00A77-\u00A7a Sets your Hypixel API key\n      "]))));
    },
    set: function () {
        var givenName = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            givenName[_i] = arguments[_i];
        }
        if (hypixel === null) {
            ChatLib.chat(API_KEY_MSG);
            return;
        }
        new Thread(function () {
            var id = Object.entries(items)
                .map(function (_a) {
                var _b = __read(_a, 2), id = _b[0], item = _b[1];
                return [
                    id,
                    leven_1(givenName.join(" "), item.name.replace(/§./g, "")),
                ];
            })
                .sort(function (_a, _b) {
                var _c = __read(_a, 2), a = _c[1];
                var _d = __read(_b, 2), b = _d[1];
                return a - b;
            })[0][0];
            var item = items[id];
            if (item === undefined) {
                ChatLib.chat("Unknown item");
                return;
            }
            targetItem = item;
            targetBazaar = undefined;
            targetPlan = undefined;
            getBazaarData(hypixel).then(function (bazaar) {
                targetBazaar = bazaar[id];
            });
            getItemPlan(hypixel, id).then(function (plan) {
                targetPlan = plan;
            });
        }).start();
    },
    clear: function () {
        targetItem = undefined;
        targetBazaar = undefined;
        targetPlan = undefined;
    },
    find: function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var allBazaar, bestRatio, _b, _c, _d, bazaarName, bazaar, itemName, plan, ratio, e_1_1;
            var e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (hypixel === null) {
                            ChatLib.chat(API_KEY_MSG);
                            return [2];
                        }
                        targetItem = undefined;
                        targetBazaar = undefined;
                        targetPlan = undefined;
                        return [4, getBazaarData(hypixel)];
                    case 1:
                        allBazaar = _f.sent();
                        bestRatio = -Infinity;
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 7, 8, 9]);
                        _b = __values(Object.entries(allBazaar)), _c = _b.next();
                        _f.label = 3;
                    case 3:
                        if (!!_c.done) return [3, 6];
                        _d = __read(_c.value, 2), bazaarName = _d[0], bazaar = _d[1];
                        if (bazaar.quick_status.sellVolume > bazaar.quick_status.buyVolume) {
                            return [3, 5];
                        }
                        itemName = (_a = bazaarToReal[bazaarName]) !== null && _a !== void 0 ? _a : bazaarName.split(":")[0];
                        return [4, getItemPlan(hypixel, itemName)];
                    case 4:
                        plan = _f.sent();
                        if (plan === undefined) {
                            return [3, 5];
                        }
                        ratio = bazaar.quick_status.sellPrice / plan.cost;
                        if (ratio > bestRatio) {
                            bestRatio = ratio;
                            targetItem = items[itemName];
                            targetBazaar = allBazaar[itemName];
                            targetPlan = plan;
                        }
                        _f.label = 5;
                    case 5:
                        _c = _b.next();
                        return [3, 3];
                    case 6: return [3, 9];
                    case 7:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 9];
                    case 8:
                        try {
                            if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7];
                    case 9: return [2];
                }
            });
        });
    },
    setkey: function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiKey = key;
                        hypixel = new Hypixel(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, hypixel.key()];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        ChatLib.chat(err_1.message);
                        return [2];
                    case 4:
                        FileLib.write("bzflipper", "apikey.txt", key);
                        ChatLib.chat("API key set.");
                        return [2];
                }
            });
        });
    },
};
register("command", function (name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var command = commands[name !== null && name !== void 0 ? name : "help"];
    if (command === undefined) {
        ChatLib.chat("Unknown subcommand. Try \"/bzf help\"");
    }
    else {
        command.apply(void 0, __spreadArray([], __read(args)));
    }
}).setCommandName("bzf");
register("renderOverlay", function () {
    var parts = [];
    if (targetItem !== undefined && targetPlan === undefined) {
        parts.push("Get " + targetItem.name);
        parts.push("");
    }
    if (targetPlan !== undefined) {
        var plan = targetPlan;
        parts.push(stringifyPlan(plan));
        parts.push("");
        parts.push("Cost: $" + commaify(Math.round(plan.cost * 10) / 10));
    }
    if (targetBazaar !== undefined) {
        parts.push("Gross: $" + commaify(Math.round(targetBazaar.quick_status.sellPrice * 10) / 10));
    }
    if (targetBazaar !== undefined && targetPlan !== undefined) {
        var profit = targetBazaar.quick_status.sellPrice - targetPlan.cost;
        parts.push("Profit: \u00A7" + (profit < 0 ? "c" : profit > 0 ? "a" : "f") + "$" + commaify(Math.round(profit * 10) / 10) + " = " + Math.round((targetBazaar.quick_status.sellPrice / targetPlan.cost - 1) *
            100 *
            100) / 100 + "%");
    }
    if (targetBazaar !== undefined) {
        parts.push("");
        parts.push("Buy volume: " + commaify(targetBazaar.quick_status.buyVolume));
        parts.push("Sell volume: " + commaify(targetBazaar.quick_status.sellVolume));
        var difference = targetBazaar.quick_status.sellVolume -
            targetBazaar.quick_status.buyVolume;
        parts.push("Market state: \u00A7" + (difference < 0 ? "a" : difference > 0 ? "c" : "f") + (difference < 0 ? "Shortage" : difference > 0 ? "Surplus" : "Equilibrium") + " of " + commaify(Math.abs(difference)));
    }
    Renderer.drawString(parts.join("\n"), 10, 10);
});
var templateObject_1;
