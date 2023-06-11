# Style Importer

The Style Importer plugin lets you load a CSS file into your snippets folder from a URL. This provides an easy way to keep styles synced across multiple notebooks.

- [GitHub](https://github.com/joshrouwhorst/style-importer)
- [Buy Me a Coffee](https://buymeacoffee.com/joshrouwhorst)

## Setup

When you first set up this plugin in a notebook you will want to go through these steps:

1. Open Settings.
2. Go to Style Import settings.
3. Set the URL where your CSS file is hosted.
4. Go to Appearance settings.
5. Scroll down to CSS Snippets.
6. Click the Refresh button if you don't see a style-importer file.
7. Toggle on the style-importer file.

## Hosting CSS

A quick way to get your CSS file hosted is to go to [GitHub Gists](https://gist.github.com) where you can create a gist. Create your CSS file there and then enter the URL to the **Raw** version of your file in the Style Import settings.

## Internet Requests & File Changes

This plugin will only make requests to the URL(s) you provide it for CSS files. It then saves that file in your `.obsidian/snippets` folder under the filename `style-importer.css`. No other file manipulation is done by this plugin.

## Feedback
If you have any feedback or questions you can submit an issue on the [GitHub project](https://github.com/joshrouwhorst/style-importer/issues).
