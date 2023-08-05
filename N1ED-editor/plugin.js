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
window.n1edPluginVersion=202308001;
for (var i=0; i<Object.keys(CKEDITOR.instances).length; i++) {
    var id = Object.keys(CKEDITOR.instances)[i];
    if (CKEDITOR.instances[id].config.apiKey)
        apiKey = CKEDITOR.instances[id].config.apiKey;
    else if (CKEDITOR.instances[id].config.Flmngr && CKEDITOR.instances[id].config.Flmngr.apiKey)
        apiKey = CKEDITOR.instances[id].config.Flmngr.apiKey;
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
window.CKEDITOR_OVERRIDE_API_KEY_PARAM = "OVERRIDE_API_KEY";
apiKey = getCookie("N1ED_APIKEY") || apiKey || window.OVERRIDE_API_KEY || window.N1ED_API_KEY || "N1EDMDRN";
n1edHttps = (getCookie("N1ED_HTTPS") === "false" || n1edHttps === false) ? false : true;
n1edPrefix = getCookie("N1ED_PREFIX") || n1edPrefix || null;
n1edHttpsApp = (getCookie("N1ED_HTTPS_APP") === "false" || n1edHttpsApp === false) ? false : true;
n1edPrefixApp = getCookie("N1ED_PREFIX_APP") || n1edPrefixApp || null;
protocol = n1edHttps ? "https" : "http";
var host = (n1edPrefix ? (n1edPrefix + ".") : "") + "cloud.n1ed.com";
var version = getCookie("N1ED_VERSION") || version || "latest";

if (!urlCache) {
    window.N1ED_PREFIX = n1edPrefix;
    window.N1ED_HTTPS = n1edHttps;
}
window.N1ED_PREFIX_APP = n1edPrefixApp;
window.N1ED_HTTPS_APP = n1edHttpsApp;

var urlPlugin = (
    urlCache ? (urlCache + apiKey + "/" + version) : (protocol + "://" + host + "/cdn/" + apiKey + "/" + version)
) + "/ckeditor/plugins/N1EDEco/plugin.js";

var oldScriptLoaderLoad = window.CKEDITOR.scriptLoader.load;
window.CKEDITOR.scriptLoader.load = function(scriptUrl, callback, scope, showBusy) {
    return oldScriptLoaderLoad.apply(scope, [
        scriptUrl,
        function(completed, failed) {
            if (!!failed && failed.length) {
                console.error( '[CKEDITOR.resourceManager.load] Resource was not found at "' + failed[0] );

                for (var i=0; i<failed.length; i++) {
                    var m = failed[i].match(/^https?:\/\/cloud\.n1ed.com\/cdn\/[^/]+?\/[^/]+?\/ckeditor\/plugins\/([^/]+?)\/plugin\.js.*?/);
                    if (m != null) {
                        var pluginName = m[1];
                        console.log("Using a stub for '" + pluginName + "' plugin");
                        CKEDITOR.plugins.add(pluginName, {});
                        if (!completed)
                            completed = [];
                        completed.push(failed[i]);
                    }
                }
                failed = [];
            }

            var elsLoaders = document.querySelectorAll(".n1ed_loading");
            if (!!elsLoaders)
                for (var i=0; i<elsLoaders.length; i++)
                    elsLoaders.item(i).parentElement.removeChild(elsLoaders.item(i));

            callback.apply(scope, [completed, failed]);
        },
        scope,
        showBusy
    ]);
};

CKEDITOR.plugins.addExternal("N1EDEco", urlPlugin);
CKEDITOR.plugins.add( "N1ED-editor", {
    "requires": ["N1EDEco"], // We can not move N1EDEco in this file due to we need to dynamically
                             // embed configuration from your Dashboard into it.
                             // So N1EDEco add-on can be loaded only from CDN
});