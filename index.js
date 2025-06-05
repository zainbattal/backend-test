require("dotenv").config();
let express = require("express");
let app = express();
let cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;

const query = `CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(50)
    );`;

app.use(
  cors({
    origin: ["https://deploy-one-lilac.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// add a name

app.post("/", async (req, res) => {
  try {
    const { inputValue } = req.body;
    const newName = await pool.query("INSERT INTO names (name) VALUES($1)", [
      inputValue,
    ]);
    console.log("name added!");
  } catch (error) {
    console.error(error);
  }
  res.send("");
});

// get names

app.get("/names", async (req, res) => {
  const names = await pool.query("SELECT * FROM names");
  res.json(names.rows);
});

app.get("/test-db-connection", async (req, res) => {
  try {
    const result = await pool.query("CREATE TABLE names");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    res.send(err);
  }
});

app.get("/create", async (req, res) => {
  try {
    const result = await pool.query(query);
    console.log("table created");
    res.send("");
  } catch (error) {
    console.log("table not created");
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
