const { register, login, logout, resetPassword } = require("../controller/user.controller");

const auth = require("../middleware/auth.middleware");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", auth, logout);

router.get("/me", auth, async (req, res) => {
  try {
    // Assuming the user's name is part of the decoded token or retrieved from the database
    const userName = req.user.name; // Access the name from the decoded token

    if (!userName) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: userName });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset", resetPassword);

module.exports = router;
