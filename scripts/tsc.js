'use strict';
const fs = require('fs');
const {spawn} = require('child_process');
const {collectFiles, readCssContent, mergeAndCreateCss} = require('./utils');

const configs = {
  sourceFolder: 'src',
  targetFolders: ['lib', 'es'],
  excludeFolder: '__stories__',
  include: ['css', 'less', 'md']
  //   deep: 3
};

// export function collectFiles(targetFolder, targetFilename, files){
//     const folders = []
//     fs.readdirSync(targetFolder)
// }

// const rootPath = 'modules'
// const targetPath = 'lib'

// targetFolder
// .map(name => path.join(moduleName,name))
// .forEach(file => {
//     // fs.stat(file, function(err, stats) {
//     //     console.log(stats.isDirectory());
//     //     console.log(stats);
//     //   });
//     if(fs.lstatSync(file).isDirectory()){
//         return
//     }
//     console.log(file)
//     fs.copyFileSync(file,file.replace(rootPath,targetPath))
//     // fs.readFile(`${moduleName}/${file}`, (err, data) => {
//     //     if (err) throw err;
//     //     // console.log(data);
//     // });
// })

// const checkDirectory = (path) => fs.lstatSync(path).isDirectory()

// const copyFile = () => {
//     // if(fs.lstat())
//     const rootFolder = fs.readdirSync(rootPath)
//     // fs.readdir(rootPath, file => {
//     //     console.log(file)
//     //     console.log(fs.lstatSync(file).isDirectory())
//     // })
//     rootFolder.map(modulePath => path.join(rootPath,modulePath))
//     .forEach(modulePath => {
//         if(checkDirectory(modulePath)){
//             const moduleFolder = fs.readdirSync(modulePath)
//             moduleFolder
//             .filter(filePath => filePath.indexOf('index.js') === -1 && filePath.indexOf('.tsx') === -1)
//             .map(filePath => path.join(modulePath,filePath))
//             .forEach(filePath => {
//                 console.log(filePath)
//                 if(!checkDirectory(filePath)){
//                     fs.copyFileSync(filePath,filePath.replace(rootPath,targetPath))
//                 }
//             })
//         }
//     })
//     // console.log(rootFolder)
// }

// console.log(copyFile())

//递归

// const copyFiles = (parentPath, files = []) => {
//     const parentFolder = fs.readdirSync(parentPath)
//     parentFolder
//     .map(file => path.join(parentPath, file).replace('\\','/'))
//     .forEach(file => {
//         if(checkDirectory(file)){
//             files.push(copyFiles(file,files))
//         }else{
//             files.push(file)
//         }
//         // files.push(file)
//     })
//     return files
// }

// const config = (rootPath, targetPath) => {
//     console.log(copyFiles(rootPath))
// }

// config('modules')

const use = config => {
  const {
    sourceFolder,
    include,
    targetFolders,
    deep = 4,
    excludeFolder
  } = config;
  let arr = [];
  let cssContentArray = [];
  include.map(item => {
    const fileArray = collectFiles(sourceFolder, item);
    arr.push(...fileArray);
    switch (item) {
      case 'less':
      case 'css':
        cssContentArray.push(...fileArray.map(readCssContent));
      default:
        break;
    }
  });
  mergeAndCreateCss(cssContentArray, 'dist/style.less');

  spawn('lessc', ['dist/style.less', 'dist/style.css'], { shell: true });

  arr = arr
    .map(path => path.replace(/\\/gi, '/'))
    .filter(path => path.split('/').length <= deep)
    .filter(path => !path.includes(excludeFolder))
    .forEach(path => {
      targetFolders.forEach(targetFolder => {
        // if (path.includes('.less')) {
        //   const middlePath = path.slice(
        //     configs.sourceFolder.length + 1,
        //     -'.less'.length
        //   );
        //   console.log(middlePath)
        //   // spawn('lessc', [path, `${targetFolder}/${middlePath}.css`]);
        // }
        if (path.includes('.css') || path.includes('.less')) {
          fs.copyFileSync(path, path.replace(sourceFolder, targetFolder));
        }
      });
    });
};

use(configs);
