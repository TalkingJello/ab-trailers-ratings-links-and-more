// ==UserScript==
// @name          AB - Trailers, Ratings, Links (and more?)
// @namespace     TalkingJello@animebytes.tv
// @version       1.0.4
// @author        TalkingJello
// @source        https://github.com/TalkingJello/ab-trailers-ratings-links-and-more
// @description   Adds trailers, additional ratings, links (and more?) to AB anime pages
// @icon          http://animebytes.tv/favicon.ico
// @license       MIT
// @match         *://animebytes.tv/torrents.php?id=*
// @match         *://animebytes.tv/user.php?action=edit*
// @require       https://raw.githubusercontent.com/momentary0/AB-Userscripts/b1e7aac27e1f49391147cf068326f278bb40e20d/delicious-library/src/ab_delicious_library.js
// @require       https://raw.githubusercontent.com/rendro/easy-pie-chart/97b5824bf423410c3c6a1e971860159f17ee6ee6/dist/jquery.easypiechart.min.js
// @grant         GM_addElement
// @grant         GM_addStyle
// @grant         GM_xmlhttpRequest
// @grant         GM_listValues
// @grant         GM_deleteValue
// @grant         GM_setValue
// @grant         GM_getValue
// @connect       api.themoviedb.org
// @connect       api.anidb.net
// @connect       api.jikan.moe
// @connect       www.imdb.com
// @connect       youtubei.googleapis.com
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".abtexr-scale-on-hover:hover {\n  transform: scale(1.1) !important;\n}\n.abtexr-rating-text-div #rating_stats {\n  text-align: center;\n}\n.abtexr-ui-stars-star-my {\n  filter: hue-rotate(297deg) saturate(5);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./config/metadata.cjs":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { author, repository, version, description } = __webpack_require__("./package.json");

module.exports = {
  name: "AB - Trailers, Ratings, Links (and more?)",
  namespace: "TalkingJello@animebytes.tv",
  version,
  author,
  source: repository.url,
  description,
  icon: "http://animebytes.tv/favicon.ico",
  license: "MIT",
  source: repository.url,
  match: [
    "*://animebytes.tv/torrents.php?id=*",
    "*://animebytes.tv/user.php?action=edit*",
  ],
  require: [
    "https://raw.githubusercontent.com/momentary0/AB-Userscripts/b1e7aac27e1f49391147cf068326f278bb40e20d/delicious-library/src/ab_delicious_library.js",
    "https://raw.githubusercontent.com/rendro/easy-pie-chart/97b5824bf423410c3c6a1e971860159f17ee6ee6/dist/jquery.easypiechart.min.js",
  ],
  grant: [
    "GM_addElement",
    "GM_addStyle",
    "GM_xmlhttpRequest",
    "GM_listValues",
    "GM_deleteValue",
    "GM_setValue",
    "GM_getValue",
  ],
  connect: [
    "api.themoviedb.org",
    "api.anidb.net",
    "api.jikan.moe",
    "www.imdb.com",
    "youtubei.googleapis.com",
    // "api.myanimelist.net"
  ],
};


/***/ }),

