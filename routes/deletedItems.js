var express = require("express");
const DeletedProduct = require("../models/deletedItems");
var router = express.Router();

/* GET home page. */



//getting by id
router.get("/deleteproduct/:id", async (req, res) => {
  try {
    const allProd = await DeletedProduct.findOne({
      where: { bar_code: req.params.id },
    });
    res.json(allProd);
  } catch (err) {
    console.error(err.message);
  }
});




//all products
router.get("/deleteproducts", async (req, res) => {
  try {
    const allProd = await DeletedProduct.findAll();

    res.json(
      allProd.map((item, index) => {
        return item;
      })
    );
  } catch (err) {
    console.error(err.message);
  }
});


//update

module.exports = router;
