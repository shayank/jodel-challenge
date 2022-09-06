export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    url: process.env.DATABASE_URL,
    url_test: process.env.DATABASE_URL_TEST,
  },
});
