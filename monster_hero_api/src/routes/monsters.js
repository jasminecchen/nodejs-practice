const express = require("express")
const router = express.Router()

const db = require("../../db/index")
const { heroesTable, monstersTable } = require("../../db/schema")

const { eq } = require("drizzle-orm")

// get all
router.get("/", async (req, res) => {
  try {
    const rows = await db.select().from(monstersTable)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// get by id
router.get("/:id", async (req, res) => {
  try {
    // SELECT * FROM heroes WHERE id = 動態 id
    // eq(...) 是 Drizzle 提供的比對相等的函式（等同 SQL 的 =）
    const rows = await db.select().from(monstersTable).where(eq(monstersTable.id, req.params.id))

    if (!rows) return res.status(404).json({ message: "找不到符合 ID" })

    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// update
router.put("/:id", async (req, res) => {
  try {
    const { name, dangerLevel, description, killBy } = req.body

    await db
      .update(monstersTable)
      .set({
        name,
        dangerLevel,
        description,
        killBy
      })
      .where(eq(monstersTable.id, req.params.id))
    res.json({ message: "更新怪物成功" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
