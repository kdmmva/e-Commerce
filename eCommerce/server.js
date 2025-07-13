import bodyParser from "body-parser";
import crypto from "crypto";
import fs from "fs";
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "db.json");
const initialData = { users: [] };
fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
console.log("⚠️ db.json rewritten to initial state");

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = crypto.randomBytes(16).toString("hex");
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

server.post("/register", (req, res) => {
  const { firstname, lastname, nickname, email, password } = req.body;

  const users = router.db.get("users").value();
  const exists = users.some((u) => u.email === email);

  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    firstname,
    lastname,
    nickname,
    email,
    password,
  };

  router.db.get("users").push(newUser).write();
  const token = crypto.randomBytes(16).toString("hex");

  return res.status(201).json({ token, user: newUser });
});

server.post("/purchase", (req, res) => {
  const { userId, cartItems } = req.body;

  if (!userId || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const db = router.db;
  const users = db.get("users").value();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder = {
    id: crypto.randomUUID(),
    items: cartItems.map((item) => ({
      ...item,
      image: typeof item.image === "string" ? item.image : "image-placeholder.jpg",
    })),
    total,
    date: new Date().toISOString(),
  };

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(newOrder);
  db.get("users")
    .find({ id: userId })
    .assign({ orders: user.orders })
    .write();

  res.status(201).json({ success: true, order: newOrder });
});


server.use(router);

server.listen(3001, () => {
  console.log("✅ JSON Server is running");
});
