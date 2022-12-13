# GameIcons font
An icon font for [game-icons/icons](https://github.com/game-icons/icons) made by [Seiyria](https://github.com/seiyria/gameicons-font). Unfortunately their GitHub repo is a bit outdated, so instead this pulls from the live site, using the [black on transparent SVGs](http://game-icons.net/archives/svg/zip/000000/transparent/game-icons.net.svg.zip).

# Usage

* install the .css file
* add an icon: `<i class="gi gi-anchor"></i>`

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
