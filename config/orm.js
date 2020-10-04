const connection = require("./connection.js");

// helper function for SQL syntax
function printQuestionMarks(num) {
   var arr = [];
 
   for (var i = 0; i < num; i++) {
     arr.push("?");
   }
 
   return arr.toString();
 }
 
 // Helper function to convert object key/value pairs to SQL syntax
 function objToSql(ob) {
   var arr = [];
 
   // loop through the keys and push the key/value as a string int arr
   for (var key in ob) {
     var value = ob[key];
     // check to skip hidden properties
     if (Object.hasOwnProperty.call(ob, key)) {
       if (typeof value === "string" && value.indexOf(" ") >= 0) {
         value = "'" + value + "'";
       }
       arr.push(key + "=" + value);
     }
   }
   return arr.toString();
 }

const orm = {
// method to all
   all: function(tableInput, cb) {
      let queryString = `SELECT * FROM ${tableInput}`;
      connection.query(queryString, function(err, res) { 
         if (err) {
            throw err;
         }
         cb(res);
      });
   },

// method to create
   create: function(table, cols, vals, cb) {
      let queryString = `INSERT INTO ${table}`;

      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";

      console.log(queryString);

      connection.query(queryString, vals, function (err, res){
         if (err) {
            throw err;
         }
         cb(res);
      });
   },

// method to update
   update: function(table, objColVals, condition, cb) {
      let queryString = `UPDATE ${table}`;

      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);
      connection.query(queryString, function(err, result) {
         if (err) {
         throw err;
         }

         cb(result);
      });
   },

   // method to delete
   delete: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
};

module.exports = orm;