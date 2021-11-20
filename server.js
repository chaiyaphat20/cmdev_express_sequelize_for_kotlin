const express = require("express");
const app = express();

app.use(express.json());

app.get("/product", (req, res) => {
  res.status(200).json({ result: "[GET]" });
});

app.get("/product/:id", (req, res) => {
  res.status(200).json({ result: `[GET] id: ${req.params.id}` });
});

app.post("/product", (req, res) => {
  res.status(200).json({ result: `[POST]  ${JSON.stringify(req.body)}` });
});

app.put("/product/:id", (req, res) => {
  res
    .status(200)
    .json({
      result: `[PUT] id: ${req.params.id} , ${JSON.stringify(req.body)}`,
    });
});

app.delete("/product/:id", (req, res) => {
  res.status(200).json({ result: `[DELETE] id: ${req.params.id} ` });
});

const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/`);
});
