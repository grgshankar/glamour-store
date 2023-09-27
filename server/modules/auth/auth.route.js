const router = require("express").Router();
const Controller = require("../users/user.controllers");

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await Controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or Password is missing");
    }
    const result = await Controller.login(email.trim(), password.trim());
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
