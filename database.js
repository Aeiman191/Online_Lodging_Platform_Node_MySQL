var express = require("express");
const mysql= require("mysql");
var app = express();
// Database

// create connection

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"dbproject",
    port:"3306",
    multipleStatements:true

});


// Connect to Mysql

db.connect((err) => {
    if(err) {
        // console.log("connection failed");
        // console.log(err)
        throw err;
    }
    console.log('MySQL Connected');
    // else {
    //     console.log('connection successful');
    // }
});



//drop database
// app.get("/dropdb", (req, res) =>  {
//     var sql = "DROP SCHEMA dbproject";
//     db.query(sql, err => {
//       if (err) {
//           throw err;
//       }
//       res.send("Database Dropped")
//     });
//   });

// create database

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE dbproject";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Database Created");
    });
});

//create table customer

app.get("/createcustomer", (req, res) => {
    let sql = "CREATE TABLE  CUSTOMERS(cust_id int Auto_INCREMENT, first_name varchar(255) NOT NULL, last_name varchar(255), email varchar(255) unique NOT NULL, phone varchar(255) unique NOT NULL, password varchar(255), PRIMARY KEY(cust_id) )";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Customer Table Created");
    });
});

//create table place

app.get("/createplace", (req, res) => {
    let sql = "CREATE TABLE  PLACES(place_id int Auto_INCREMENT, name varchar(255) NOT NULL, property_type varchar(255) NOT NULL, space_type varchar(255), num_guests int NOT NULL, price int NOT NULL, num_beds int, num_baths int, postal_code int, province varchar(255) NOT NULL, country varchar(255) NOT NULL, city varchar(255) NOT NULL, region text, owner_id int NOT NULL, PRIMARY KEY(place_id), FOREIGN KEY (owner_id) REFERENCES CUSTOMERS(cust_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Place Table Created");
    });
});

//create table reservation

app.get("/createreserves", (req, res) => {
    let sql = "CREATE TABLE  RESERVES(serial_no int Auto_INCREMENT, cust_id int, place_id int, num_guests int, num_nights int, status varchar(255), checkin_date date, checkout_date date, PRIMARY KEY(serial_no, cust_id, place_id), FOREIGN KEY (cust_id) REFERENCES CUSTOMERS(cust_id), FOREIGN KEY (place_id) REFERENCES PLACES(place_id) )";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Reserves Table Created");
    });
});


//create table reviews

app.get("/createreviews", (req, res) => {
    let sql = "CREATE TABLE  REVIEWS(serial_no int Auto_INCREMENT, cust_id int, place_id int, review blob NOT NULL, PRIMARY KEY(serial_no, cust_id, place_id), FOREIGN KEY (cust_id) REFERENCES CUSTOMERS(cust_id), FOREIGN KEY (place_id) REFERENCES PLACES(place_id) )";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Reviews Table Created");
    });
});


//create table wishlist

app.get("/createwishlist", (req, res) => {
    let sql = "CREATE TABLE  WISHLISTS(cust_id int, place_id int, place_name varchar(255), PRIMARY KEY(cust_id, place_id), FOREIGN KEY (cust_id) REFERENCES CUSTOMERS(cust_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Wishlist Table Created");
    });
});


//create table Anemeties

app.get("/createanemeties", (req, res) => {
    let sql = "CREATE TABLE  ANEMETIES(place_id int, anemety varchar(255), PRIMARY KEY(place_id, anemety), FOREIGN KEY (place_id) REFERENCES PLACES(place_id))";
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send("Anemeties Table Created");
    });
});


// insert customer

// app.get("/customer", (req, res) => {
//     let sql = "INSERT INTO customer (first_name, last_name, email, phone, password) VALUES ('sana','fatima','sanafatima@gmail.com','01234567','sanafatima')";
//     db.query(sql, err => {
//         if(err) {
//             throw err;
//         }
//         res.send("Data Added in Customer");
//     });
// });




 module.exports = db;
 module.exports = app;




