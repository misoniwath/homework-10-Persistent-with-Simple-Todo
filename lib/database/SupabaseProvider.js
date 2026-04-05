const { createClient } = require("@supabase/supabase-js");
const DatabaseProvider = require("./DatabaseProvider");
const { TODO_TABLE, mapSupabaseTodo } = require("./models/supabaseModels");

class SupabaseProvider extends DatabaseProvider {
  constructor() {
    super();
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
    if (this.supabaseUrl && this.supabaseKey) {
      this.client = createClient(this.supabaseUrl, this.supabaseKey);
    }
  }

  async init() {
    if (!this.client) {
      throw new Error("SUPABASE_URL or SUPABASE_KEY is not set");
    }
  }

  async getTodos() {
    const { data, error } = await this.client
      .from(TODO_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data || []).map(mapSupabaseTodo);
  }

  async createTodo(todo) {
    const { data, error } = await this.client
      .from(TODO_TABLE)
      .insert({
        text: todo.text,
        completed: false,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return mapSupabaseTodo(data);
  }

  async updateTodo(id, updates) {
    const { error } = await this.client
      .from(TODO_TABLE)
      .update({ text: updates.text })
      .eq("id", id);

    if (error) {
      throw error;
    }
  }

  async toggleTodo(id) {
    const { data, error } = await this.client
      .from(TODO_TABLE)
      .select("completed")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    const { error: updateError } = await this.client
      .from(TODO_TABLE)
      .update({ completed: !data.completed })
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }
  }

  async deleteTodo(id) {
    const { error } = await this.client.from(TODO_TABLE).delete().eq("id", id);

    if (error) {
      throw error;
    }
  }
}

module.exports = SupabaseProvider;
