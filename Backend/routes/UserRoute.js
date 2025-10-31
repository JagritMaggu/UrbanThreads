const express = require("express");
const {signup,login,logout} = require("../controllers/auth.js")
const checkAuth = require("../middlewares/checkAuth.js")
const {fetchUser} =require("../controllers/fetchuser.js")
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getUser", checkAuth, fetchUser)

module.exports = router;