const router = require("express").Router();
const Controller = require("./auth.controller");

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

router.post("/verify", async (req, res, next) => {
  try {
    const { email, token } = req.body;
    if (!email || !token) {
      throw new Error("Email or token is missing");
    }
    const result = await Controller.verifyEmail(email.trim(), token);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.post("/regenerate", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Email is missing");
    }
    const result = await Controller.regenarateToken(email);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
