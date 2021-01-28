const path = require('path');
const fs = require('fs-extra');
const lessc = require('less');

const readCssContent = fileName => {
  return fs.readFileSync(fileName, {encoding: 'utf8'});
};

exports.collectFiles = function collectFiles(
  sourceFolder,
  targetFilename,
  files = []
) {
  const folders = [];
  fs.readdirSync(sourceFolder)
    .map(name => path.join(sourceFolder, name))
    .forEach(source => {
      if (fs.lstatSync(source).isDirectory()) folders.push(source);
      else if (source.includes(targetFilename)) files.push(source);
    });
  folders.forEach(f => collectFiles(f, targetFilename, files));
  return files;
};

exports.readCssContent = readCssContent;

exports.compileLess = async fileName => {
  const {css} = await lessc.render(readCssContent(fileName));
  return css;
};

exports.mergeAndCreateCss = (contentArray, targetFile) => {
  if (!Array.isArray(contentArray)) return false;
  let result = '';
  contentArray.forEach(content => (result += content));
  fs.outputFileSync(targetFile, result);
  return true;
};
