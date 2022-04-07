const router = require("express").Router();
const {registerNewUser,login} = require('../controllers/authController')

router.post("/register", registerNewUser)
router.post("/login",login)

module.exports = router;
