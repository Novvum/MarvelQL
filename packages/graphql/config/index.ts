const stage = process.env.STAGE || "staging";

const config = {
    baseURL: 'https://gateway.marvel.com/v1/public',
    production: {
        MARVEL_API_KEY: process.env.MARVEL_API_KEY,
        MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
    },
    staging: {
        MARVEL_API_KEY: process.env.MARVEL_API_KEY_STAGING || '07812287fdfb880f5ebdbf1e5b9fce53',
        MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY_STAGING || 'e23c321aab355ba04371c1e50cef43823ab35752',
    }
}

export default {
    ...config,
    ...(config[stage] || {})
}