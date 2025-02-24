This is a Tauri app that will function as an ebook reader. 

### Current Status
Development has been restarted using epub.js.

# I wanted to make my own parser for this
Commit 3b3152e (First commit to this repo) will have a method to parse covers and titles from epub files, but I quickly scrapped this idea when I realized how cumbersome it would be to ensure all edge cases work properly.
(Three different books obtained from Project Gutenberg had three different locations for their cover image. Considering all the ebooks I could not test, it would be difficult to ensure that all files work.) 

Because of this I decided to use epub.js, which handles all parsing by itself.