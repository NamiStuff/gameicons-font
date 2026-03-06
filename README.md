# Game Icons font
An icon font for [game-icons/icons](https://github.com/game-icons/icons) made by [Seiyria](https://github.com/seiyria/gameicons-font) and updated for the needs of my sites.

Since Game Icons GitHub repo is a bit outdated, this pulls from the live site, using the [black on transparent SVGs](http://game-icons.net/archives/svg/zip/000000/transparent/game-icons.net.svg.zip).

# Usage

* install the .css file
* add an icon: `<i class="gi gi-anchor"></i>`

# Want to change the font or icon class?

* fork the repository
* go to `download-and-format-icons.js`
* update const `fontClass` and / or `iconClass` with the name/s you prefer
  * `fontClass` corresponds to the class for the font itself (example: `.gi`)
  * `iconClass` corresponds to the prefix used for each icon (example: `.gi-anchor`)
* if you use the directory, go to `test/index.html` and update the code example in the instructions
    
# Want to build it yourself?

* npm install
* npm run build:font

# Want to deploy it?

* npm run deploy

# Want to adjust the site?

The site is made using Mithril.js. Development is easy:

* npm install
* npm run dev

A live server will spin up, watching the `test/` directory. Any changes made will refresh the browser.