/***/ "./package.json":
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"ab-trailers-ratings-links-and-more","description":"Adds trailers, additional ratings, links (and more?) to AB anime pages","version":"1.0.4","author":"TalkingJello","scripts":{"format":"prettier -w ./","build":"webpack --config config/webpack.config.prod.cjs","dev":"webpack --config config/webpack.config.dev.cjs","prepare":"husky install","lint-staged":"lint-staged"},"repository":{"type":"git","url":"https://github.com/TalkingJello/ab-trailers-ratings-links-and-more"},"private":true,"dependencies":{},"lint-staged":{"*.{js,jsx,ts,tsx,json}":["prettier --ignore-path ./.prettierignore --write "]},"devDependencies":{"@types/greasemonkey":"^4.0.4","@types/jquery":"^3.5.14","@types/node":"^18.11.8","browserslist":"^4.21.4","cross-env":"^7.0.3","css-loader":"^6.7.1","husky":"^8.0.1","less":"^4.1.3","less-loader":"^11.1.0","lint-staged":"^13.0.3","prettier":"^2.7.1","style-loader":"^3.3.1","ts-loader":"^9.4.1","typescript":"^4.8.4","userscript-metadata-webpack-plugin":"^0.2.12","webpack":"^5.74.0","webpack-bundle-analyzer":"^4.7.0","webpack-cli":"^4.10.0","webpack-livereload-plugin":"^3.0.2","webpack-merge":"^5.8.0","webpack-sources":"^3.2.3"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./config/metadata.cjs
var metadata = __webpack_require__("./config/metadata.cjs");
;// CONCATENATED MODULE: ./src/constants.ts

// From metadata
const NAME = metadata.name;
const AUTHOR = metadata.author;
// Other constants
const DEFAULT_CACHE_TIME = 1000 * 60 * 60 * 24; // 1 day
const TMDB_LANGUAGE = "en-US";
const UNIQUE = "abtexr";
const ANIDB_CLIENT_NAME = "abtexr";
const ANIDB_CLIENT_VERSION = "1";
const TMDB_DEFAULT_API_KEY = "fe87c50cd11a52087a6e806623385b73";
const MAL_DEFAULT_API_KEY = "015cace9ce2a8dbd866dd7d9fa3ab561";
const internetOrWebsiteDownErrorTitle = (websiteName) => `Make sure you're connected to the internet and that ${websiteName} is not down. Also make sure that the external ${websiteName} link is correct and leads to the anime's page.`;

;// CONCATENATED MODULE: ./src/helpers/log.ts

function log(...rest) {
    console.log(`[${NAME}]`, ...rest);
}
function logError(...rest) {
    console.error(`[${NAME}]`, ...rest);
}

;// CONCATENATED MODULE: ./src/helpers/cache.ts


function checkCache(id, time = DEFAULT_CACHE_TIME) {
    const lastUpdate = GM_getValue(`cache_last_update_${id}`);
    if (typeof lastUpdate !== "number" || Date.now() > lastUpdate + time) {
        return;
    }
    const cached = GM_getValue(`cache_map_${id}`);
    if (typeof cached === undefined) {
        return;
    }
    log(`cache hit for ${id}`);
    return cached;
}
function saveCache(id, val) {
    GM_setValue(`cache_map_${id}`, val);
    GM_setValue(`cache_last_update_${id}`, Date.now());
}
function deleteCache(id) {
    GM_deleteValue(`cache_map_${id}`);
    GM_deleteValue(`cache_last_update_${id}`);
}
function clearCache() {
    GM_listValues()
        .filter((v) => v.startsWith("cache_"))
        .forEach((name) => GM_deleteValue(name));
}

;// CONCATENATED MODULE: ./src/providers/MetadataProvider.ts


var VideoSite;
(function (VideoSite) {
    VideoSite["YouTube"] = "YouTube";
    VideoSite["Vimeo"] = "Vimeo";
})(VideoSite || (VideoSite = {}));
var ProviderFlags;
(function (ProviderFlags) {
    ProviderFlags["Score"] = "score";
    ProviderFlags["Trailers"] = "trailers";
    ProviderFlags["Link"] = "link";
    ProviderFlags["ApiKey"] = "api-key";
})(ProviderFlags || (ProviderFlags = {}));
class MetadataProvider {
    initilizationPromise;
    apiKeyInstructionsLink = "";
    apiKeyName = "";
    defaultApiKey = "";
    async ensureInitialized() {
        if (this.initilizationPromise) {
            return await this.initilizationPromise;
        }
        this.initilizationPromise = this.init();
        return await this.initilizationPromise;
    }
    flags = new Set();
    flagSupported(flag) {
        return this.flags.has(flag);
    }
    flagEnabled(flag) {
        return (this.flagSupported(flag) &&
            JSON.parse(GM_getValue(`provider-${this.name}-enable-${flag}`, "true")));
    }
    async getLink() {
        return false;
    }
    async getTrailers() {
        return [];
    }
    async getScore() {
        return;
    }
    insertScore(parent, score) {
        log("insertScore", this.name, score);
        return;
    }
    static getUserApiKey(providerName, defaultKey = "") {
        return GM_getValue(`provider-${providerName}-api-key`, defaultKey);
    }
    getUserApiKey() {
        return GM_getValue(`provider-${this.name}-api-key`, this.defaultApiKey);
    }
    getScoreWeightForAverage() {
        const res = JSON.parse(GM_getValue(`provider-${this.name}-${ProviderFlags.Score}-average-weight`, "1"));
        if (typeof res !== "number") {
            GM_setValue(`provider-${this.name}-${ProviderFlags.Score}-average-weight`, "1");
            return 1;
        }
        return res;
    }
    isEnabled() {
        return JSON.parse(GM_getValue(`provider-${this.name}-provider-enabled`, "true"));
    }
    marker;
    insertSetApiKeySettings(s) {
        const id = `${UNIQUE}-provider-${this.name}-api-key-settings`;
        const currentApiKey = this.getUserApiKey();
        // The marker just helps us recreate the settings in the same place
        if (!this.marker) {
            this.marker = $(`<p style="display: none;"></p>`);
            $(s).append(this.marker);
        }
        else {
            $(`#${id}`).remove();
        }
        const div = $(`<div id="${id}"></div>`);
        // Set api key
        const set = $(`<li>
<span class="ue_left strong">API Key</span>
<span class="ue_right">
  <input type="button"
  value="${currentApiKey ? "Override Current" : "Set"} API Key"
  class="btn-${currentApiKey ? "delete" : "sub"}" style="">
  <label style="margin-left: 4px;">
  Click to set your ${this.name} API key (aka ${this.apiKeyName}).
  This is required for this provider to work.
  Getting an API key isn't too complicated and should only take a few minutes,
  when prompted for details on the key creation you can usually fill random information.
  <br><a target="_blank" href="${this.apiKeyInstructionsLink}">Link to further instructions.</a>
  </label>
</span>
</li>`);
        set.find("input").click(() => {
            const key = prompt(`Enter your ${this.name} API key:`, currentApiKey);
            if (typeof key === "string") {
                GM_setValue(`provider-${this.name}-api-key`, key);
                this.insertSetApiKeySettings(s);
            }
        });
        div.append(set);
        // Test api key
        if (currentApiKey) {
            const test = $(`<li>
<span class="ue_left strong">Test API Key</span>
<span class="ue_right">
  <input type="button"
  value="Test API Key"
  class="btn-sub" style="background: -webkit-gradient(linear,left top,left bottom,color-stop(0,#7eda37),color-stop(100%,#047d00));">
  <label style="margin-left: 4px;">
  Click to test and verify that the entered API key works.
  If it doesn't work make sure you entered it correctly.
  If you still need help, you can <a target="_blank" href="https://animebytes.tv/inbox.php?action=compose&to=60066">message me</a>.
  </label>
</span>
</li>`);
            const button = test.find("input");
            test.click(async () => {
                button.val("Testing...");
                button.prop("disabled", true);
                button.css("background", "gray");
                try {
                    // timeout
                    const result = await this.testApiKey();
                    if (result) {
                        alert("API key is valid!");
                    }
                    else {
                        alert(`API key is invalid!`);
                    }
                }
                catch (err) {
                    alert(`API key is invalid! Error: ${err.message ? err.message : err}`);
                }
                finally {
                    button.val("Test API Key");
                    button.prop("disabled", false);
                    button.css("background", "-webkit-gradient(linear,left top,left bottom,color-stop(0,#7eda37),color-stop(100%,#047d00))");
                }
            });
            div.append(test);
        }
        this.marker.after(div);
    }
    insertDeliciousSettings(s) {
        delicious.settings.init(`provider-${this.name}-provider-enabled`, true);
        s.appendChild(delicious.settings.createCheckbox(`provider-${this.name}-provider-enabled`, `Enable ${this.name}`, `Completely enable or disable using and displaying all information from ${this.name}.`));
        if (this.flagSupported(ProviderFlags.Link)) {
            delicious.settings.init(`provider-${this.name}-enable-${ProviderFlags.Link}`, true);
            s.appendChild(delicious.settings.createCheckbox(`provider-${this.name}-enable-${ProviderFlags.Link}`, "Enable Link", `Add a link to anime's ${this.name} page in the links section`));
        }
        if (this.flagSupported(ProviderFlags.Score)) {
            delicious.settings.init(`provider-${this.name}-enable-${ProviderFlags.Score}`, true);
            s.appendChild(delicious.settings.createCheckbox(`provider-${this.name}-enable-${ProviderFlags.Score}`, "Enable Rating", `Show ratings from ${this.name}`));
            delicious.settings.init(`provider-${this.name}-${ProviderFlags.Score}-average-weight`, 1);
            s.appendChild(delicious.settings.createNumberInput(`provider-${this.name}-${ProviderFlags.Score}-average-weight`, "Weight in Average Score", `The weight of this provider's score in the average score widget. Can be set to 0 to not include this provider's score in the average. 1 is the default.`, {
                default: "1",
                required: true,
            }));
        }
        if (this.flagSupported(ProviderFlags.Trailers)) {
            delicious.settings.init(`provider-${this.name}-enable-${ProviderFlags.Trailers}`, true);
            s.appendChild(delicious.settings.createCheckbox(`provider-${this.name}-enable-${ProviderFlags.Trailers}`, "Enable Trailers", `Search ${this.name} for trailers`));
        }
        if (this.flagSupported(ProviderFlags.ApiKey)) {
            this.insertSetApiKeySettings(s);
        }
        return;
    }
}

;// CONCATENATED MODULE: ./src/delicious.ts




function deliciousSubHeading(s, title) {
    const h3 = $(`<h3 style="
    margin-bottom: 2px;
    margin-top: 18px;
    font-size: 12px;
    margin-left: 20px;
    text-decoration: underline;">${title}</h3>`);
    $(s).append(h3);
}
function insertDeliciousSettingsUi(providers) {
    if (!delicious.settings.ensureSettingsInserted()) {
        return;
    }
    var section = delicious.settings.createCollapsibleSection(NAME);
    var s = section.querySelector(".settings_section_body");
    // General
    deliciousSubHeading(s, "General");
    delicious.settings.init("TrailerAudioLanguage", "any");
    s.appendChild(delicious.settings.createDropDown("preferredTrailerAudioLanguage", "Preferred Trailer Audio Language", "All found trailers will be available regardless for selection. Language is not guarneteed to be detected properly, depends on the TMDB title of the trailer.", [
        ["Any", "any"],
        ["Prefer Dubbed", "dubbed"],
        ["Disprefer Dubbed", "not-dubbed"],
    ], { default: "any" }));
    delicious.settings.init("linksInNewTab", true);
    s.appendChild(delicious.settings.createCheckbox("linksInNewTab", "Open links in new tab", "Open external anime links in a new tab. Applies to all links, both the ones already present (AniDB and MAL for example), and the ones added by the script (such as TMDB and IMDb)."));
    delicious.settings.init("itemsOnTop", true);
    s.appendChild(delicious.settings.createCheckbox("itemsOnTop", "Items On Top", "Place the script items (trailer and ratings), alongside the `Plot Synopsis`, on the top of the page, before the torrent list"));
    delicious.settings.init("jumpToTorrentsLink", true);
    s.appendChild(delicious.settings.createCheckbox("jumpToTorrentsLink", "Jump to Torrents Link", "Add a link after the external anime links, that will jump to the torrent list."));
    delicious.settings.init("trailerAfterSynopsis", false);
    s.appendChild(delicious.settings.createCheckbox("trailerAfterSynopsis", "Trailer After Synopsis", "Insert trailer after `Plot Synopsis` instead of before"));
    delicious.settings.init("showAverageRating", true);
    s.appendChild(delicious.settings.createCheckbox("showAverageRating", "Show Average Rating", "When pulling ratings from multiple providers, show the average rating widget."));
    delicious.settings.init(`ab-${ProviderFlags.Score}-average-weight`, 1);
    s.appendChild(delicious.settings.createNumberInput(`ab-${ProviderFlags.Score}-average-weight`, "AB Rating Weight in Average", `The weight of the AnimeBytes rating in the average score widget. Can be set to 0 to not include AnimeBytes score in the average. 1 is the default.`, {
        default: "1",
        required: true,
    }));
    // Provider specific
    providers.forEach((p) => {
        deliciousSubHeading(s, p.name);
        p.insertDeliciousSettings(s);
    });
    // Advanced
    deliciousSubHeading(s, "Advanced");
    // MediaInfo Improvements interactions
    $(s).append(`<p>If you are using <a href="https://animebytes.tv/forums.php?action=viewthread&threadid=27557" target="_blank"><i>MediaInfo Improvements</i> userscript</a> ,
and experience issues with the average rating widget wrapping to a new line on it's own...
(this happens because MediaInfo Improvements script makes the main torrent page section take more space)
Consider enabling <b>one</b> of the following options.
The right solution for you depends on your screen size, browser window size, and zoom level. Try them both out!
</p>`);
    delicious.settings.init("tryToNotWrapRatings", false);
    s.appendChild(delicious.settings.createCheckbox("tryToNotWrapRatings", "Try to Avoid Ratings Wrap", `Reduces space between each rating source,
which should help avoid wrapping and keep all ratings in one big row.
Downside is that the ratings will be a bit more squished together
and that depending on your screen size and zoom level, the original issue can still occur.`));
    delicious.settings.init("abAndAverageOnSeperateRow", false);
    s.appendChild(delicious.settings.createCheckbox("abAndAverageOnSeperateRow", "AB and Average Scores on Seperate Row", `Puts the AnimeBytes and average score widgets on a seperate row from the other providers.
This in essence "forces" a wrap,
but in ensures they are wrapped together which looks better.
Downside is that you will have 2 rows of ratings instead of 1,
but the ratings will be more spaced out and there is no risk of still wrapping
like with the other option.`));
    // Buttons
    deliciousSubHeading(s, "Funny Looking Buttons");
    const clearCacheButton = $(`<input type="button" style="margin-left: 20px;" value="Clear Cache"/>`);
    clearCacheButton.click(() => {
        clearCache();
        alert("Cache cleared!");
    });
    $(s).append(clearCacheButton);
    const resetSettingsButton = $(`<input type="button" style="margin-left: 20px;" value="Reset Settings"/>`);
    resetSettingsButton.click(() => {
        // confirm
        if (!confirm("Are you sure you want to reset all settings?")) {
            return;
        }
        GM_listValues()
            .filter((v) => !v.startsWith("cache_") && !v.endsWith("-api-key"))
            .forEach((name) => GM_deleteValue(name));
        window.location.reload();
    });
    $(s).append(resetSettingsButton);
    const resetApiKeysButton = $(`<input type="button" style="margin-left: 20px;" value="Reset API Keys"/>`);
    resetApiKeysButton.click(() => {
        // confirm
        if (!confirm("Are you sure you want to reset to the default API keys?")) {
            return;
        }
        GM_listValues()
            .filter((v) => v.endsWith("-api-key"))
            .forEach((name) => GM_deleteValue(name));
        window.location.reload();
    });
    $(s).append(resetApiKeysButton);
    delicious.settings.insertSection(section);
}
const settings = {
    preferredTrailerAudioLanguage: JSON.parse(GM_getValue("preferredTrailerAudioLanguage", '"any"')),
    itemsOnTop: JSON.parse(GM_getValue("itemsOnTop", "true")),
    jumpToTorrentsLink: JSON.parse(GM_getValue("jumpToTorrentsLink", "true")),
    trailerAfterSynopsis: JSON.parse(GM_getValue("trailerAfterSynopsis", "false")),
    linksInNewTab: JSON.parse(GM_getValue("linksInNewTab", "true")),
    showAverageRating: JSON.parse(GM_getValue("showAverageRating", "true")),
    abScoreAverageWeight: JSON.parse(GM_getValue(`ab-${ProviderFlags.Score}-average-weight`, "1")),
    tryToNotWrapRatings: JSON.parse(GM_getValue("tryToNotWrapRatings", "false")),
    abAndAverageOnSeperateRow: JSON.parse(GM_getValue("abAndAverageOnSeperateRow", "false")),
};
log("settings", settings);

;// CONCATENATED MODULE: ./src/dom/pageSection.ts
function pageSection(name) {
    const container = $(`<div class="box"><div class="head"><strong>${name}</strong></div><div class="body" style="display: flex; justify-content: center;"></div>`);
    const errSpan = $('<span style="color:red; display: none;"></span>');
    container.append(errSpan);
    const setError = (m) => {
        errSpan.show();
        errSpan.text(m);
    };
    const resetError = () => {
        errSpan.hide();
        errSpan.text("");
    };
    return {
        setError,
        resetError,
        container,
        head: container.find(".head"),
        body: container.find(".body"),
    };
}

;// CONCATENATED MODULE: ./src/dom/displayErrors.ts


const errorsSection = pageSection("Errors");
const { container, body } = errorsSection;
container.hide();
body.css("display", "block");
const notice = $(`<h4 style="
    color: #cdb25c;
    border-top: 1px solid gray;
    padding-top: 4px;
    margin-top: 4px;
">
Try refreshing the page.
If the errors persist,
and you believe it's an issue with the script,
please report to ${AUTHOR}
</h4>`).appendTo(body);
let num = 1;
function uiShowError(title, subtitle, err) {
    const errorDiv = $(`<div></div>`).insertBefore(notice);
    const titleElem = $(`<h4 style="color: indianred;">${num}. ${title} </h4>`).appendTo(errorDiv);
    const toggle = $(`<span style="cursor: pointer;">[Expand]</span>`).appendTo(titleElem);
    $(`<h4 style="color: #cd7c5c; margin-left: 17px;">${subtitle}</h4>`).appendTo(errorDiv);
    const stack = $(`<pre style="margin-left: 17px;"></pre>`)
        .hide()
        .text(err.stack)
        .appendTo(errorDiv);
    toggle.click(() => {
        if (toggle.text() === "[Expand]") {
            toggle.text("[Collapse]");
            stack.slideDown(200);
        }
        else {
            toggle.text("[Expand]");
            stack.slideUp(200);
        }
    });
    num++;
    container.show();
}
// @ts-expect-error
unsafeWindow.uiShowError = uiShowError;

;// CONCATENATED MODULE: ./src/dom/injectLinksToPage.ts




async function injectLinksToPage(providers) {
    const links = $("#content > div.thin > h3");
    if (settings.linksInNewTab) {
        links.find("a").attr("target", "_blank");
    }
    if (settings.jumpToTorrentsLink) {
        const jumpToTorrents = $(`<h3 style="text-decoration: underline; margin-top: -3px;">
<a href="javascript:void(0);">Jump to Torrents ➥</a>
</h3>`);
        jumpToTorrents.click(() => {
            $(".torrent_table")[0].scrollIntoView();
        });
        links.after(jumpToTorrents);
    }
    const res = await Promise.allSettled(providers.map(async (p) => {
        try {
            return await p.getLink();
        }
        catch (err) {
            uiShowError(`Failed to create external link to ${p.name}`, internetOrWebsiteDownErrorTitle(p.name), err);
            throw err;
        }
    }));
    res.forEach((r) => {
        if (r.status === "rejected") {
            logError(r.reason);
            return;
        }
        const link = r.value;
        if (!link) {
            return;
        }
        links.append(" | ", `<a href="${link.url}" target="${settings.linksInNewTab ? "_blank" : ""}">${link.name}</a>`);
    });
}

;// CONCATENATED MODULE: ./src/helpers/formatVotes.ts
const formatter = Intl.NumberFormat("en", { notation: "compact" });
function displayVotes(votes) {
    const formatted = votes < 10000 ? votes.toLocaleString() : formatter.format(votes);
    const title = votes < 10000 ? "" : votes.toLocaleString();
    return `<i title="${title}">${formatted}</i>`;
}

;// CONCATENATED MODULE: ./src/helpers/subscribeToAbScoreChange.ts
function abScoreFromPage() {
    let myRating = 0;
    const match = $("#message")
        .text()
        .match(/^My vote: (\d+)$/);
    const deleteHref = $("#rating_stats > a").attr("href");
    if (match &&
        match[1] &&
        $("#message").css("display") !== "none" &&
        deleteHref &&
        deleteHref.startsWith("javascript:deleteVote")) {
        myRating = parseInt(match[1]);
    }
    const parsedRating = parseFloat($("#avg_rating").text());
    const parsedVotes = parseInt($("#num_rating").text());
    return [
        {
            rating: isNaN(parsedRating) ? 0 : parsedRating,
            votes: isNaN(parsedVotes) ? 0 : parsedVotes,
        },
        myRating,
        deleteHref,
    ];
}
let observer;
let callbacks = [];
let previousScore = false;
function subscribeToAbScoreChange(onUpdate) {
    callbacks.push(onUpdate);
    if (observer) {
        onUpdate(...abScoreFromPage());
        return;
    }
    observer = new MutationObserver(() => {
        const res = abScoreFromPage();
        if (previousScore &&
            res[0].rating === previousScore[0].rating &&
            res[0].votes === previousScore[0].votes &&
            res[1] === previousScore[1] &&
            res[2] === previousScore[2]) {
            return;
        }
        previousScore = res;
        callbacks.forEach((cb) => cb(...res));
    });
    observer.observe($("#rating").get(0), {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: false,
    });
    observer.observe($("#rating_stats").get(0), {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: false,
    });
    observer.observe($("#container_star").get(0), {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
    });
    onUpdate(...abScoreFromPage());
}

;// CONCATENATED MODULE: ./src/dom/animeBytesRating.ts




function injectAnimeBytesRating(parent) {
    const container = $(`<div style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
  "><div
      style="
          background: 0 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
      "
      >
<div
              class="${UNIQUE}-scale-on-hover"
              style="
                  width: 68px;
                  height: 68px;
                  display: inline-block;
                  transition: transform 0.2s;
                  transform: scale(1);
              "
          ></div>
          <div
              class="${UNIQUE}-rating-text-div"
              style="
                  font-weight: 700;
                  margin-left: 5px;
                  color: #fff;
                  line-height: 20px;
                  font-size: 13px;
              "
          ></div>
      </div>
  `);
    // Image
    const scale = container.find(`.${UNIQUE}-scale-on-hover`);
    scale.append(`<img src="https://mei.animebytes.tv/Ok3xQjqTaoN.png" style="width: 66px; height: 66px;" />`);
    // Rating
    const ratingContainer = container.find(`.${UNIQUE}-rating-text-div`);
    const rating = $(`<span></span>`).appendTo(ratingContainer);
    ratingContainer.append("<br>");
    // My rating
    const myRatingDiv = $(`<div></div>`).hide().appendTo(ratingContainer);
    const del = $(`<a href="#" style="position: relative; top: 3px;"><svg style="width: 16px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fe2a73">
    <title>Remove Rating</title>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg></a>`).appendTo(myRatingDiv);
    const myRating = $(`<span style="color: #fe2a73;"></span>`).appendTo(myRatingDiv);
    myRatingDiv.append(`<br>`);
    // Votes
    const votes = $(`<span style="color: gray;font-size: 12.5px;"></span>`).appendTo(ratingContainer);
    // Stars
    $("#rating > #container_star")
        .css("padding", "0")
        .detach()
        .appendTo(container);
    // Append to page
    parent.append(container);
    setTimeout(() => subscribeToAbScoreChange((score, myScore, deleteHref) => {
        log("Updating AnimeBytes rating", score, myScore, deleteHref);
        rating.text(`${score.rating === 0 ? "-" : score.rating} / 10`);
        votes.html(score.votes === 0
            ? "No votes yet.<br/>Rate this!"
            : `${displayVotes(score.votes)} votes`);
        if (myScore !== 0) {
            myRatingDiv.slideDown(500);
            myRating.text(`My Rating: ${myScore} / 10`);
            del.attr("href", deleteHref);
            // @ts-expect-error Tint stars
            const instance = $("#stars-wrapper").stars("instance");
            if (!instance) {
                return;
            }
            const defaultValue = parseInt(instance.options.defaultValue);
            // @ts-expect-error
            $("#stars-wrapper").stars("select", defaultValue);
            instance.$stars.each(function (i) {
                const current = i + 1;
                if (myScore < defaultValue && current <= myScore) {
                    $(this).addClass(`${UNIQUE}-ui-stars-star-my`);
                }
                else if (myScore > defaultValue &&
                    defaultValue < current &&
                    current <= myScore) {
                    $(this).addClass(`${UNIQUE}-ui-stars-star-my`);
                    $(this).addClass(`ui-stars-star-on`);
                }
                else {
                    $(this).removeClass(`${UNIQUE}-ui-stars-star-my`);
                }
                $(this);
            });
            return;
        }
        myRatingDiv.slideUp(500);
        // @ts-expect-error
        const instance = $("#stars-wrapper").stars("instance");
        if (!instance) {
            return;
        }
        // @ts-expect-error
        $("#stars-wrapper").stars("select", instance.options.defaultValue);
        // @ts-expect-error
        $("#stars-wrapper").stars("enable");
        instance.$stars.removeClass(`${UNIQUE}-ui-stars-star-my`);
    }), 1);
}

;// CONCATENATED MODULE: ./src/dom/averageRating.ts




function injectAverageRating(scores, parent) {
    const container = $(`<div style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
  "><div
      style="
          background: 0 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
      "
      >
<div
              class="${UNIQUE}-scale-on-hover"
              style="
                  width: 68px;
                  height: 68px;
                  display: inline-block;
                  transition: transform 0.2s;
                  transform: scale(1);
              "
          ></div>
          <div
              class="${UNIQUE}-rating-text-div"
              style="
                  font-weight: 700;
                  margin-left: 5px;
                  color: #fff;
                  line-height: 20px;
                  font-size: 13px;
              "
          ></div>
      </div>
  `);
    // Image
    const scale = container.find(`.${UNIQUE}-scale-on-hover`);
    scale.append(`<img src="https://mei.animebytes.tv/AVN3Hftsygk.png" style="width: 62px; height: 62px; filter: grayscale(0.5);" />`);
    // Rating
    const ratingContainer = container.find(`.${UNIQUE}-rating-text-div`);
    const rating = $(`<span></span>`).appendTo(ratingContainer);
    ratingContainer.append("<br>");
    // Votes
    const votes = $(`<span style="color: gray;font-size: 12.5px;"></span>`).appendTo(ratingContainer);
    // Append to page
    parent.append(container);
    setTimeout(() => subscribeToAbScoreChange((abScore) => {
        const averageRating = scores.reduce((acc, { provider, rating }) => {
            return acc + provider.getScoreWeightForAverage() * rating;
        }, abScore.rating * settings.abScoreAverageWeight) /
            scores
                .filter((score) => score.votes > 0)
                .reduce((acc, { provider }) => acc + provider.getScoreWeightForAverage(), abScore.votes > 0 ? settings.abScoreAverageWeight : 0);
        const totalVotes = scores.reduce((acc, { votes }) => acc + votes, abScore.votes);
        rating.text(`Average: ${averageRating.toFixed(2)} / 10`);
        votes.html(`${displayVotes(totalVotes)} total votes<br>from <i>${scores.length + (abScore.votes > 0 ? 1 : 0)}</i> sources`);
    }), 1);
}

;// CONCATENATED MODULE: ./src/dom/injectRatingsToPage.ts







async function injectRatingsToPage(providers) {
    const res = await Promise.allSettled(providers.map(async (provider) => {
        try {
            const score = await provider.getScore();
            if (!score) {
                return false;
            }
            return {
                provider,
                ...score,
            };
        }
        catch (err) {
            uiShowError(`Failed to fetch rating from ${provider.name}`, internetOrWebsiteDownErrorTitle(provider.name), err);
            throw err;
        }
    }));
    const valid = [];
    res.forEach((r) => {
        if (r.status === "rejected") {
            logError(r.reason);
            return;
        }
        if (r.value !== false) {
            valid.push(r.value);
        }
    });
    if (valid.length === 0) {
        return;
    }
    // General layout
    $("#rating").hide();
    const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
        .parent()
        .parent();
    const { container, body } = pageSection("Ratings");
    synopsis.after(container);
    body.css("gap", "18px");
    body.css("flex-wrap", "wrap");
    body.css("align-items", "start");
    if (settings.tryToNotWrapRatings) {
        body.css("justify-content", "space-evenly");
        body.css("padding", "10px 0");
        body.css("gap", "18px 0");
    }
    // load providers ratings
    valid.forEach((score) => {
        score.provider.insertScore(body, score);
    });
    // Optional forced second row
    const secondRatingRow = $(`<div class="body" style="display: flex; justify-content: center;"></div>`).appendTo(container);
    secondRatingRow.css("gap", "18px");
    secondRatingRow.css("flex-wrap", "wrap");
    secondRatingRow.css("align-items", "start");
    const injectTarget = settings.abAndAverageOnSeperateRow
        ? secondRatingRow
        : body;
    if (settings.abAndAverageOnSeperateRow) {
        body.after(secondRatingRow);
    }
    // AnimeBytes rating
    injectAnimeBytesRating(injectTarget);
    // Average rating
    if (settings.showAverageRating) {
        injectAverageRating(valid, injectTarget);
    }
}

;// CONCATENATED MODULE: ./src/helpers/gmFetchHelpers.ts
function gmFetch(opts, data = null, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const headers = { ...opts.headers };
        if (data) {
            headers["Content-Type"] = "application/json";
        }
        GM_xmlhttpRequest({
            ...opts,
            timeout,
            data: data ? JSON.stringify(data) : null,
            headers,
            ontimeout: function () {
                reject(new Error(`Request timed out after ${timeout}ms`));
            },
            onerror: function (err) {
                reject(err ? err : new Error("Failed to fetch"));
            },
            onload: function (response) {
                resolve(response);
            },
        });
    });
}
async function gmFetchJson(opts, data = null, timeout) {
    const res = await gmFetch(opts, data, timeout);
    return JSON.parse(res.responseText);
}

