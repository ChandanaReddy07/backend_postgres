var express = require('express');
const Todo = require('../models/todo');
var router = express.Router();

/* GET home page. */


router.get("/", (req, res) => {
  res.status(200).send("helloo there !");
});
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
router.post("/todo",async(req,res)=>{
    const {todo_id,description}=req.body;
    try {

         // create new user
         const newUser = await new Todo({
            todo_id: todo_id,
            description: description
          
        });

        // save user
        const savedUser = await newUser.save();
        console.log("created one",newUser);
        res.json(savedUser);
    } catch (err) {
        console.error(err.message)
    }

})
router.get("/todo/:id",async(req,res)=>{
    try {
        const allProd=await Todo.findOne({where :{todo_id:req.params.id}});
        res.json(allProd)
    } catch (err) {
        console.error(err.message)
    }

})


module.exports = router;
