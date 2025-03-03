# fern
This is a Tauri app that will function as an ebook reader. 

This Project is currently ongoing. Progress will be updated in the section below.

### Current Status
Development has been restarted using epub.js. The Library and Reader ae both functional. Only QoL features remain.

#### Features Implemented
- Library with all of your books 
- Theme and Font Size options
- Keyboard reader Controls

#### Features planned
- Full app theming
- Custom Library directory
- Bookmark support
- Cross-platform Testing

# Get it running
After cloning the repository, use:

```bash
npm install # to install required modules

npm run tauri dev # to start a dev server instance

```
Any changes you make in the javascript part of the app will be updated automatically.

When changing config files, The app will only rebuild the necessary parts.

### I wanted to make my own parser for this
Commit 3b3152e (First commit to this repo) will have a method to parse covers and titles from epub files, but I quickly scrapped this idea when I realized how cumbersome it would be to ensure all edge cases work properly.
(Three different books obtained from Project Gutenberg had three different locations for their cover image. Considering all the ebooks I could not test, it would be difficult to ensure that all files work.) 

Because of this I decided to use epub.js, which handles all parsing by itself.
