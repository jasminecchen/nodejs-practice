const { drizzle } = require("drizzle-orm/node-postgres")
const { Pool } = require("pg")
require("dotenv").config()
// Pool 在 postgreSQl 扮演管理員的角色
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const db = drizzle(pool)

module.exports = db
