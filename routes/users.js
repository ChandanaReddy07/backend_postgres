var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET home page. */

// app.get("/product", async (req, res) => {
//   try {
//     const allprod = await db.query("SELECT * FROM product");   
//     res.json(allprod);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
// app.post("/prod",async(req,res)=>{
//     try {
//         console.log("body",req.body);
//         const {decs}=req.body
//     } catch (err) {
//         console.error(err.message);
//     }
// })
// app.post("/todos", async (req, res) => {
//     try {
//       const { description } = req.body;
//       const newTodo = await db.query(
//         "INSERT INTO todo (description) VALUES($1) RETURNING *",
//         [description]
//       );
  
//       res.json(newTodo.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
router.post("/user",async(req,res)=>{
    const {user_description}=req.body;
    try {

         // create new user
         const newUser = await new User({
           
          user_description: user_description
          
        });

        // save user
        const savedUser = await newUser.save();
        console.log("created one",newUser);
        res.json(savedUser);

    } catch (err) {
        console.error(err.message)
    }

})
// router.get("/user/:id",async(req,res)=>{
//     try {
//         const allProd=await User.findOne({where :{}});
//         res.json(allProd)
//     } catch (err) {
//         console.error(err.message)
//     }

// })


module.exports = router;

