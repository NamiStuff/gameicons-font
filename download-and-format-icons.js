
const fs = require('fs');
const path = require('path');

const fetch = require('node-fetch');
const extract = require('unzipper');
const { svg2png } = require('svg-png-converter');
const webfontsGenerator = require('webfonts-generator');

const BASE_URL = 'https://game-icons.net/archives/svg/zip/000000/transparent/game-icons.net.svg.zip';

const FILE_COUNTS = {};
const FILE_NAMES = [];

const iconFont = async () => {
  webfontsGenerator({
    files: fs.readdirSync('./test/svg').map(file => `./test/svg/${file}`),
    dest: './dist',
    fontName: 'game-icons',
    css: true,
    templateOptions: {
      classPrefix: 'gi-',
      baseSelector: '.gi'
    },
    types: ['woff', 'eot', 'ttf'],
    startCodepoint: 0xF000,
    normalize: true
  }, () => {
    console.log('webfont generated');
    fs.readdirSync('./dist').forEach(file => fs.copyFileSync(`./dist/${file}`, `./test/css/${file}`));
  });

};

const extractZip = async () => {
  if(!fs.existsSync('./temp/svg')) fs.mkdirSync('./temp/svg');
  if(!fs.existsSync('./temp/png')) fs.mkdirSync('./temp/png');

  const allFiles = fs.createReadStream(`temp/icons.zip`)
    .pipe(extract.Parse())
    .on('entry', async (entry) => {
      if(!entry.path.includes('.svg')) return;

      const name = path.basename(entry.path, path.extname(entry.path));
      
      let file = name;

      if(FILE_COUNTS[name]) {
        FILE_COUNTS[name] += 1;
        file = `${name}-${FILE_COUNTS[name]}`;
      } else {
        FILE_COUNTS[name] = 1;
        file = `${name}`;
      }

      const filedata = await entry.buffer();

      fs.writeFileSync(`test/svg/${file}.svg`, filedata);

      const output = await svg2png({
        input: filedata,
        encoding: 'buffer',
        format: 'png'
      });

      fs.writeFileSync(`test/png/${file}.png`, output);

      FILE_NAMES.push({ name });

    });

  allFiles.on('finish', () => {
    console.log('zip extracted');
    fs.writeFileSync('./test/data/glyphs.json', JSON.stringify(FILE_NAMES));
    iconFont();
  });
};

const init = async () => {
  if(!fs.existsSync('./temp')) fs.mkdirSync('./temp');

  const zip = await fetch(BASE_URL);
  
  const stream = fs.createWriteStream(`temp/icons.zip`);
  zip.body.pipe(stream);

  zip.body.on('finish', () => {
    console.log('file downloaded');
    extractZip();
  });
};

init();
