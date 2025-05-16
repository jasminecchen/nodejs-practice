const { pgTable, serial, varchar, char, integer, text, foreignKey } = require("drizzle-orm/pg-core")

// 英雄表
                             //要取的名稱, 物件
const heroesTable = pgTable("heroes", {
  id: serial().primaryKey().notNull(),
              // 限制字數的寫法，用物件包起來
  name: varchar({ length: 100 }).notNull(),
  gender: char({ length: 1 }),
  age: integer(),
  // key 命名和 值的寫法與上面的不同。由多字組成的名稱通常使用以下寫法
  // 這樣寫也沒有不行：hero_level: char( { length: 1 }).notNull(),
  // 只是命名慣例是以下寫法  
  heroLevel: char("hero_level", { length: 1 }).notNull(),
  heroRank: integer("hero_rank"),
  description: text()
})

// 怪物表                            
//                   使用 pgTable 建立表格
const monstersTable = pgTable(
  "monsters",
  {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    dangerLevel: char("danger_level", { length: 1 }).notNull(),
    killBy: integer("kill_by"),
    description: text()
  },
  (table) => [
    foreignKey({
      columns: [table.killBy],
      foreignColumns: [heroesTable.id],
      name: "fk_kill_by"
    })
      .onUpdate("restrict")
      .onDelete("set null")
  ]
)

/* const monstersTable = pgTable('monsters', {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 100 }).notNull(),
  dangerLevel: char("danger_level", { length: 1 }).notNull(),
  description: text(),
  killBy: integer("kill_by").references(() => heroesTable.id),
}); */

module.exports = {
  heroesTable,
  monstersTable
}
