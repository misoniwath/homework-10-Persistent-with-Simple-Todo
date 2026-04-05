const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
require("dotenv").config();

const createDatabaseProvider = require("./lib/database/createDatabaseProvider");

const app = express();
const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    helpers: {
      ifEq: (a, b, options) =>
        a === b ? options.fn(this) : options.inverse(this),
    },
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let dbProvider;

app.get("/", async (req, res) => {
  try {
    const todos = await dbProvider.getTodos();
    res.render("index", { todos });
  } catch (error) {
    res.status(500).send("Failed to load todos.");
  }
});

app.post("/todos", async (req, res) => {
  const text = (req.body.text || "").trim();
  if (!text) {
    return res.redirect("/");
  }
  try {
    await dbProvider.createTodo({ text });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to create todo.");
  }
});

app.post("/todos/:id/toggle", async (req, res) => {
  try {
    await dbProvider.toggleTodo(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to update todo.");
  }
});

app.post("/todos/:id/update", async (req, res) => {
  const text = (req.body.text || "").trim();
  if (!text) {
    return res.redirect("/");
  }
  try {
    await dbProvider.updateTodo(req.params.id, { text });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to update todo.");
  }
});

app.post("/todos/:id/delete", async (req, res) => {
  try {
    await dbProvider.deleteTodo(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to delete todo.");
  }
});

async function start() {
  dbProvider = createDatabaseProvider();
  await dbProvider.init();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start application", error);
  process.exit(1);
});