;// CONCATENATED MODULE: ./src/helpers/fetchYoutubeVideoInfo.ts



function playableAndRejectionsFromResponse(res) {
    const errorRenderer = res.playabilityStatus.errorScreen?.playerErrorMessageRenderer;
    return {
        playable: res.playabilityStatus.status === "OK",
        rejection: res.playabilityStatus.status !== "OK"
            ? {
                status: res.playabilityStatus.status,
                reason: errorRenderer?.reason.simpleText,
                message: errorRenderer?.subreason?.simpleText ||
                    errorRenderer?.subreason?.runs?.[0]?.text ||
                    "",
            }
            : undefined,
    };
}
async function fetchYoutubeVideoInfo(youtubeId) {
    const key = `youtube_item_${youtubeId}`;
    const cached = checkCache(key, 1000 * 60 * 60 * 24 * 7); // 1 week
    if (cached !== undefined && cached.id === youtubeId) {
        return cached;
    }
    const res = await gmFetchJson({
        method: "POST",
        url: "https://youtubei.googleapis.com/youtubei/v1/player",
    }, {
        context: {
            client: {
                clientName: "WEB",
                clientScreen: "EMBED",
                clientVersion: "2.20210721.00.00",
            },
        },
        videoId: youtubeId,
    });
    if (!res.playabilityStatus) {
        logError("youtube res", res);
        throw new Error("Invalid response from YouTube");
    }
    if (!res.videoDetails || res.videoDetails.videoId !== youtubeId) {
        const item = {
            id: youtubeId,
            title: "",
            lengthSeconds: 0,
            viewCount: 0,
            channelId: "",
            captions: [],
            ...playableAndRejectionsFromResponse(res),
        };
        saveCache(key, item);
        return item;
    }
    const item = {
        id: youtubeId,
        title: res.videoDetails.title,
        lengthSeconds: parseInt(res.videoDetails.lengthSeconds),
        viewCount: parseInt(res.videoDetails.viewCount),
        channelId: res.videoDetails.channelId,
        captions: res.captions?.playerCaptionsTracklistRenderer?.captionTracks || [],
        ...playableAndRejectionsFromResponse(res),
    };
    saveCache(key, item);
    return item;
}

