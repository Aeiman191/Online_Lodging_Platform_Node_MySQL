var express = require("express");

var router = express.Router();
const mysql = require("mysql");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "dbproject",
    port: "3306",
    multipleStatements: true
});

router.get("/", function(req, res) {
    console.log("Hello I am the starting page")

    res.render("Home");
});

router.get("/login", function(req, res) {
    console.log("Login page")
    res.render("login");
});

router.get("/signup", function(req, res) {
    console.log("signup page")
    res.render("signup");
});
// router.get("/accounts", function(req, res) {
//     console.log("accounts page")
//     res.render("accounts");
// });

router.get("/userprofile", function(req, res) {
    var gphone = global.gphone;
    if (gphone == null) {
        return res.render('login');
    }

    var sql = "SELECT * FROM customers WHERE phone= ?";
    db.query(sql, [gphone], function(err, result, fields) {
        return res.render('userprofile', { data: result });

    });
});

router.get("/hostuserprofile", function(req, res) {
    var gphone = global.gphone;
    if (gphone == null) {
        return res.render('login');
    }

    var sql = "SELECT * FROM customers WHERE phone= ?";
    db.query(sql, [gphone], function(err, result, fields) {
        return res.render('hostuserprofile', { data: result });

    });
});

// router.get("/host", function(req, res) {
//     console.log("host page")
//     res.render("host");
// });


router.get("/host", function(req, res) {
    console.log("host page")
    res.render("hosts");
});

router.get("/guests", function(req, res) {
    console.log("guest page")
    res.render("guests");
});

router.get("/logout", function(req, res) {
    console.log("logging out")
    res.render("login");
});


router.get("/switch", function(req, res) {
    console.log("change mode")
    res.render("switchmodule");
});

router.get("/updateprofile", function(req, res) {
    console.log("update profile")
    res.render("updateprofile");
});

// router.get("/search", function(req, res) {
//     console.log("search results")
//     res.render("filter");
// });


router.get("/filter", function(req, res) {
    console.log("filter")
    res.render("filter");
});


router.get("/places", function(req, res) {
    console.log("filtered results")
    res.render("places");
});

router.get("/searchedplaces", function(req, res) {
    console.log("searched results")
    res.render("searchedplaces");
});


router.get("/reservations", function(req, res) {
    console.log("see reservations")
    res.render("reservations");
});


// router.get("/book", function(req, res) {
//     console.log("BOOKING++");
// });

router.get("/updatePlaces", function(req, res) {
    var gphone = global.gphone;
    if (gphone == null) {
        return res.render('login');
    }

    var sql = "SELECT cust_id FROM customers WHERE phone= ?";
    db.query(sql, [gphone], function(err, row) {
        var id = Object.values(row[0])
        id = parseInt(id[0]);
        var sql = "SELECT * FROM places WHERE owner_id= ?";
        db.query(sql, [id], function(err, result, fields) {
            console.log(result)
            return res.render('updatePlaces', { data: result });

        });
    });
});
router.get("/updatePlacesForm", function(req, res) {
    console.log("Update places form ")
        console.log({params:{id:req.query.id}})
    const { id } = req.params;
    res.render("updatePlacesForm");
});
module.exports = router;