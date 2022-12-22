require('dotenv/config');

 const appConfig = {
  port: process.env.APP_PORT || 3333,
}

export default appConfig;