;// CONCATENATED MODULE: ./src/dom/ratingBox.ts


function ratingBox(title, subtitle, link) {
    const container = $(`<div
      style="
          background: 0 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
      "
      >
<a target="_blank" href="${link}" style="height: 68px; width: 68px;"><div
              class="${UNIQUE}-scale-on-hover"
              style="
                  width: 68px;
                  height: 68px;
                  display: inline-block;
                  transition: transform 0.2s;
                  transform: scale(1);
                  display: flex;
                  align-items: center;
                  justify-content: center;
              "
          ></div></a>
          <div
              style="
                  font-weight: 700;
                  margin-left: 5px;
                  color: #fff;
                  line-height: 20px;
                  font-size: 13px;
              "
          >
          ${title}
          <br>
          <span style="color: gray;font-size: 12.5px;">${subtitle}</span>
          </div>
      </div>
  `);
    const scale = container.find(`.${UNIQUE}-scale-on-hover`);
    return { container, scale };
}
function ratingBoxFromScore({ rating, votes, breakdownLink, rank }, img, imgSize) {
    const box = ratingBox(`${rating} / 10`, `${displayVotes(votes)} votes`, breakdownLink);
    if (rank) {
        box.scale.attr("title", `Ranked #${rank}`);
    }
    const image = $(`<img src="${img}" style="width: ${imgSize}px; height: ${imgSize}px;" />`).appendTo(box.scale);
    return {
        ...box,
        image,
    };
}

