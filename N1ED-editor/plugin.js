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

(function() {

    var PLUGIN_NAME = "N1ED-editor";
    var DEFAULT_API_KEY = "N1EDMDRN";

    window.n1edPluginVersion=202308001;

    function get(varName, defaultValue) {
        if (window[varName] !== undefined)
            return window[varName];
        else
            return defaultValue;
    }

    var apiKey = CKEDITOR.config.apiKey;
    for (var i=0; i<Object.keys(CKEDITOR.instances).length; i++) {
        var id = Object.keys(CKEDITOR.instances)[i];
        if (CKEDITOR.instances[id].config.apiKey)
            apiKey = CKEDITOR.instances[id].config.apiKey;
        else if (CKEDITOR.instances[id].config.Flmngr && CKEDITOR.instances[id].config.Flmngr.apiKey)
            apiKey = CKEDITOR.instances[id].config.Flmngr.apiKey;
    }

    window.CKEDITOR_OVERRIDE_API_KEY_PARAM = "OVERRIDE_API_KEY";
    apiKey = window.OVERRIDE_API_KEY || window.N1ED_API_KEY || apiKey || DEFAULT_API_KEY;

    var version = get("N1ED_VERSION", "latest");
    var n1edPrefix = get("N1ED_PREFIX", null);
    var n1edHttps = get("N1ED_HTTPS", true);

    var protocol = n1edHttps ? "https" : "http";

    // TODO: change to cdn.n1ed.com host
    //var host = (n1edPrefix ? (n1edPrefix + ".") : "") + "cdn.n1ed.com";
    var host = (n1edPrefix ? (n1edPrefix + ".") : "") + "cloud.n1ed.com";

    // TODO: change to cdn.n1ed.com form
    //var urlPlugin = protocol + "://" + host + "/v/" + version + "/plugins/N1EDEco/plugin.js?apiKey=" + apiKey;
    var urlPlugin = protocol + "://" + host + "/cdn/" + apiKey + "/" + version + "/ckeditor/plugins/N1EDEco/plugin.js";

    var oldScriptLoaderLoad = window.CKEDITOR.scriptLoader.load;
    window.CKEDITOR.scriptLoader.load = function(scriptUrl, callback, scope, showBusy) {
        return oldScriptLoaderLoad.apply(scope, [
            scriptUrl,
            function(completed, failed) {
                if (!!failed && failed.length) {
                    console.error( '[CKEDITOR.resourceManager.load] Resource was not found at "' + failed[0] );

                    for (var i=0; i<failed.length; i++) {
                        var m = failed[i].match(/^https?:\/\/cloud\.n1ed\.com\/cdn\/[^/]+?\/[^/]+?\/ckeditor\/plugins\/([^/]+?)\/plugin\.js.*?/);

                        if (!m) {
                            m = failed[i].match(/^https?:\/\/cdn\.n1ed\.com\/v\/[^/]+?\/plugins\/([^/]+?)\/plugin\.js.*?/);
                        }
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
    CKEDITOR.plugins.add( PLUGIN_NAME, {
        "requires": ["N1EDEco"], // We can not move N1EDEco in this file due to we need to dynamically
                                 // embed configuration from your Dashboard into it.
                                 // So N1EDEco add-on can be loaded only from CDN
    });

})()