N1ED - powerful HTML WYSIWYG editor for your website. Based on CKEditor it cardinally improves it beyond recognition.
It supports Drupal 7 and 8, WordPress and Joomla 3, has online Dashboard and perfect Bootstrap 4 support.
Most of JS+ add-ons are included in the N1ED.

N1ED plugin for CKEditor 4 lets you to easily try N1ED with your editor.

## Installation

First copy ```N1ED``` directory into ```ckeditor/plugins/``` and then:

### If you use config.js
Add this line into your "config.js" file to activate N1ED. All futhur job will be done by it.
```
config.extraPlugins = "N1ED";
```

### If you use initialization script
When you pass parameters to CKEditor 4 manually as function argument, do the same but inside config structure:
```
CKEDITOR.replace(
  "#editor",
  {
     extraPlugins: "N1ED"
  }
);
```