;// CONCATENATED MODULE: ./src/helpers/ensureTmdbIdentified.ts



async function tmdbItem() {
    const mip = tmdbQueryFromPage();
    if (!mip) {
        return false;
    }
    log("Media detected on page:", mip);
    const id = await TmdbProvider.identify(mip.type, mip.name);
    if (!id) {
        log("Could not identify media against TMDB");
        return false;
    }
    log("TMDB Identification result:", id);
    const item = await TmdbProvider.fetchItem(id);
    log("TMDB Item result:", item);
    return item;
}
let tmdbPromise;
async function ensureTmdbItem() {
    if (tmdbPromise) {
        return await tmdbPromise;
    }
    tmdbPromise = tmdbItem();
    return await tmdbPromise;
}

;// CONCATENATED MODULE: ./src/helpers/tierSort.ts
function tierSort(sortees, tiers, manualScore) {
    const out = [...sortees];
    out.sort((a, b) => {
        let s = 0;
        for (const fn of tiers) {
            if (s !== 0) {
                break;
            }
            if (fn(a)) {
                s -= 1;
            }
            if (fn(b)) {
                s += 1;
            }
        }
        if (manualScore) {
            s += manualScore(a, b);
        }
        return s;
    });
    return out;
}

;// CONCATENATED MODULE: ./src/providers/TmdbProvider.ts









var TmdbMediaType;
(function (TmdbMediaType) {
    TmdbMediaType["Movie"] = "movie";
    TmdbMediaType["Tv"] = "tv";
})(TmdbMediaType || (TmdbMediaType = {}));
class TmdbProvider extends MetadataProvider {
    static reduceNameQuery(name) {
        // Try again with less parts (can help with named seasons etc...)
        const reducedName = name
            .split(/[:\|\-–\/]/)
            .slice(0, -1)
            .join(" ")
            .replace(/\s+/, " ")
            .trim();
        // realistically reducedName is never going to be the same as name
        // but I don't know if there is some edge case I missed (shouldn't be)
        // can probably be proven with graph theory or something
        // but it doesn't harm to check to avoid loops
        // I am just that scared of looping hehehe
        // although it should be cached anyways so at least we wouldn't be spamming tmdb
        // would just end up erroring with a stack overflow
        // alright I am done overthinking this
        if (!reducedName || reducedName === name) {
            return false;
        }
        return reducedName;
    }
    static async identify(type, name) {
        const key = `tmdb_${type}_by_name_${name}`;
        const cached = checkCache(key, 1000 * 60 * 60 * 24 * 3); // 3 days
        // Try reduced query (will probably also be cached)
        if (cached === false) {
            const reducedName = this.reduceNameQuery(name);
            if (reducedName) {
                log(`trying reduced query ${reducedName}`);
                return await this.identify(type, reducedName);
            }
            return false;
        }
        // Return cached result
        if (cached !== undefined) {
            // return cached as TmdbIdentified;
        }
        // No cached result, try to identify
        const url = new URL(`https://api.themoviedb.org/3/search/${type}`);
        url.searchParams.set("api_key", "REDACTED");
        url.searchParams.set("include_adult", "true");
        url.searchParams.set("language", TMDB_LANGUAGE);
        url.searchParams.set("query", name);
        log(`fetching ${url.toString()}`);
        url.searchParams.set("api_key", this.getUserApiKey("TMDB", TMDB_DEFAULT_API_KEY));
        const res = await gmFetchJson({
            method: "GET",
            url: url.toString(),
        });
        if (typeof res.total_results !== "number") {
            throw new Error("invalid response from tmdb");
        }
        if (res.total_results < 1) {
            saveCache(key, false);
            const reducedName = this.reduceNameQuery(name);
            if (reducedName) {
                return await this.identify(type, reducedName);
            }
            return false;
        }
        // try to find the first match with animation genre (16) first
        const entry = tierSort(res.results, [
            (e) => e.genre_ids.includes(16),
            (e) => e.original_language === "ja",
            (e) => e.name.toLowerCase() === name.toLowerCase(),
        ])[0];
        if (!entry || typeof entry.id !== "number") {
            throw new Error("invalid response from tmdb");
        }
        const out = {
            mediaType: type,
            id: entry.id,
        };
        saveCache(key, out);
        return out;
    }
    // both identify and fetch are needed since tmdb search
    // doesn't return videos or external ids
    // will probably come in handy anyways if we want to
    // add some sort of match fixing for tmdb
    static async fetchItem(identified) {
        const { mediaType, id } = identified;
        const key = `tmdb_item_${mediaType}_${id}`;
        const cached = checkCache(key, 1000 * 60 * 60 * 24 * 3); // 3 days
        if (cached !== undefined) {
            return cached;
        }
        const url = new URL(`https://api.themoviedb.org/3/${mediaType}/${id}`);
        url.searchParams.set("api_key", "REDACTED");
        url.searchParams.set("language", TMDB_LANGUAGE);
        url.searchParams.set("append_to_response", "external_ids,videos");
        log(`fetching ${url.toString()}`);
        url.searchParams.set("api_key", this.getUserApiKey("TMDB", TMDB_DEFAULT_API_KEY));
        const res = await gmFetchJson({
            method: "GET",
            url: url.toString(),
        });
        if (res.id !== id ||
            !Array.isArray(res.videos?.results) ||
            !res.external_ids) {
            logError("invalid response from tmdb", res);
            throw new Error("invalid response from tmdb");
        }
        const out = {
            mediaType,
            id,
            rating: res.vote_average,
            votes: res.vote_count,
            externalIds: res.external_ids,
            videos: res.videos.results,
        };
        saveCache(key, out);
        return out;
    }
    name = "TMDB";
    apiKeyInstructionsLink = "https://developers.themoviedb.org/3/getting-started/introduction";
    apiKeyName = "API Key (v3 auth)";
    defaultApiKey = TMDB_DEFAULT_API_KEY;
    flags = new Set([
        ProviderFlags.Score,
        ProviderFlags.Trailers,
        ProviderFlags.Link,
        ProviderFlags.ApiKey,
    ]);
    item;
    async init() {
        const res = await ensureTmdbItem();
        if (!res) {
            return false;
        }
        this.item = res;
        return true;
    }
    async getLink() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return false;
        }
        return {
            name: "TMDB",
            url: `https://www.themoviedb.org/${this.item.mediaType}/${this.item.id}`,
        };
    }
    async getTrailers() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return [];
        }
        const trailers = [];
        const teasers = [];
        this.item.videos.forEach((v) => {
            if (v.type === "Teaser") {
                teasers.push({
                    site: v.site,
                    key: v.key,
                    name: `[Teaser] ${v.name}`,
                });
            }
            else if (v.type === "Trailer") {
                trailers.push({
                    site: v.site,
                    key: v.key,
                    name: v.name,
                });
            }
        });
        const final = [...trailers, ...teasers];
        return final;
    }
    async getScore() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return false;
        }
        const { rating, votes } = this.item;
        return { rating, votes };
    }
    scoreColors(rating) {
        if (rating === 0) {
            return {
                trackColor: "#666666",
                barColor: "#d4d4d4",
            };
        }
        if (rating < 4) {
            return {
                trackColor: "#571435",
                barColor: "#db2360",
            };
        }
        if (rating < 7) {
            return {
                trackColor: "#423d0f",
                barColor: "#d2d531",
            };
        }
        return {
            trackColor: "#204529",
            barColor: "#21d07a",
        };
    }
    insertScore(parent, score) {
        const { rating, votes } = score;
        const { trackColor, barColor } = this.scoreColors(rating);
        const { container, scale } = ratingBox("TMDB Score", `${displayVotes(votes)} votes`, `https://www.themoviedb.org/${this.item.mediaType}/${this.item.id}`);
        scale.append(`<div
                  style="
                      display: inline-block;
                      width: 60px;
                      height: 60px;
                      border-radius: 50%;
                      background-color: #081c22;
                      padding: 3px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                  "
              >
                  <div
                      class="${UNIQUE}-user_score_chart"
                      data-percent="${rating * 10}"
                      data-track-color="${trackColor}"
                      data-bar-color="${barColor}"
                      style="
                          position: relative;
                          display: inline-block;
                          width: 54px;
                          height: 54px;
                          text-align: center;
                      "
                  >
                      <div
                          style="
                              width: 100%;
                              height: 100%;
                              z-index: 2;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                          "
                      >
                          <span
                              class="${UNIQUE}-icon-r${rating > 0 ? Math.round(rating * 10) : "NR"}"
                              style="
                                  color: #fff;
                                  font-size: 15px;
                                  font-family: Consensus !important;
                                  speak: none;
                                  font-style: normal;
                                  font-weight: 400;
                                  font-variant: normal;
                                  text-transform: none;
                                  line-height: 1;
                                  -webkit-font-smoothing: antialiased;
                                  -moz-osx-font-smoothing: grayscale;
                              "
                          ></span>
                      </div>
                  </div>
              </div>
          </div>`);
        parent.append(container);
        // @ts-expect-error
        $(`.${UNIQUE}-user_score_chart`).easyPieChart({
            lineCap: "round",
            lineWidth: 4,
            scaleColor: false,
            size: 54,
            animate: {
                enabled: false,
            },
        });
    }
    async testApiKey() {
        const key = this.getUserApiKey();
        if (!key) {
            throw new Error("No API key set, please set one in the script settings");
        }
        const url = new URL(`https://api.themoviedb.org/3/configuration`);
        url.searchParams.set("api_key", "REDACTED");
        log(`testing against ${url.toString()}`);
        url.searchParams.set("api_key", key);
        const res = await gmFetchJson({
            method: "GET",
            url: url.toString(),
        });
        if (res.success === false && res.status_message) {
            log("api key test failed", res);
            throw new Error(res.status_message);
        }
        if (res.images?.secure_base_url !== "https://image.tmdb.org/t/p/") {
            logError("api key test failed", res);
            throw new Error("Invalid response from TMDB");
        }
        return true;
    }
}

