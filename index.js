require("dotenv").config();
let express = require("express");
let app = express();
let cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "https://deploy-one-lilac.vercel.app" }));
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

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
