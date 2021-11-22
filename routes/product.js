var express = require("express");
const DeletedProduct = require("../models/deletedItems");

const Product = require("../models/product");
var router = express.Router();

/* GET home page. */

//create product
router.post("/product", async (req, res) => {
  const { item_name, stock, price, category } = req.body;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var charactersLength = characters.length;
  for (var i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  try {
    // create new user
    const newProd = await new Product({
      item_name: item_name,
      bar_code: result,
      price: price,
      stock: stock,
      category: category,
    });

    // save user
    const savedProd = await newProd.save();
    console.log("created one", newProd);
    res.json(savedProd);
  } catch (err) {
    console.error(err.message);
  }
});

//getting by id
router.get("/product/:id", async (req, res) => {
  try {
    const allProd = await Product.findOne({
      where: { bar_code: req.params.id },
    });
    res.json(allProd);
  } catch (err) {
    console.error(err.message);
  }
});

//all products
router.get("/products", async (req, res) => {
  try {
    const allProd = await Product.findAll();

    res.json(
      allProd.map((item, index) => {
        return item;
      })
    );
  } catch (err) {
    console.error(err.message);
  }
});

//delete
router.delete("/product/:id", async (req, res) => {
  try {
    const Prod = await Product.findOne({
      where: { bar_code: req.params.id },
    });
    const newProd = await new DeletedProduct({
      item_name: Prod.item_name,
      bar_code: Prod.bar_code,
      price: Prod.price,
      stock: Prod.stock,
      category: Prod.category,
    });

    // save user
    const savedProd = await newProd.save();

    await Product.destroy({
      where: {
        bar_code: req.params.id,
      },
    });

    return res.json({
      savedProd,
    });

    // return res.status(200).json({
    //     message: "todo deleted!",
    // });
  } catch (err) {
    console.error(err.message);
  }
});

//decr
router.put("/decproduct/:id", async (req, res) => {
  const Prod = await Product.findOne({
    where: { bar_code: req.params.id },
  });

 // res.json(Prod)

  try {
    if (
      Prod.stock > 1 &&
      (await Product.update(
        {
          stock: Prod.stock - 1
        },
        { where: { bar_code: req.params.id } }
      ))    

    ) {
      const newProd = await new DeletedProduct({
        item_name: Prod.item_name,
        bar_code: Prod.bar_code,
        price: Prod.price,
        stock: Prod.stock,
        category: Prod.category,
      });
  
      // save deleted user
      const savedProd = await newProd.save();
      return res.status(200).json({
        message: "Product decremented",
      });
    } else {
      if (Prod.stock == 1) {

        await Product.destroy({
          where: {
            bar_code: req.params.id,
          },
        });
        return res.status(200).json({
          message: "Product out of stock",
        });

      } else {
        return res.status(404).json({
          message: "invalid request",
        });
      }
    }
  } catch (err) {
    return res.status(404).json({
      message: "Product not found or the Product does not belong to you!",
     
    });
  }
});

//update
router.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const { item_name, stock, price, category } = req.body;

  try {
    if (
      await Product.update(
        {
          item_name: item_name,
          price: price,
          stock: stock,
          category: category,
        },
        { where: { bar_code: id } }
      )
    ) {
      return res.status(200).json({
        message: "Product updated",
      });
    } else {
      return res.status(404).json({
        message: "invalid request",
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: "Product not found or the Product does not belong to you!",
      err,
    });
  }
});

module.exports = router;
