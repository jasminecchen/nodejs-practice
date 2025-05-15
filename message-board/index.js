const express = require("express");
const app = express();
const port = 3000;

let messages = []; // DELETE 那邊會重新賦值一個新陣列，所以原本的 const 要改為 let

app.use(express.json());

// GET
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// POST
app.post("/api/messages", (req, res) => {
  const { content, author } = req.body;
  const newMessage = {
    id: Date.now().toString(), // 我原本寫的是 id: messages.length + 1,
    content,
    author,
    // content: req.body.content,
    // author: req.body.author,
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
  // res.status(201).json({
  //   message: "已新增一個留言",
  //   content: newMessage,
  // });
});

// PUT
app.put("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const messageIndex = messages.findIndex((msg) => msg.id === id);

  if (messageIndex === -1) {
    return res.status(404).json({ error: "查無此留言" });
  }

  messages[messageIndex] = {
    ...messages[messageIndex],
    content,
  };

  res.status(200).json(messages[messageIndex]);
  // const messageId = Number.parseInt(req.params.id);
  // const messageIndex = messages.findIndex((msg) => msg.id === messageId);

  // if (messageIndex === -1) {
  //   return res.status(404).json({ message: "查無此留言" });
  // }

  // messages[messageIndex] = {
  //   ...messages[messageIndex],
  //   content: req.body.content,
  //   author: req.body.author,
  // };

  // res.json({
  //   message: "留言已更新",
  //   content: messages[messageIndex],
  // });
});

// DELETE 待修改
app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const messageIndex = messages.findIndex((msg) => msg.id === id);

  if (messageIndex === -1) {
    return res.status(404).json({ error: "查無此留言" });
  }

  messages = messages.filter((msg => msg.id !== id) = {
    res.status(200).json({ message: `已成功刪除` });
  });
  
  res.status(200).json(messages[messageIndex]);
});
  app.listen(port, () => {
  console.log(`伺服器在http://localhost:${port}運行`);
});
