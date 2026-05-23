const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

// ================== DB CONNECTION (DIRECT STRICT INTERNET FIX) ==================
mongoose.connect(
  "mongodb://chatterjeeashmita25_db_user:2De8zRZAJJvUUVC4@cluster0-shard-00-00.volomoo.mongodb.net:27017,cluster0-shard-00-01.volomoo.mongodb.net:27017,cluster0-shard-00-02.volomoo.mongodb.net:27017/habitDB?ssl=true&replicaSet=atlas-m4v00b-shard-0&authSource=admin&retryWrites=true&w=majority"
)
  .then(() => console.log("MongoDB connected successfully ✅"))
  .catch(err => console.log("MongoDB connection error ❌:", err));

// ================== USER AUTH ==================

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all fields: name, email, password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already registered! Please Login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup Database Error:", err);
    res.status(500).json({ error: `Database Error: ${err.message}` });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
});

// LOGOUT
app.post("/logout", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const verified = jwt.verify(token, SECRET);
    const user = await User.findById(verified.id);
    if (!user) return res.status(400).json({ error: "User not found" });

    user.lastLogout = new Date();
    await user.save();

    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: "Logout error" });
  }
});

// ================== AUTH MIDDLEWARE ==================
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};

// ================== PROFILE ROUTES ==================

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/upload-profile-pic", authMiddleware, async (req, res) => {
  try {
    const { image } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: image },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/update-bio", authMiddleware, async (req, res) => {
  try {
    const { bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ================== HABIT MODEL ==================
const habitSchema = new mongoose.Schema({
  name: String,
  streak: { type: Number, default: 0 },
  dates: { type: Object, default: {} },
  lastCompleted: String,
  userId: String
});

const Habit = mongoose.model("Habit", habitSchema);

const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

// ================== HABIT ROUTES ==================

app.get("/", authMiddleware, async (req, res) => {
  const habits = await Habit.find({ userId: req.user.id });
  res.send(habits);
});

app.post("/add", authMiddleware, async (req, res) => {
  const habit = new Habit({ name: req.body.name, userId: req.user.id });
  await habit.save();
  res.send(habit);
});

app.post("/complete/:id", authMiddleware, async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));

  habit.dates[today] = (habit.dates[today] || 0) + 1;

  if (habit.lastCompleted === yesterday) habit.streak += 1;
  else if (habit.lastCompleted !== today) habit.streak = 1;

  habit.lastCompleted = today;
  await habit.save();
  res.send(habit);
});

app.delete("/delete/:id", authMiddleware, async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
});

// ================== LIVE SERVER PORT ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));