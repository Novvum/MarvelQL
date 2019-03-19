import jsonConcat from 'json-concat';
var path = require("path");

const name = process.argv[2];
console.log(name)
jsonConcat({
    src: path.join(__dirname, `./data/${name}`),
    dest: path.join(__dirname, `./data/${name}/_merged.json`)
}, function (json) {
    console.log(json);
});

