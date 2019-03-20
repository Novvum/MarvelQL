var normalizedPath = require("path").join(__dirname);

const data = {};
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    if (file !== "index.ts") {
        Object.assign(data, require(`./${file}`));
    }
});

export default data