;// CONCATENATED MODULE: ./src/dom/tmdbQueryFromPage.ts

const SEASON_PART_REGEX = /(Season|Part) \d+/gim;
const preprocessors = [
    // Remove season/part number
    (title) => title.replace(SEASON_PART_REGEX, ""),
    // Trim
    (title) => title.trim(),
    // Lowercase (so cache hits in case of different casing)
    (title) => title.toLowerCase(),
];
function tmdbQueryFromPage(process = true) {
    const s = $("#content > div.thin > h2:first-child").text().split(" - ");
    const post = s.pop();
    const type = post.startsWith("TV Series") || post.startsWith("ONA")
        ? TmdbMediaType.Tv
        : post.startsWith("Movie")
            ? TmdbMediaType.Movie
            : false;
    if (!type) {
        return false;
    }
    const name = s.join(" - ");
    return {
        type,
        name: process ? preprocessors.reduce((acc, fn) => fn(acc), name) : name,
    };
}

;// CONCATENATED MODULE: ./src/helpers/trailerTitleFilters.ts
function dubbedInTitle(title) {
    return /\bdub(bed)?\b/i.test(title);
}
// It's really no harm if this false postives
// Since it's only used for sorting purposes
function subbedInTitle(title) {
    return (title.toLowerCase().includes("sub") || title.toLowerCase().includes("eng"));
}
function promotionalVideo(title) {
    return title.toLowerCase().includes("promotional video");
}
function commercial(title) {
    return title.toLowerCase().includes("commercial");
}
function teaser(title) {
    return title.toLowerCase().includes("teaser");
}
function announcement(title) {
    return title.toLowerCase().includes("announcement");
}

;// CONCATENATED MODULE: ./src/helpers/sortTrailers.ts




function isDubbed(trailer) {
    return (dubbedInTitle(trailer.name) ||
        (trailer.info &&
            // if it has auto generated English subtitles,
            // it means it probably has english audio
            !!trailer.info.captions.find((c) => c.languageCode === "en" && c.kind === "asr")));
}
// if it's a season or part, we should prefer trailers from MAL
// since they will be specific to the season/part
// unlike tmdb which will have trailers for the whole series
const res = tmdbQueryFromPage(false);
const preferMal = res
    ? SEASON_PART_REGEX.test(res.name) || res.name.includes(":")
    : false;
const PREFERRED_CHANNELS = [
    "UC6pGDc4bFGD1_36IKv3FnYg",
    "UCRuJMENPfFiMYoqCXleDLLQ",
    "UCWOA1ZGywLbqmigxE4Qlvuw", // Netflix
];
// Tiers of preference
const tiers = [
    // Prefer MAL
    (trailer) => preferMal && trailer.provider.name === "MAL",
    // Dubs
    (t) => {
        if (settings.preferredTrailerAudioLanguage === "any") {
            return false;
        }
        const preferDubbed = settings.preferredTrailerAudioLanguage === "dubbed";
        return preferDubbed ? isDubbed(t) : !isDubbed(t);
    },
    // Preferred channels that are (I think) always subbed
    (t) => t.info && PREFERRED_CHANNELS.includes(t.info.channelId),
    // Try to prefer subs over raw
    (t) => subbedInTitle(t.name) ||
        (t.info &&
            !!t.info.captions.find((c) => c.languageCode === "en" && c.kind !== "asr")),
    // "Regular" trailers
    (t) => !teaser(t.name) &&
        !commercial(t.name) &&
        !promotionalVideo(t.name) &&
        !announcement(t.name),
    // Promotional Videos
    (t) => promotionalVideo(t.name),
    // Teasers
    (t) => teaser(t.name),
    // Commercials and announcements
    (t) => commercial(t.name) || announcement(t.name),
];
function sortTrailers(tr) {
    return tierSort(tr, tiers, (a, b) => {
        // Default compare as last resort to order numbered trailers
        if (a.name < b.name) {
            return -0.1;
        }
        if (a.name > b.name) {
            return 0.1;
        }
        return 0;
    });
}

;// CONCATENATED MODULE: ./src/dom/injectTrailersToPage.ts








async function injectTrailersToPage(tr) {
    if (tr.length === 0) {
        return;
    }
    // dedupe trailers
    const map = {};
    tr.forEach((trailer) => {
        const { site, key } = trailer;
        const id = `${site}:${key}`;
        if (!map[id]) {
            map[id] = trailer;
        }
    });
    // Fetch youtube video info
    let trailers = [];
    let unplayableCount = 0;
    (await Promise.allSettled(Object.values(map).map(async (trailer) => {
        if (trailer.site !== VideoSite.YouTube) {
            return trailer;
        }
        try {
            const info = await fetchYoutubeVideoInfo(trailer.key);
            return {
                ...trailer,
                name: info.playable
                    ? trailer.name
                    : `*UNPLAYABLE* ${trailer.name}`,
                info,
            };
        }
        catch (err) {
            uiShowError(`*Not* Fatal - Failed to fetch youtube data for trailer: <i>${trailer.name}</i>`, `The trailer will still be displayed,
but smart trailer sorting might not work as expected.
Auto detecting youtube region limits will also not work for this trailer,
so it might not be playable.`, err);
            logError("Failed to fetch youtube video info -", trailer.key, err);
            return trailer;
        }
    }))).forEach((promise) => {
        if (promise.status === "rejected") {
            return;
        }
        const trailer = promise.value;
        if (trailer.info && !trailer.info.playable) {
            log("Unplayable trailer", trailer);
            unplayableCount++;
            return;
        }
        trailers.push(trailer);
    });
    trailers = sortTrailers(trailers);
    // General layout
    const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
        .parent()
        .parent();
    const { container, body, head, setError, resetError } = pageSection("Trailer");
    if (settings.trailerAfterSynopsis) {
        container.insertAfter(synopsis);
    }
    else {
        container.insertBefore(synopsis);
    }
    // Load trailer to page
    let iframe;
    const selectTrailer = (i) => {
        resetError();
        if (iframe) {
            $(iframe).remove();
        }
        const trailer = trailers[i];
        let src;
        switch (trailer.site) {
            case VideoSite.YouTube:
                src = `https://www.youtube-nocookie.com/embed/${trailer.key}?VQ=HD1080&rel=0&loop=1`;
                break;
            case VideoSite.Vimeo:
                src = `https://player.vimeo.com/video/${trailer.key}`;
                break;
            default:
                setError(`Unsupported trailer site: ${trailer.site}. Please report to TalkingJello with the link to the torrent group`);
        }
        iframe = GM_addElement(body.get(0), "iframe", {
            src,
            width: "693",
            height: "390",
            allowFullscreen: "",
            allow: "fullscreen;",
        });
        iframe.style.border = "none";
    };
    if (trailers.length > 1) {
        // trailers selection
        const select = $(`<select name="trailers" id="${UNIQUE}-trailer-selection" style="margin-left: 10px; padding: 2px;max-width: 90%;"></select>`);
        trailers.forEach((t, i) => {
            const opt = $(`<option value="${i}"></option>`);
            opt.text(t.name);
            select.append(opt);
        });
        select.change(() => {
            selectTrailer(parseInt(select.val()));
        });
        head.append(select);
    }
    if (unplayableCount > 0) {
        log(unplayableCount, "unplayable trailers found");
    }
    // select first on load
    if (trailers.length > 0) {
        selectTrailer(0);
    }
}

;// CONCATENATED MODULE: ./src/dom/placeSynopsis.ts

function placeSynopsis() {
    if (!settings.itemsOnTop) {
        return;
    }
    const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
        .parent()
        .parent();
    synopsis.detach();
    $("#content > div.thin > div.main_column").prepend(synopsis);
}

;// CONCATENATED MODULE: ./src/dom/idsFromPage.ts
const links = $("#content > div.thin > h3");
function aniDbIdFromPage() {
    const found = links.find('a[href^="https://anidb.net/anime/"]');
    if (found.length !== 1) {
        return false;
    }
    return found.attr("href").split("/").pop();
}
function malIdFromPage() {
    const found = links.find('a[href^="https://myanimelist.net/anime/"]');
    if (found.length !== 1) {
        return false;
    }
    return found.attr("href").match(/\/anime\/(\d+)/)?.[1] ?? false;
}

