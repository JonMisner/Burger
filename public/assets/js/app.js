
$(function() {

   // Update Status
   $(".change-devoured").on("click", function(event) {
     let id = $(this).data("id");
     let newDevoured = $(this).data("newdevoured");

 
     let devouredState = {
       devoured: newDevoured
     };
 
     $.ajax("/api/burgers/" + id, {
       type: "PUT",
       data: devouredState
     }).then(
       function() {
         console.log("changed to", newDevoured);
         location.reload();
       }
     );
   });
 
   // POST request.
   $(".create-form").on("submit", function(event) {
     event.preventDefault();
 
     let newBurger = {
       burger_name: $("#bu").val().trim(),
       devoured: $("[name=devoured]:checked").val().trim(),
     };
 
     $.ajax("/api/burgers", {
       type: "POST",
       data: newBurger
     }).then(function() {
         console.log("posted a new burger");
         location.reload();
       }
     );
   });

   //DELETE request.
   $(".delete-burger").on("click", function(event) {
       let id = $(this).data("id");
   
       $.ajax("/api/burgers/" + id, {
         type: "DELETE"
       }).then(function() {
           console.log("goodbye burger", id);
           location.reload();
         }
       );
     });
   });