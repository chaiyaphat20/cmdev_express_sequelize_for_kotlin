const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());

//Get Product All
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

//Get Product By Id
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

//Create Product
app.post("/product", async (req, res) => {
  try {
    const result = await db.Products.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Product By Id
app.put("/product/:id", async (req, res) => {
  try {
    //find Product by ID
    const result = await db.Products.findOne({
      where: { id: req.params.id },
    });
    if (!result) {
      return res.status(404).json({ msg: "Product No found" });
    }
    const response = await db.Products.update(req.body, {
      where: { id: result.id },
    });
    if (response[0] > 0) {
      const updateProduct = await db.Products.findByPk(result.id);
      res.status(200).json(updateProduct);
    } else {
      throw new Error("Update Product Failure!!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/`);
});
