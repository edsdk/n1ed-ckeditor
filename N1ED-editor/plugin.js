/*!
 * Add-on for including N1ED into your CKEditor 4
 * Developer: N1ED
 * Website: https://n1ed.com/
 * License: GPL v3
 */


/*
 *   HOW TO INSTALL THIS ADD-ON
 *
 *   1. Copy the plugin into
 *
 *        ckeditor/
 *          plugins/
 *            N1ED-editor/
 *              plugin.js
 *
 *   2. Add "N1ED-editor" into "extraPlugins" config option
 *   3. Done
 *
 *
 *   VISUAL CONFIGURATION
 *
 *   Configure N1ED visually using the Dashboard:
 *
 *       https://n1ed.com/dashboard
 *
 *   Get there an API key to link with your installation.
 *   Specify it as a CKEditor parameter:
 *
 *       apiKey: "..."
 */

(function() {

    var PLUGIN_NAME = "N1ED-editor";
    var DEFAULT_API_KEY = "N1ED24RR1234123412341234";

    window.n1edPluginVersion=202409001;
    window.n1edPluginEditor="ckeditor";

    function get(varName, defaultValue) {
        if (window[varName] !== undefined && window[varName] !== "-")
            return window[varName];
        else
            return defaultValue;
    }

    var apiKey = CKEDITOR.config.apiKey;
    if (!apiKey) {
        for (var i = 0; i < Object.keys(CKEDITOR.instances).length; i++) {
            var id = Object.keys(CKEDITOR.instances)[i];
            if (CKEDITOR.instances[id].config.apiKey)
                apiKey = CKEDITOR.instances[id].config.apiKey;
            if (!apiKey) {
                if (CKEDITOR.instances[id].config.Flmngr && CKEDITOR.instances[id].config.Flmngr.apiKey)
                    apiKey = CKEDITOR.instances[id].config.Flmngr.apiKey;
            }
        }
    }

    window.CKEDITOR_OVERRIDE_API_KEY_PARAM = "OVERRIDE_API_KEY";
    apiKey = window.OVERRIDE_API_KEY || window.N1ED_API_KEY || apiKey || DEFAULT_API_KEY;

    var version = get("N1ED_VERSION", "latest");
    var n1edPrefix = get("N1ED_PREFIX", null);
    var n1edHttps = get("N1ED_HTTPS", true);

    var protocol = n1edHttps ? "https" : "http";

    var host = (n1edPrefix ? (n1edPrefix + ".") : "") + "cloud.n1ed.com";
    var urlPlugin = protocol + "://" + host + "/a/" + apiKey + "/plugins/N1EDEco/plugin.js";

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
                            m = failed[i].match(/^https?:\/\/cloud\.n1ed\.com\/.*\/plugin\.js.*?/);
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
        "requires": ["N1EDEco"], // We can not move Ecosystem in this file due to we need to dynamically
                                   // embed configuration from your Dashboard into it.
                                   // So Ecosystem add-on can be loaded only from CDN
    });

    function applyPatch() {
        window.applyPatch && window.applyPatch(PLUGIN_NAME, window.n1edPluginVersion, apiKey);
    }
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = protocol + "://" + host + "/static/pluginPatch.js";
    document.head.appendChild(script);
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                applyPatch();
            }
        };
    } else {  //Others
        script.onload = function () {
            applyPatch();
        };
    }

})()