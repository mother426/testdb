const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

// app.get("/articles", (req, res) => {
//   Article.find((err, results) => {
//     if (!err) {
//       res.send(results);
//     } else {
//       res.send(err);
//     }
//   });
// });

// app.post("/articles", (req, res) => {
//   console.log(req.body.title);
//   console.log(req.body.content);

//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content,
//   });

//   newArticle.save((err) => {
//     res.send(err);
//   });
// });

// app.delete("/articles", (req, res) => {
//   Article.deleteMany((err)=>{
//     if(!err){
//       res.send("Deleted all articles");
//     } else {
//       res.send(err);
//     };
//   });
// });

app.route("/articles")
  .get((req, res) => {
    Article.find((err, results) => {
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      res.send(err);
    });
  })

  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Deleted all articles");
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
