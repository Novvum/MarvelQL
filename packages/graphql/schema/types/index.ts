import * as path from 'path';
import * as fs from 'fs';
var normalizedPath = path.join(__dirname);

const data = {};
fs.readdirSync(normalizedPath).forEach(function (file) {
    if (file !== "index.ts") {
        Object.assign(data, require(`./${file}`));
    }
});

export default data

// export * from './Character'
// export * from './Comic'
// export * from './Creator'
// export * from './DateDescriptor'
// export * from './DateTime'
// export * from './Event'
// export * from './MarvelNode'
// export * from './MarvelUrl'
// export * from './Query'
// export * from './Series'
// export * from './Story'
// export * from './Summary'
// export * from './TextObject'