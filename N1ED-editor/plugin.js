/*!
 * Add-on for including N1ED into your CKEditor 4
 * Developer: N1ED
 * Website: https://n1ed.com/
 * License: GPL v3
 */


//
//   HOW TO INSTALL THIS ADD-ON
//
//   1. Copy the plugin as "ckeditor/plugins/N1ED-editor/plugin.js"
//   2. Add "N1ED-editor" into "extraPlugins" config option
//   3. Done!
//
//
//   VISUAL CONFIGURATION
//
//   If you want to configure all N1ED add-ons visually,
//   just go into your Dashboard at:
//
//       https://n1ed.com/dashboard
//
//   Once configured N1ED using Dashboard please set your personal API key to use it:
//
//      config.apiKey = "APIKEY12";
//

var apiKey = CKEDITOR.config.apiKey;
var version = CKEDITOR.config.version;
var n1edPrefix = CKEDITOR.config.n1edPrefix;
var n1edHttps = CKEDITOR.config.n1edHttps;
var n1edPrefixApp = CKEDITOR.config.n1edPrefixApp;
var n1edHttpsApp = CKEDITOR.config.n1edHttpsApp;
var urlCache = CKEDITOR.config.urlCache;
for (var i=0; i<Object.keys(CKEDITOR.instances).length; i++) {
    var id = Object.keys(CKEDITOR.instances)[i];
    if (CKEDITOR.instances[id].config.apiKey)
        apiKey = CKEDITOR.instances[id].config.apiKey;
    if (CKEDITOR.instances[id].config.version)
        version = CKEDITOR.instances[id].config.version;
    if (CKEDITOR.instances[id].config.n1edPrefix)
        n1edPrefix = CKEDITOR.instances[id].config.n1edPrefix;
    if ("n1edHttps" in CKEDITOR.instances[id].config)
        n1edHttps = CKEDITOR.instances[id].config.n1edHttps;
    if (CKEDITOR.instances[id].config.n1edPrefixApp)
        n1edPrefixApp = CKEDITOR.instances[id].config.n1edPrefixApp;
    if ("n1edHttpsApp" in CKEDITOR.instances[id].config)
        n1edHttpsApp = CKEDITOR.instances[id].config.n1edHttpsApp;
    if (CKEDITOR.instances[id].config.urlCache)
        urlCache = CKEDITOR.instances[id].config.urlCache;
}

// Cookies may contain data for development purposes (which version to load, from where, etc.).
function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2)
        return parts.pop().split(';').shift();
    else
        return null;
}
apiKey = getCookie("N1ED_APIKEY") || apiKey || window.N1ED_API_KEY || "CKEDDFLT";
n1edHttps = (getCookie("N1ED_HTTPS") === "false" || n1edHttps === false) ? false : true;
n1edPrefix = getCookie("N1ED_PREFIX") || n1edPrefix || null;
n1edHttpsApp = (getCookie("N1ED_HTTPS_APP") === "false" || n1edHttpsApp === false) ? false : true;
n1edPrefixApp = getCookie("N1ED_PREFIX_APP") || n1edPrefixApp || null;
protocol = n1edHttps ? "https" : "http";
host = (n1edPrefix ? (n1edPrefix + ".") : "") + "cloud.n1ed.com";
version = getCookie("N1ED_VERSION") || version || "latest";

if (!urlCache) {
    window.N1ED_PREFIX = n1edPrefix;
    window.N1ED_HTTPS = n1edHttps;
}
window.N1ED_PREFIX_APP = n1edPrefixApp;
window.N1ED_HTTPS_APP = n1edHttpsApp;

var urlPlugin = (
    urlCache ? (urlCache + apiKey + "/" + version) : (protocol + "://" + host + "/cdn/" + apiKey + "/" + version)
) + "/ckeditor/plugins/N1EDEco/plugin.js";


CKEDITOR.plugins.addExternal("N1EDEco", urlPlugin);
CKEDITOR.plugins.add( "N1ED-editor", {
    "requires": ["N1EDEco"], // We can not move N1EDEco in this file due to we need to dynamically
                             // embed configuration from your Dashboard into it.
                             // So N1EDEco add-on can be loaded only from CDN
});