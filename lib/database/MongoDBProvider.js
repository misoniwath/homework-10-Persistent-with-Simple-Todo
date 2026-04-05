const mongoose = require("mongoose");
const DatabaseProvider = require("./DatabaseProvider");
const { Todo } = require("./models/mongoModels");

class MongoDBProvider extends DatabaseProvider {
  constructor() {
    super();
    this.mongoUri = process.env.MONGO_URI;
  }

  async init() {
    if (!this.mongoUri) {
      throw new Error("MONGO_URI is not set");
    }
    await mongoose.connect(this.mongoUri);
  }

  async getTodos() {
    const todos = await Todo.find().sort({ createdAt: -1 }).lean();
    return todos.map((todo) => ({
      id: todo._id.toString(),
      text: todo.text,
      completed: todo.completed,
      createdAt: todo.createdAt,
    }));
  }

  async createTodo(todo) {
    const created = await Todo.create({
      text: todo.text,
      completed: false,
    });
    return {
      id: created._id.toString(),
      text: created.text,
      completed: created.completed,
      createdAt: created.createdAt,
    };
  }

  async updateTodo(id, updates) {
    await Todo.updateOne({ _id: id }, { $set: updates });
  }

  async toggleTodo(id) {
    const todo = await Todo.findById(id);
    if (!todo) return;
    todo.completed = !todo.completed;
    await todo.save();
  }

  async deleteTodo(id) {
    await Todo.deleteOne({ _id: id });
  }
}

module.exports = MongoDBProvider;
