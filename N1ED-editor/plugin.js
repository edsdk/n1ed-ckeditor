/*!
 * Add-on for including N1ED into your CKEditor 4
 * Developer: N1ED
 * Website: https://n1ed.com/
 * License: GPL v3
 */


//
//   HOW TO INSTALL THIS ADD-ON
//
//   1. Copy the plugin as "ckeditor/plugins/n1ed/plugin.js"
//   2. Add "n1ed" into "extraPlugins" config option
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
for (var i=0; i<Object.keys(CKEDITOR.instances).length; i++) {
    var id = Object.keys(CKEDITOR.instances)[i];
    if (CKEDITOR.instances[id].config.apiKey)
        apiKey = CKEDITOR.instances[id].config.apiKey;
}
if (!apiKey)
    apiKey = "CKEDDFLT";


CKEDITOR.plugins.addExternal(
    "N1EDEco",
    "https://cloud.n1ed.com/cdn/" + apiKey + "/latest/ckeditor/plugins/N1EDEco/plugin.js"
);
CKEDITOR.plugins.add( "N1ED-editor", {
    "requires": ["N1EDEco"], // We can not move N1EDEco in this file due to we need to dynamically
                             // embed configuration from your Dashboard into it.
                             // So N1EDEco add-on can be loaded only from CDN
});