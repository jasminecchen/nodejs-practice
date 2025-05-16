// 讓 Drizzle 知道這個專案有哪些schema
const dotenv = require("dotenv");
const { defineConfig } = require("drizzle-kit");

dotenv.config();

module.exports = defineConfig({
  out: "./drizzle",
  schema: "./db/schema.js",
  dialect: "postgresql", // 指定使用 postgresql
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