;// CONCATENATED MODULE: ./src/helpers/throttle.ts

function throttle(key, ms) {
    return new Promise((resolve) => {
        const lastUsage = GM_getValue(`throttle_${key}`, 0);
        const now = Date.now();
        if (typeof lastUsage !== "number" || now > lastUsage + ms) {
            GM_setValue(`throttle_${key}`, now);
            resolve();
            return;
        }
        log(`Throttling ${key}, time to wait: ${lastUsage + ms - now}ms`);
        setTimeout(() => {
            resolve(throttle(key, ms));
        }, lastUsage + ms - now);
    });
}
function setThrottleUse(key) {
    GM_setValue(`throttle_${key}`, Date.now());
}

;// CONCATENATED MODULE: ./src/providers/AniDbProvider.ts








class AniDbProvider extends MetadataProvider {
    name = "AniDB";
    flags = new Set([ProviderFlags.Score]);
    aniDbId;
    async init() {
        const res = aniDbIdFromPage();
        if (!res) {
            return false;
        }
        this.aniDbId = res;
        return true;
    }
    async getScore() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return false;
        }
        const key = `anidb_score_${this.aniDbId}`;
        const cached = checkCache(key, 1000 * 60 * 60 * 24 * 3); // 3 days
        if (cached !== undefined) {
            return cached;
        }
        await throttle("anidb", 1000 * 3);
        const url = new URL("http://api.anidb.net:9001/httpapi");
        url.searchParams.set("request", "anime");
        url.searchParams.set("client", ANIDB_CLIENT_NAME);
        url.searchParams.set("clientver", ANIDB_CLIENT_VERSION);
        url.searchParams.set("protover", "1");
        url.searchParams.set("aid", this.aniDbId);
        log(`fetching ${url.toString()}`);
        const res = await gmFetch({
            method: "GET",
            url: url.toString(),
        });
        setThrottleUse("anidb");
        try {
            const parser = new DOMParser();
            const d = parser.parseFromString(res.responseText, "text/xml");
            const rating = d
                .getElementsByTagName("ratings")[0]
                .getElementsByTagName("permanent")[0];
            const out = {
                rating: parseFloat(rating.innerHTML),
                votes: parseInt(rating.getAttribute("count")),
                breakdownLink: `https://anidb.net/anime/${this.aniDbId}/vote/statistic`,
            };
            saveCache(key, out);
            return out;
        }
        catch (e) {
            throw new Error("Invalid AniDB response - " + e.message);
        }
    }
    insertScore(parent, score) {
        const { container } = ratingBoxFromScore(score, "https://mei.animebytes.tv/qN7pRFMzaEs.png", 68);
        parent.append(container);
    }
}

;// CONCATENATED MODULE: ./src/providers/ImdbProvider.ts






// @TODO: trailers?
class ImdbProvider extends MetadataProvider {
    name = "IMDb";
    flags = new Set([ProviderFlags.Link, ProviderFlags.Score]);
    imdbId = false;
    json;
    async ensureImdbId() {
        const res = await ensureTmdbItem();
        if (!res ||
            typeof res.externalIds.imdb_id !== "string" ||
            !res.externalIds.imdb_id.startsWith("tt")) {
            return false;
        }
        this.imdbId = res.externalIds.imdb_id;
        return true;
    }
    async init() {
        const ok = await this.ensureImdbId();
        if (!ok) {
            return false;
        }
        const url = `https://www.imdb.com/title/${this.imdbId}/`;
        const key = `imdb_scrape_json_${this.imdbId}`;
        const cached = checkCache(key, 60 * 60 * 24 * 7); // 1 week
        if (cached !== undefined &&
            typeof cached.url === "string" &&
            url.endsWith(cached.url)) {
            this.json = cached;
            return true;
        }
        log(`Scraping ${url}`);
        const res = await gmFetch({
            method: "GET",
            url,
        });
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(res.responseText, "text/html");
            const data = doc.querySelector('script[type="application/ld+json"]');
            if (!data) {
                throw new Error("Data json not found on page");
            }
            const json = JSON.parse(data.textContent);
            if (typeof json.url !== "string" || !url.endsWith(json.url)) {
                logError("IMDB JSON", json);
                throw new Error(`Invalid json from imdb. Expected ${url} got ${json.url}`);
            }
            this.json = json;
            saveCache(key, json);
            return true;
        }
        catch (err) {
            logError("Failed to parse IMDB page: ", err);
            throw new Error(`failed to parse imdb page: ${err.message}`);
        }
    }
    async getLink() {
        const ok = await this.ensureImdbId();
        if (!ok) {
            return false;
        }
        return {
            name: "IMDb",
            url: `https://www.imdb.com/title/${this.imdbId}`,
        };
    }
    async getScore() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return false;
        }
        const rating = this.json.aggregateRating;
        if (!rating ||
            typeof rating.ratingValue !== "number" ||
            typeof rating.ratingCount !== "number") {
            logError("Invalid rating from IMDB", rating);
            deleteCache(`imdb_scrape_json_${this.imdbId}`);
            throw new Error("Invalid rating response from IMDB");
        }
        return {
            rating: rating.ratingValue,
            votes: rating.ratingCount,
            breakdownLink: `https://www.imdb.com/title/${this.imdbId}/ratings/`,
        };
    }
    insertScore(parent, score) {
        const { container } = ratingBoxFromScore(score, "https://mei.animebytes.tv/gtY9cKsJV77.png", 52);
        parent.append(container);
    }
}

;// CONCATENATED MODULE: ./src/providers/MalJikanProvider.ts







class MalJikanProvider extends MetadataProvider {
    name = "MAL";
    flags = new Set([ProviderFlags.Score, ProviderFlags.Trailers]);
    malId;
    async init() {
        const id = malIdFromPage();
        if (!id) {
            return false;
        }
        this.malId = id;
        return true;
    }
    async fetchJikans(url) {
        log(`Fetching ${url}`);
        const res = await gmFetchJson({
            method: "GET",
            url: url,
        });
        if (res.error) {
            logError("mal res", res);
            throw new Error(`Failed to fetch Jikan (MAL) - ${res.message} - ${res.error}`);
        }
        if (!res.data) {
            logError("mal res", res);
            throw new Error("Invalid response from Jikan (MAL)");
        }
        return res.data;
    }
    async getScore() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return false;
        }
        const key = `mal_jikan_score_${this.malId}`;
        const cached = checkCache(key, 1000 * 60 * 60 * 24 * 2); // 2 days
        if (cached === false) {
            return false;
        }
        if (cached && typeof cached.votes === "number") {
            return cached;
        }
        await throttle("jikan", 800);
        const data = await this.fetchJikans(`https://api.jikan.moe/v4/anime/${this.malId}`);
        setThrottleUse("jikan");
        if (typeof data.score !== "number" || typeof data.scored_by !== "number") {
            saveCache(key, false);
            return false;
        }
        const score = {
            votes: data.scored_by,
            rating: data.score,
            rank: data.rank,
            breakdownLink: `${data.url}/stats`,
        };
        saveCache(key, score);
        return score;
    }
    async getTrailers() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return [];
        }
        const key = `mal_jikan_trailers_${this.malId}`;
        const cached = checkCache(key);
        if (Array.isArray(cached)) {
            return cached;
        }
        const data = await this.fetchJikans(`https://api.jikan.moe/v4/anime/${this.malId}/videos`);
        if (!Array.isArray(data.promo)) {
            logError("jikans data", data);
            throw new Error("Invalid response from Jikan (MAL)");
        }
        const trailers = [];
        data.promo.forEach((item) => {
            if (!item.trailer || !item.trailer.youtube_id) {
                return;
            }
            trailers.push({
                name: item.title
                    .replace(/PV/gi, "Promotional Video")
                    .replace(/CM/gi, "Commercial"),
                site: VideoSite.YouTube,
                key: item.trailer.youtube_id,
            });
        });
        saveCache(key, trailers);
        return trailers;
    }
    insertScore(parent, score) {
        const { container, image } = ratingBoxFromScore(score, "https://mei.animebytes.tv/ssTMPRvxBSo.png", 54);
        image.css("border-radius", "12px");
        parent.append(container);
    }
}

;// CONCATENATED MODULE: ./src/providers/TvdbProvider.ts


// @TODO: rating? trailers?
class TvdbProvider extends MetadataProvider {
    name = "tvdb";
    flags = new Set([ProviderFlags.Link]);
    tvdbId = false;
    async init() {
        const res = await ensureTmdbItem();
        if (!res || typeof res.externalIds.tvdb_id !== "number") {
            return false;
        }
        this.tvdbId = res.externalIds.tvdb_id;
        return true;
    }
    async getLink() {
        const ok = await this.ensureInitialized();
        if (!ok) {
            return false;
        }
        return {
            name: "tvdb",
            url: `https://www.thetvdb.com/?tab=series&id=${this.tvdbId}`,
        };
    }
}

