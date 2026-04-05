const TODO_TABLE = "todos";

function mapSupabaseTodo(row) {
  if (!row) return null;
  return {
    id: row.id,
    text: row.text,
    completed: row.completed,
    createdAt: row.created_at,
  };
}

module.exports = {
  TODO_TABLE,
  mapSupabaseTodo,
};
