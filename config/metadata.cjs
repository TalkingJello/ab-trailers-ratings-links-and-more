const { author, repository, version, description } = require("../package.json");

const easyPieChart =
  "https://raw.githubusercontent.com/rendro/easy-pie-chart/97b5824bf423410c3c6a1e971860159f17ee6ee6/dist/jquery.easypiechart.min.js";

const ab = {
  name: "AB - Trailers, Ratings, Links (and more?)",
  description:
    "Adds trailers, additional ratings, links (and more?) to AB anime pages",
  icon: "http://animebytes.tv/favicon.ico",
  match: [
    "*://animebytes.tv/torrents.php?*",
    "*://animebytes.tv/user.php?action=edit*",
  ],
  require: [
    "https://raw.githubusercontent.com/momentary0/AB-Userscripts/b1e7aac27e1f49391147cf068326f278bb40e20d/delicious-library/src/ab_delicious_library.js",
    easyPieChart,
  ],
};

const moe = {
  name: "Moe - Trailers, Ratings, Links (and more?)",
  description:
    "Adds trailers, additional ratings, links (and more?) to MOE anime pages",
  icon: "https://nzbs.moe/static/img/favicon.svg",
  match: ["*://nzbs.moe/series/*", "*://nzbs.moe/settings*"],
  require: [
    "https://code.jquery.com/jquery-3.7.1.min.js",
    "https://github.com/TalkingJello/moe-delicious-library/raw/refs/heads/main/moe_delicious_library.js",
    easyPieChart,
  ],
};

let target = "ab";
if (typeof process !== "undefined" && process.env.SITE_TARGET) {
  target = process.env.SITE_TARGET;
} else if (typeof SITE_TARGET !== "undefined") {
  target = SITE_TARGET;
}

const siteSpecificConfig = target === "moe" ? moe : ab;

module.exports = {
  ...siteSpecificConfig,
  namespace: "TalkingJello@animebytes.tv",
  version,
  author,
  source: repository.url,
  description,
  license: "MIT",
  grant: [
    "GM_addElement",
    "GM_addStyle",
    "GM_xmlhttpRequest",
    "GM_listValues",
    "GM_deleteValue",
    "GM_setValue",
    "GM_getValue",
    "GM_getResourceURL",
  ],
  connect: [
    "api.themoviedb.org",
    "api.anidb.net",
    "api.jikan.moe",
    "www.imdb.com",
    "youtubei.googleapis.com",
  ],
  resource: [
    "robotomono2 https://www.themoviedb.org/assets/2/roboto-mono-v12-vietnamese_latin-ext_latin_greek_cyrillic-ext_cyrillic-regular-0735372f56f4589605c7513431f4970be66099254878de7c38b61cb91aa8bd5e.woff2",
    "robotomono https://www.themoviedb.org/assets/2/roboto-mono-v12-vietnamese_latin-ext_latin_greek_cyrillic-ext_cyrillic-regular-0bdd8d4009a28ef64ef1c3993c267e4f39e3ce33805aa394a60b73fef9fd2712.woff",
    "consensus2 https://www.themoviedb.org/assets/2/Consensus-3cba2c4d050ea63dbf7783173d288faf9ecb2942515a5e7f6e1beecabb2eaf72.woff2",
    "consensus https://www.themoviedb.org/assets/2/Consensus-c65c9c0e1b81777c3f338b194fd293c722e0d1fe6c18231932f1fc59b7679f64.woff",
  ],
};
