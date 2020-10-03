const express = require("express");
const burger = require("../models/burger.js");
const router = espress.Router();

// create router for the app
router.get("/", function(req, res){
   burger.all(function(data){
      let hbsObject = {
         cats: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
   });
});
router.post("/api/burgers", functin (req, res) {
   burger.create(["burger_name", "devoured"])
})


module.exports = router;