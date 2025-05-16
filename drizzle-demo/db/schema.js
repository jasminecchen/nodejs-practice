const {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} = require("drizzle-orm/pg-core");

const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp().defaultNow(),
  address: varchar({ length: 255 }).notNull(),
});
               // 使用 pgTable 建立表格
const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 100 }).notNull(),
  content: text().notNull(),
  // 讓user的 id 和 usersTable 的 id 做關聯
  user_id: integer().references(() => usersTable.id),
  created_at: timestamp().defaultNow(),
});

module.exports = {
  usersTable,
  postsTable,
};
