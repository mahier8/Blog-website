//jshint esversion:6

const express = require("express"); // setting up express
const bodyParser = require("body-parser");
const ejs = require("ejs"); // setting up ejs
const _ = require("lodash"); // setting up loadash

// storing the content in consts to use at a later stage below
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express(); // setting up express, which goes together with the above

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

 // an empty array was created to store our post
let posts = [];



 

app.get("/", function(req, res) {
  // what gets passed in is the key value pair of the startingContent from the
  // home.ejs file paragraph which is where we want it and the homeStartingContent 
  // at the top, whuich is what we want it to be
  res.render("home", { //******/ the "home" in this case refers to the page the we want to render
    startingContent: homeStartingContent,
    // posts was added as an object using key value pairs 
    // with posts as the key and the last posts as the value, 
    // taken from the empty array
    posts: posts
  });
});

app.get("/about", function(req, res) {
  // if you look above the, first route has a "/" sign while the one below
  // just points to the name of the page  
  res.render("about", {aboutDirect: aboutContent});
});

app.get("/contact", function(req, res) {
  // usually the names of the key value pairs are the same, following 
  // the industry standard. for example contactContent above and the one 
  // in the contact.ejs file
  res.render("contact", {contactContent: contactContent});
});

// rendering the page compose
app.get("/compose", function(req, res) {
  res.render("compose");
});



app.post("/compose", function(req, res) {
  // we created an object called post to store our other 
  // two objects postTitle and postBody
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  // we pushed the posts to the empty array called post
  posts.push(post);
  // we redirected back to our home route
  res.redirect("/");
});

// used route parameters here
app.get("/posts/:postName", function (req, res) {
  // store the function in a variable
  const requestedTitle = _.lowerCase(req.params.postName); // converting the const requestedTitle into all lowercase

  // used the forEach method to loop through all 
  // of the posts in the post array then each
  // post will be saved in a variable called storedTitle
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title); // converting the const storedTitle into all lowercase

    // checking via an if statement if the storedTitle
    // matches the requestedTitle
    if (storedTitle === requestedTitle) {
    //   // if so the console will say match found 
    //   console.log("Match found!");
    // } else {
    //   // if not the console will say not a match
    //   console.log("Not a match!");
      res.render("post", { // because we are in this function we use post again, with title and content
        title: post.title,
        content: post.content 
      });    

    }

  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});


