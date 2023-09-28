const router = require("express").Router();
const authRouter = require("../modules/auth/auth.route");
const userRouter = require("../modules/users/user.route");

router.get("/", (req, res, next) => {
  res.json({ data: "", msg: "API Routes are working" });
});

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.all("*", () => {
  try {
    res.json({ data: "", msg: "Router are not defined" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
