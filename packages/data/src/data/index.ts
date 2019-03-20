export default (dataType) => {
    var normalizedPath = require("path").join(__dirname, `./${dataType}`);

    const data = {};
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        Object.assign(data, require(`./${dataType}/${file}`));
    });

    return data;
}