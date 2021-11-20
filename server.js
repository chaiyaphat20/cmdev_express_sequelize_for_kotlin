const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());

app.get("/product", async (req, res) => {
  try {
    const result = await db.Products.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const result = await db.Products.findOne({
      where: { id: req.params.id },
      order: [["id", "DESC"]],
    });
    if (!result) {
      return res.status(404).json({ msg: "Product No found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  res.status(200).json({ result: `[POST]  ${JSON.stringify(req.body)}` });
});

app.put("/product/:id", async (req, res) => {
  res.status(200).json({
    result: `[PUT] id: ${req.params.id} , ${JSON.stringify(req.body)}`,
  });
});

app.delete("/product/:id", async (req, res) => {
  try {
    const result = await db.Products.findOne({
      where: { id: req.params.id },
      order: [["id", "DESC"]],
    });
    if (!result) {
      return res.status(404).json({ msg: "product No found" });
    }

    await db.Products.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/`);
});
