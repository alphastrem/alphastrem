var Stremio = require("stremio-addons");

process.env.STREMIO_LOGGING = true; // enable server logging for development purposes

var manifest = { 
    // See https://github.com/Stremio/stremio-addons/blob/master/docs/api/manifest.md for full explanation
    "id": "org.stremio.helloworld",
    "version": "1.0.0",

    "name": "Lee's bitchin addon",
    "description": "this is my description",
    "icon": "http://cdnak1.psbin.com/logos/id/d370u26yxp4l0n55.png", 
    "background": "https://ipbzz73v1i-flywheel.netdna-ssl.com/wp-content/uploads//2015/05/cq5dam.web_.1280.1280-3-5557b78cacbb3.jpeg",

    // Properties that determine when Stremio picks this add-on
    "types": ["movie", "series"], // your add-on will be preferred for those content types
    "idProperty": "imdb_id", // the property to use as an ID for your add-on; your add-on will be preferred for items with that property; can be an array
    // We need this for pre-4.0 Stremio, it's the obsolete equivalent of types/idProperty
    "filter": { "query.imdb_id": { "$exists": true }, "query.type": { "$in":["series","movie"] } }
};

var dataset = {
    // Some examples of streams we can serve back to Stremio ; see https://github.com/Stremio/stremio-addons/blob/master/docs/api/stream/stream.response.md
    "tt0051744": { infoHash: "9f86563ce2ed86bbfedd5d3e9f4e55aedd660960" }, // house on haunted hill 1959
    "tt1254207": { url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", availability: 1 }, // big buck bunny, HTTP stream
    "tt0031051": { yt_id: "m3BKVSpP80s", availability: 3 }, // The Arizona Kid, 1939; YouTube stream
    "tt0137523": { externalUrl: "https://www.netflix.com/watch/26004747" }, // Fight Club, 1999; redirect to Netflix
};





var methods = { };
var addon = new Stremio.Server(methods, manifest);




var server = require("http").createServer(function (req, res) {
    addon.middleware(req, res, function() { res.end() }); // wire the middleware - also compatible with connect / express
}).on("listening", function()
{
    console.log("Sample Stremio Addon listening on "+server.address().port);
}).listen(process.env.PORT || 7000);
