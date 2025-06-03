require('web-streams-polyfill/dist/polyfill.js');
const {TextEncoder, TextDecoder} = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
