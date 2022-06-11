const express = require("express");
const app = express();
const _ = require("lodash");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = [];

const homeStartingContent =
  "Inceptos aliquam, lacinia at dictumst est. Ornare accumsan per non, urna dapibus morbi, mattis eros himenaeos suscipit lorem nullam molestie bibendum. Nisi odio phasellus, nec suspendisse augue praesent auctor. Bibendum mollis neque orci, quis sagittis sapien, scelerisque consequat tellus donec ut posuere turpis. Congue torquent platea ut, nullam ligula class, aliquet leo nunc suscipit mi nam. Dui facilisis interdum, rhoncus sollicitudin, molestie sapien justo suspendisse mi cubilia.";
const aboutContent =
  "Class rutrum, mattis lacus aliquam nunc. Tempor dolor pulvinar per, curabitur malesuada vivamus, platea venenatis suspendisse fermentum scelerisque suscipit vulputate. Aenean lacus, iaculis feugiat nisl vestibulum. Leo aliquet vulputate pellentesque, condimentum iaculis molestie, quisque morbi aliquam primis consequat eu aenean scelerisque. Senectus eros quam, nulla vehicula, tortor lectus viverra aptent condimentum curabitur felis. Torquent maecenas quisque, dictum hendrerit a nulla venenatis. Ultrices purus himenaeos, arcu venenatis quam risus sed. Adipiscing litora nulla, odio vehicula, a aptent nisl augue laoreet commodo rutrum.";
const contactContent =
  "Odio phasellus adipiscing ipsum, augue porttitor aliquam imperdiet morbi. Libero cubilia, vivamus nunc suspendisse. Scelerisque id habitasse, lacinia pellentesque, auctor augue in vestibulum interdum dictumst massa. Vel ultricies scelerisque suscipit, donec lacus in curabitur a. Proin turpis nisl, metus ipsum aliquet quisque aliquam.";

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
