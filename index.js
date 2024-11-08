import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "demo1",
    password: "qwertyuiop",
    port: 5432,
  });
  db.connect();




const port=3000;
const app= express();
app.use(bodyParser.urlencoded({ limit:'10mb',extended: true }));//limit
app.use(express.static("public"));
app.use(express.json({limit:'10mb'}));
let val = [];
app.get("/", (req, res) => {
    db.query("SELECT * FROM blogs", (err, queryRes) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Database error");
        }

        val = queryRes.rows;  // Assign query result to `val`
        // console.log(val[0].pic);  // Log data after assignment
        res.render("index.ejs", { data: val });  // Pass `val` to the template
    });
});

app.post("/submit",(req,res)=>{
    db.query("INSERT into blogs (name,pic,description) values($1,$2,$3)",[req.body.name,req.body.data,req.body.descrip]);
});
app.listen(port,()=>{
    console.log("port is running");
})