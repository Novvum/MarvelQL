// import { writeFileSync } from 'fs';
// import DataLoader from 'dataloader';

// var path = require("path");
export default (dataType) => {
    // var normalizedPath = path.join(__dirname, `./${dataType}`);

    // const data = {};
    // require("fs").readdirSync(normalizedPath).forEach(function (file) {
    //     Object.assign(data, require(`./${dataType}/${file}`));
    // });
    // const dataLoader = new DataLoader(async keys => {
    //     const existingData = require(`./${dataType}/_jit.json`);
    //     keys.map((key: any) => {
    //         existingData[key.key] = key.value;
    //     })
    //     writeFileSync(
    //         path.join(__dirname, `./${dataType}/_jit.json`),
    //         JSON.stringify(existingData, null, 2),
    //         'utf-8'
    //     );
    //     return keys.map((k: any) => k.value);
    // }, { cache: false, batch: true, maxBatchSize: 1000 })
    return {
        // ...data,
        add(key, value) {
            // return dataLoader.load({
            //     key,
            //     value
            // }).catch(console.error)
        }
    };
}