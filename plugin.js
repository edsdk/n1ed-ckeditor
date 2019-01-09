/*!
 * Add-on for including N1ED into your CKEditor
 * Developer: N1ED
 * Website: https://n1ed.com/
 * License: GPL v3
 */

CKEDITOR.plugins.add( "N1ED", {
    "init": function(editor) {
        var el = editor.element.$;
        if (!el.classList.contains("n1ed__col")) { // Do not attach to internal editor of N1ED

            editor.destroy();
            var apiKey = editor.config["apiKey"];
            if (!apiKey)
                apiKey = "DEMOPLGC";

            if (window.N1ED) {
                // N1ED is already loaded
                window.N1ED.attachTo(el, function() {
                    // Attached OK
                });
            } else {
                // Load N1ED and attach when load is finished
                includeJS(
                    "https://cdn.n1ed.com/cdn/" + apiKey + "/n1ed.js",
                    function() {
                        window.N1ED.attachTo(el, function() {
                            // Attached OK
                        });
                    }
                );
            }

        }
    }
});

function includeJS(url, onIncluded) {
    var scripts = document.getElementsByTagName("script");
    var alreadyExists = false;
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].getAttribute("src");
        if (src != null && src.indexOf(url) !== -1)
            alreadyExists = true;
    }
    if (!alreadyExists) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (onIncluded != null) {
            if (script.readyState) {  // IE
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        onIncluded();
                    }
                };
            } else {  // Others browsers
                script.onload = function () {
                    onIncluded();
                };
            }
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        if (onIncluded != null)
            onIncluded();
    }
}