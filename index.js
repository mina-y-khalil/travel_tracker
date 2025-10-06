import express from "express";
import bodyParser from "body-parser";
import PG from "pg";


const app = express();
const port = 3000;


const db = new PG.Client({   
  user : "postgres", // change this to your own user
  host : "localhost",
  database : "world", // don't forget to create the database first and change the name if needed
  password : "password", // change this to your own password
  port : 5432,
});  

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const results = await db.query("SELECT * FROM visited_countries");
  let countries = []
  results.rows.forEach(row => countries.push(row.country_code));
  console.log(results.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
