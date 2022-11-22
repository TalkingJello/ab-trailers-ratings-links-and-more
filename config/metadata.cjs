const { author, repository, version, description } = require("../package.json");

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
  connect: ["api.themoviedb.org", "api.anidb.net"],
};
