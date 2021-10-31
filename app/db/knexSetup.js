const dbDebugEnabled = (`${process.env.DB_DEBUG_ENABLED}` === "true");

const local = {
  client: "pg",
  connection: {
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
    timezone: "UTC",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migration",
  },
  debug: dbDebugEnabled,
};

module.exports = {
  local,
};
