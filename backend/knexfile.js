const { db } = require("./.env")

module.exports = {
  client: 'postgresql',
  connection: db,
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
    propagateCreateError: false
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}