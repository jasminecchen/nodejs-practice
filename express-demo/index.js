// 拿取 express方法
const express = require("express");
// 執行 express
const app = express();
const port = 3000;

// 解析 JSON 格式，讓 Express 能夠正確讀取、解析「前端送過來的 JSON 格式資料」
app.use(express.json());

const users = [];

// GET 方法：拿取資料
app.get("/", (req, res) => {
  res.send("首頁");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST 方法：寫入(新增)資料
app.post("/api/users", (req, res) => {
  // 新增一個物件進去
  const newUser = {
    id: users.length + 1, // 每個會員有獨立的 ID 以方便辨識，現在是 0，第一個使用者就會是 1
    phone: req.body.phone, // req.body 是整筆資料(JSON物件) 要傳入JSON格式，所以會選 POSTMAN 的Body 會選 raw
  };
  users.push(newUser); // 將資料塞入陣列
  res.status(201).json({
    message: "使用者已建立",
    user: newUser,
  }); // 成功後回傳狀態，201 跟 200 的差異是 201 是建立新的資源
});

// PUT 更新資料時使用
//  : 冒號代表東西是動態的，會依照請求不同而改變
app.put("/api/users/:id", (req, res) => {
  // 讀取動態的 id
  // Number.parseInt(...)：把字串轉成數字，即使在 JSON 中看到的 id 是數字，當它是從「網址的參數（params）」中傳進來時，它會是「字串型別」，不是數字！，雖然 JavaScript 會自動轉型，但自動轉型有時會產生一些難以預料的錯誤，所以還是要做好顯式型別轉換，避免依賴自動轉型
  // req.params：抓網址裡的路徑參數
  const userId = Number.parseInt(req.params.id);
  // 比對 users 裡面 有沒有這個 id
  // findIndex() 會遍歷 users 陣列，對每一個 user 物件進行這個檢查，如果 user.id === userId 為 true，就會返回該使用者的索引；如果沒有任何使用者符合條件，就會返回 -1。
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "找不到該使用者" });
  }
  // 有找到的話，繼續執行下面
  users[userIndex] = {
    ...users[userIndex], // 在物件中，使用...擴展運算符可以複製原有物件的所有屬性，這樣可以保留原本的資料先取得 users[userIndex] 中的所有屬性。這裡使用擴展運算符來複製 users[userIndex] 物件中的所有屬性。這樣保證了其他屬性（id 和 name）不會丟失
    phone: req.body.phone, // 更新 phone 屬性
  };

  res.json({
    message: "使用者已更新",
    user: users[userIndex], // 回傳更新的內容
  });
});

// DELETE 刪除 和 PUT 很像，要找到使用者的 id 後才可刪除
app.delete("/api/users/:id", (req, res) => {
  const userId = Number.parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "找不到該使用者" });
  }

  users.splice(userIndex, 1); // 刪除使用者資料
  res.json({ message: `使用者 ${userId} 已刪除` });
});

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
});
