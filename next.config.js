/* eslint-disable @typescript-eslint/no-var-requires */
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv({
    publicRuntimeConfig: {
        CLIENTID: process.env.CLIENTID,
        CLIENTSECRET: process.env.CLIENTSECRET
    }
})