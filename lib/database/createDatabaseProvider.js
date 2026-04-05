const MongoDBProvider = require("./MongoDBProvider");
const SupabaseProvider = require("./SupabaseProvider");

function createDatabaseProvider() {
  const dbType = (process.env.DB_TYPE || "").toLowerCase();

  if (dbType === "mongodb") {
    return new MongoDBProvider();
  }

  if (dbType === "supabase") {
    return new SupabaseProvider();
  }

  throw new Error("DB_TYPE must be 'mongodb' or 'supabase'");
}

module.exports = createDatabaseProvider;
