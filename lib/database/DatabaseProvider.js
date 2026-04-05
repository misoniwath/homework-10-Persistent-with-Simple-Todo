class DatabaseProvider {
  async init() {
    throw new Error("init() not implemented");
  }

  async getTodos() {
    throw new Error("getTodos() not implemented");
  }

  async createTodo(todo) {
    throw new Error("createTodo() not implemented");
  }

  async updateTodo(id, updates) {
    throw new Error("updateTodo() not implemented");
  }

  async toggleTodo(id) {
    throw new Error("toggleTodo() not implemented");
  }

  async deleteTodo(id) {
    throw new Error("deleteTodo() not implemented");
  }
}

module.exports = DatabaseProvider;
