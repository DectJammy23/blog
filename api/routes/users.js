const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");



//GET STAFF
router.get("/getStaff", (req,res)=>{
  User.find({isStaff: true})
      .then(result=>{
        res.status(200).json(result)
      })
      .catch(err=>{
        res.status(500).json(err)
      })     
})

router.put("/addAsStaff/:id", (req, res)=>{
  User.findByIdAndUpdate(req.params.id,{isStaff: true})
      .then(res=>res.status(200).json(result))
      .catch(err=>res.status(500).json(err))
})

//GET ALL BUT STAFF
router.get("/getAllButStaff", (req,res)=>{
  User.find({isStaff: false, isAdmin: false})
      .then(result=>res.status(200).json(result))
      .catch(err=>{
        console.log(err)
        res.status(500).json(err)})
})

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