;// CONCATENATED MODULE: ./src/style/consensus.ts
/* harmony default export */ const consensus = (`@font-face {
    font-family: "Roboto Mono";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("https://www.themoviedb.org/assets/2/roboto-mono-v12-vietnamese_latin-ext_latin_greek_cyrillic-ext_cyrillic-regular-0735372f56f4589605c7513431f4970be66099254878de7c38b61cb91aa8bd5e.woff2")
            format("woff2"),
        url("https://www.themoviedb.org/assets/2/roboto-mono-v12-vietnamese_latin-ext_latin_greek_cyrillic-ext_cyrillic-regular-0bdd8d4009a28ef64ef1c3993c267e4f39e3ce33805aa394a60b73fef9fd2712.woff")
            format("woff");
}

@font-face {
    font-family: "Consensus";
    src: url("https://www.themoviedb.org/assets/2/Consensus-3cba2c4d050ea63dbf7783173d288faf9ecb2942515a5e7f6e1beecabb2eaf72.woff2")
            format("woff2"),
        url("https://www.themoviedb.org/assets/2/Consensus-c65c9c0e1b81777c3f338b194fd293c722e0d1fe6c18231932f1fc59b7679f64.woff")
            format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

[class^="abtexr-icon-"],
[class*=" abtexr-icon-"] {
    font-family: "Consensus" !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.abtexr-icon-r0:before {
    padding-left: 4px;
    content: "\\e900";
}

.abtexr-icon-r1:before {
    content: "\\e901";
}

.abtexr-icon-r2:before {
    content: "\\e902";
}

.abtexr-icon-r3:before {
    content: "\\e903";
}

.abtexr-icon-r4:before {
    content: "\\e904";
}

.abtexr-icon-r5:before {
    content: "\\e905";
}

.abtexr-icon-r6:before {
    content: "\\e906";
}

.abtexr-icon-r7:before {
    content: "\\e907";
}

.abtexr-icon-r8:before {
    content: "\\e908";
}

.abtexr-icon-r9:before {
    content: "\\e909";
}

.abtexr-icon-r10:before {
    content: "\\e90a";
}

.abtexr-icon-r11:before {
    content: "\\e90b";
}

.abtexr-icon-r12:before {
    content: "\\e90c";
}

.abtexr-icon-r13:before {
    content: "\\e90d";
}

.abtexr-icon-r14:before {
    content: "\\e90e";
}

.abtexr-icon-r15:before {
    content: "\\e90f";
}

.abtexr-icon-r16:before {
    content: "\\e910";
}

.abtexr-icon-r17:before {
    content: "\\e911";
}

.abtexr-icon-r18:before {
    content: "\\e912";
}

.abtexr-icon-r19:before {
    content: "\\e913";
}

.abtexr-icon-r20:before {
    content: "\\e914";
}

.abtexr-icon-r21:before {
    content: "\\e915";
}

.abtexr-icon-r22:before {
    content: "\\e916";
}

.abtexr-icon-r23:before {
    content: "\\e917";
}

.abtexr-icon-r24:before {
    content: "\\e918";
}

.abtexr-icon-r25:before {
    content: "\\e919";
}

.abtexr-icon-r26:before {
    content: "\\e91a";
}

.abtexr-icon-r27:before {
    content: "\\e91b";
}

.abtexr-icon-r28:before {
    content: "\\e91c";
}

.abtexr-icon-r29:before {
    content: "\\e91d";
}

.abtexr-icon-r30:before {
    content: "\\e91e";
}

.abtexr-icon-r31:before {
    content: "\\e91f";
}

.abtexr-icon-r32:before {
    content: "\\e920";
}

.abtexr-icon-r33:before {
    content: "\\e921";
}

.abtexr-icon-r34:before {
    content: "\\e922";
}

.abtexr-icon-r35:before {
    content: "\\e923";
}

.abtexr-icon-r36:before {
    content: "\\e924";
}

.abtexr-icon-r37:before {
    content: "\\e925";
}

.abtexr-icon-r38:before {
    content: "\\e926";
}

.abtexr-icon-r39:before {
    content: "\\e927";
}

.abtexr-icon-r40:before {
    content: "\\e928";
}

.abtexr-icon-r41:before {
    content: "\\e929";
}

.abtexr-icon-r42:before {
    content: "\\e92a";
}

.abtexr-icon-r43:before {
    content: "\\e92b";
}

.abtexr-icon-r44:before {
    content: "\\e92c";
}

.abtexr-icon-r45:before {
    content: "\\e92d";
}

.abtexr-icon-r46:before {
    content: "\\e92e";
}

.abtexr-icon-r47:before {
    content: "\\e92f";
}

.abtexr-icon-r48:before {
    content: "\\e930";
}

.abtexr-icon-r49:before {
    content: "\\e931";
}

.abtexr-icon-r50:before {
    content: "\\e932";
}

.abtexr-icon-r51:before {
    content: "\\e933";
}

.abtexr-icon-r52:before {
    content: "\\e934";
}

.abtexr-icon-r53:before {
    content: "\\e935";
}

.abtexr-icon-r54:before {
    content: "\\e936";
}

.abtexr-icon-r55:before {
    content: "\\e937";
}

.abtexr-icon-r56:before {
    content: "\\e938";
}

.abtexr-icon-r57:before {
    content: "\\e939";
}

.abtexr-icon-r58:before {
    content: "\\e93a";
}

.abtexr-icon-r59:before {
    content: "\\e93b";
}

.abtexr-icon-r60:before {
    content: "\\e93c";
}

.abtexr-icon-r61:before {
    content: "\\e93d";
}

.abtexr-icon-r62:before {
    content: "\\e93e";
}

.abtexr-icon-r63:before {
    content: "\\e93f";
}

.abtexr-icon-r64:before {
    content: "\\e940";
}

.abtexr-icon-r65:before {
    content: "\\e941";
}

.abtexr-icon-r66:before {
    content: "\\e942";
}

.abtexr-icon-r67:before {
    content: "\\e943";
}

.abtexr-icon-r68:before {
    content: "\\e944";
}

.abtexr-icon-r69:before {
    content: "\\e945";
}

.abtexr-icon-r70:before {
    content: "\\e946";
}

.abtexr-icon-r71:before {
    content: "\\e947";
}

.abtexr-icon-r72:before {
    content: "\\e948";
}

.abtexr-icon-r73:before {
    content: "\\e949";
}

.abtexr-icon-r74:before {
    content: "\\e94a";
}

.abtexr-icon-r75:before {
    content: "\\e94b";
}

.abtexr-icon-r76:before {
    content: "\\e94c";
}

.abtexr-icon-r77:before {
    content: "\\e94d";
}

.abtexr-icon-r78:before {
    content: "\\e94e";
}

.abtexr-icon-r79:before {
    content: "\\e94f";
}

.abtexr-icon-r80:before {
    content: "\\e950";
}

.abtexr-icon-r81:before {
    content: "\\e951";
}

.abtexr-icon-r82:before {
    content: "\\e952";
}

.abtexr-icon-r83:before {
    content: "\\e953";
}

.abtexr-icon-r84:before {
    content: "\\e954";
}

.abtexr-icon-r85:before {
    content: "\\e955";
}

.abtexr-icon-r86:before {
    content: "\\e956";
}

.abtexr-icon-r87:before {
    content: "\\e957";
}

.abtexr-icon-r88:before {
    content: "\\e958";
}

.abtexr-icon-r89:before {
    content: "\\e959";
}

.abtexr-icon-r90:before {
    content: "\\e95a";
}

.abtexr-icon-r91:before {
    content: "\\e95b";
}

.abtexr-icon-r92:before {
    content: "\\e95c";
}

.abtexr-icon-r93:before {
    content: "\\e95d";
}

.abtexr-icon-r94:before {
    content: "\\e95e";
}

.abtexr-icon-r95:before {
    content: "\\e95f";
}

.abtexr-icon-r96:before {
    content: "\\e960";
}

.abtexr-icon-r97:before {
    content: "\\e961";
}

.abtexr-icon-r98:before {
    content: "\\e962";
}

.abtexr-icon-r99:before {
    content: "\\e963";
}

.abtexr-icon-r100:before {
    content: "\\e964";
}

.abtexr-icon-rNR:before {
    content: "\\e965";
}

.abtexr-user_score_chart canvas {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
}`);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less
var main = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less");
;// CONCATENATED MODULE: ./src/style/main.less

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(main/* default */.Z, options);




       /* harmony default export */ const style_main = (main/* default */.Z && main/* default.locals */.Z.locals ? main/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/index.ts
















async function src_main() {
    // General
    GM_addStyle(consensus);
    placeSynopsis();
    // Providers
    const providers = [
        new TmdbProvider(),
        // new MalProvider(),
        new MalJikanProvider(),
        new ImdbProvider(),
        new TvdbProvider(),
        new AniDbProvider(),
    ];
    insertDeliciousSettingsUi(providers);
    // Inject to dom
    const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
        .parent()
        .parent();
    synopsis.before(errorsSection.container);
    injectLinksToPage(providers.filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Link)));
    injectRatingsToPage(providers.filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Score)));
    const trailers = [];
    const res = await Promise.allSettled(providers
        .filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Trailers))
        .map(async (p) => {
        try {
            return [p, await p.getTrailers()];
        }
        catch (err) {
            uiShowError(`Failed to fetch trailers from ${p.name}`, internetOrWebsiteDownErrorTitle(p.name), err);
            throw err;
        }
    }));
    res.forEach((r) => {
        if (r.status === "rejected") {
            logError(r.reason);
            return;
        }
        const [provider, providerTrailers] = r.value;
        providerTrailers.forEach((t) => {
            trailers.push({
                provider,
                ...t,
            });
        });
    });
    injectTrailersToPage(trailers);
}
src_main().catch((e) => {
    console.log(e);
});

})();

/******/ })()
;