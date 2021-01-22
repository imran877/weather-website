const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const app = express();
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));
//paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//static directory path
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Imran Hossain",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Done by some",
    name: "Imran Hossain",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help page",
    title: "Help page",
    name: "Imran Hossain",
  });
});
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send({
//         name:"Andrew",
//         age:10
//     })
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>Page title</h1>')
// })
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  // res.send({
  //   forecast: "snow",
  //   location: "Philadelphia",
  //   address: req.query.address,
  // });
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Andrew",
    title: "404",
    errorMessage: "Help page not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    name: "Andrew",
    title: "404",
    errorMessage: "Page not found!",
  });
});
app.listen(3000, () => {
  console.log("Server is up and running!");
});
