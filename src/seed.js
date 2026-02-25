require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Task = require("./models/Task");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // clear existing data
  await User.deleteMany({});
  await Task.deleteMany({});

  // create demo user
  const user = await User.create({
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123456",
  });

  console.log("Created demo user (demo@example.com / demo123456)");

  // create sample tasks
  const tasks = [
    { title: "Setup project structure", status: "done", priority: "high", user: user._id },
    { title: "Implement user authentication", status: "done", priority: "high", user: user._id },
    { title: "Build task CRUD endpoints", status: "in_progress", priority: "high", user: user._id },
    { title: "Write API documentation", status: "in_progress", priority: "medium", user: user._id },
    { title: "Add input validation", status: "pending", priority: "medium", user: user._id },
    { title: "Deploy to production", status: "pending", priority: "low", user: user._id },
  ];

  await Task.insertMany(tasks);
  console.log(`Created ${tasks.length} sample tasks`);

  await mongoose.disconnect();
  console.log("Done!");
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
