const router = require("express").Router();
const userRouter = require("../modules/users/user.api");

router.get("/", (req, res, next) => {
  res.json({ data: "", msg: "API Routes are working" });
});

router.use("/users", userRouter);

router.all("*", () => {
  try {
    res.json({ data: "", msg: "Router are not defined" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
