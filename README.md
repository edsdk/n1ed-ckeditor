<p align="center">
    <a href="https://n1ed.com/"><img src="https://n1ed.com/img/favicons/favicon-64x64.png" alt="N1ED" /></a>
</p>

<h1 align="center">N1ED</h1>

<p align="center">
    <strong>Create your content block by block using N1ED page builder.</strong>
</p>

<p align="center">
    <a href="https://n1ed.com/">Home page</a> ∙ <a href="https://n1ed.com/doc/install-ckeditor-plugin/">Install</a> ∙ <a href="https://n1ed.com/demo/">Try Online</a>
</p>

[![Edit articles with N1ED](https://n1ed.com/img/screenshots/docs/addons/n1ed/n1ed.jpg)](https://n1ed.com)

## N1ED is a free plugin for CKEditor 4 making level-up for your editor

### Main features:

- Adds many new widgets to CKEditor
- Configure CKEditor, N1ED and other add-ons visually using Dashboard
- Easy integrations with:
    - Bootstrap Editor
    - File Manager
    - Image Editor
    - other ecosystem plugins enabled in Dashboard
- Mobile simulation feature and gives you content preview in different display resolutions
- Advanced breadcrumbs integrated with powerful widget editing system
- Useful fullscreen mode
- 3 UI modes:
    - Classic mode with floating sidebar for editing widgets
    - Fullscreen-only mode to focus on your content
    - Dialogs mode like all other plugins which offer to edit widgets in a dialogs
- Always auto updated using CDN

N1ED add-on and Dashboard are absolutely free.


## Installation

Copy `N1ED-editor` directory into `ckeditor/plugins/`.
You will have such file path as result: `ckeditor/plugins/N1ED-editor/plugin.js`.

### If you use `config.js`
Add this line into your "config.js" file to activate N1ED:

```js
config.extraPlugins = "N1ED-editor";
```

All further job will be done by N1ED.

### If you use initialization script
When you pass parameters to CKEditor 4 manually as function argument, do the same but inside config structure:
```js
CKEDITOR.replace(
  "#editor",
  {
     extraPlugins: "N1ED-editor"
  }
);
```

## Configuration

N1ED being installed is ready to run without any configuration.
If you want to change preferences, use free [Dashboard](https://n1ed.com/dashboard) to edit configuration visually.

[![N1ED configuration](https://n1ed.com/img/screenshots/docs/addons/n1ed/n1ed-configuration.png)​](https://n1ed.com)

You can change this configuration as many times you want and it will be automatically applied to your add-on instance linked to it.

When you've changed your configuration in Dashboard once please make sure you updated the API key in your CKEditor configuration like:

```js
config.apiKey = "APIKEY12";
```


## Bonus: skin for CKEditor

In order to make your CKEditor more beautiful and similar with N1ED we prepared the special skin for CKEditor called N1Theme.

You can [download N1Theme](https://ckeditor.com/cke4/addon/n1theme) and use it for free.

## Support

Please feel free to ask any questions regarding installation or using sending a letter to [support e-mail](support@n1ed.zendesk.com).