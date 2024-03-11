const { results, max } = require("lodash");
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

exports.register = (req, res) => {
    console.log(req.body);

    const { f_name, l_name, number, email, password } = req.body;

    if(number.length<11){
        return res.render('signup', { message: "Email already exists" });
    };

    var sql = 'SELECT * FROM customers WHERE email =?';
    db.query(sql, [email], function(err, data) {
        if (err) throw err;
        if (data.length > 0) {
            return res.render('signup', { message: "Email already exists" });
        } else {

            var sql = `INSERT INTO customers (first_name,last_name,email,phone,password) VALUES ("${f_name}", "${l_name}", "${email}","${number}", "${password}")`;
            db.query(sql, function(err, result) {
                if (err) throw err;
                console.log('record inserted');
                return res.render('login');
            });
            // res.render('registrationform', { alertMsg: msg });
        };


    })
};



exports.login = (req, res) => {
    console.log(req.body);

    const { phone, password } = req.body;
    console.log(phone);
    console.log(password);

    var sql = 'SELECT * FROM customers WHERE phone = ? AND password = ?';
    db.query(sql, [phone, password],function(err, rows) {
        console.log(rows);
        if (err) throw err;
        if (rows.length <= 0) 
        {
            // console.log("my number is : ", phone);
            return res.render('login', { message: "Your Email Address or password is wrong" });
        }
         else
        { // if user found
            // render to views/index.ejs template file
            // console.log(rows);
                console.log(rows[0].phone)
                console.log(rows[0].password)
                if(phone === rows[0].phone && password === rows[0].password)
                {
                        // global.gphone=rows[0].phone;
                        req.session.loggedin = true;
                        req.session.phone = phone;
                        global.gphone=req.session.phone;
                        // console.log("my number is : ", global.gphone);
                        return res.render('guests');
                }
        }

        

    });
};

exports.list = (req,res) => {
    const anemeties = []
    console.log(req.body);
    var gphone=global.gphone;
    var sql = `select cust_id from customers where phone=?`;
    db.query(sql, [gphone], function(err, row){
        var id = Object.values(row[0])
        id = parseInt(id[0]);
        const { propertyName ,propertyType ,spaceType ,noGuests, numBeds, numBaths,Price,zipcode,country,city ,province,reigon, Amenities3, Amenities1, Amenities2} = req.body;
        anemeties.push(Amenities1);
        anemeties.push(Amenities2);
        anemeties.push(Amenities3);
            var sql = `INSERT INTO PLACES (name,property_type,space_type,num_guests,price,num_beds,num_baths,postal_code,province,country,city,region,owner_id) VALUES ("${propertyName}", "${propertyType}", "${spaceType}","${noGuests}", "${Price}","${numBeds}","${numBaths}","${zipcode}","${province}","${country}","${city}","${reigon}","${id}")`;
            db.query(sql, function(err, result) {
              if (err) throw err;
              console.log('record inserted');
        });

         var sql =`select place_id from places where name =? and property_type =? and space_type =? and num_guests=? and price=? and num_beds=? and num_baths=? and postal_code=? and province=? and country=? and city=? and region=? and owner_id=?`;
         db.query(sql, [propertyName ,propertyType ,spaceType ,noGuests, Price, numBeds, numBaths,zipcode, province, country,city ,reigon,id], function(err, result) {
            if (err) throw err;
            console.log(result);
            var place_id = Object.values(result[0])
            place_id = parseInt(place_id[0]);

            for (let x in anemeties) {
                var sql=`INSERT INTO anemeties (place_id, anemety) VALUES ("${place_id}", "${anemeties[x]}")`;
                db.query(sql, function(err, result) {
                    if (err) throw err;
                    console.log('record inserted');
                    
              });
              }
              return res.render('hosts');
        });

      
    
    
        
        });
        // res.render('registrationform', { alertMsg: msg });
};


exports.updateprofile = (req,res) => {
    console.log("updated info", req.body);
    const { firstname, lastname, pwsd, conpwsd} = req.body;
    console.log(firstname);
    // if(pwsd.length<=0)
    // {
    //     console.log("no change in password");
    // }

    var gphone = global.gphone;  
    var sql = "UPDATE customers set first_name =? , last_name =? , password =? WHERE phone = ?";
    db.query(sql, [firstname,lastname, pwsd, gphone], function(err, result) {
        console.log("Record Updated!!");
    });

   
    var sql = "SELECT * FROM customers WHERE phone= ?";
    db.query(sql, [gphone], function(err, result, fields){
    console.log(result);
    return res.render('userprofile',{ data: result });
});


};


exports.search = (req,res) => {
    console.log(req.body);
    var status="rejected";
    const { date, date1, numguests, country,province,city} = req.body;
    global.rows= req.body;
    // var sql = `select * from places where num_guests=? or province=? or country=? or city=?`;

    var sql = `select * from places p, reserves r where p.place_id= r.place_id and p.num_guests>=? and p.province=? and p.country=? and p.city=? and !(r.checkin_date>=? and r.checkout_date<=?) and !(r.status=?)`;
    db.query(sql, [numguests, province, country ,city, date, date1, status],function(err, rows) {
        console.log(rows);
        if (err) throw err;
        if (rows.length > 0) 
        {
            return res.render('searchedplaces', {data:rows});
            
        }
        else{
            return res.render('searchedplaces', {data:rows});   
        }
    });  
};







exports.filter = (req,res) => {

    const { date, date1, numguests, country,province,city} = global.rows;
    const { minprice, maxprice, propertytype} = req.body;
    const anemeties = [];
    for(let x in req.body)
    {
        if(req.body[x]=== 'On')
        {
            anemeties.push(x);
        }
    }
    // var sql = `select * from places p, anemeties a where p.place_id= a.place_id and p.price>? and p.price<? and p.property_type=? and a.anemety in (?)`;
    var sql=`select * from places p, reserves r, anemeties a where p.place_id= r.place_id and r.place_id= a.place_id and p.num_guests>=? and p.province=? and p.country=? and p.city=? and p.price>? and p.price<? and p.property_type=? and !(r.checkin_date>=? and r.checkout_date<=?) and a.anemety in (?)`;
    db.query(sql, [numguests, province, country, city, minprice, maxprice, propertytype , date, date1, anemeties],function(err, rows) {
        console.log(rows);
        return res.render('places', {data:rows});
    });
};


exports.book = (req,res) => {
    console.log("BOOKING");
    const {place_id} = req.body;
    var status="approved";

    const { date, date1, numguests} = global.rows;
    var d1 = new Date(date);
    var d2 = new Date(date1);
    var numnights = d2.getDate() - d1.getDate(); 

    var gphone=global.gphone;
    var sql = `select cust_id from customers where phone=?`;
    db.query(sql, [gphone], function(err, row){
        var cust_id = Object.values(row[0])
        cust_id = parseInt(cust_id[0]);

        var sql = `INSERT INTO reserves (cust_id,place_id,num_guests,num_nights,status,checkin_date, checkout_date) VALUES ("${cust_id}", "${place_id}","${numguests}","${numnights}","${status}","${date}","${date1}")`;
            db.query(sql, function(err, result) {
              if (err) throw err;
              console.log('record inserted');
              return res.render('guests');
        });
    });
};



exports.reservations = (req,res) => {
    var gphone=global.gphone;
    var sql = `select cust_id from customers where phone=?`;
    db.query(sql, [gphone], function(err, row){
        var cust_id = Object.values(row[0])
        cust_id = parseInt(cust_id[0]);

        var sql = `select * from reserves where place_id in (select place_id from places where owner_id= ?);`;
            db.query(sql, [cust_id], function(err, rows) {
              if (err) throw err;
              console.log(rows);
              return res.render('reservations', {data:rows});
              

        });
    });
     
};


exports.reject = (req,res) => {
    
    const {serial_no, place_id, cust_id} = req.body;
    var status="rejected";
    var sql = `UPDATE reserves SET status = ?  WHERE serial_no = ? and place_id=? and cust_id=?`;
    db.query(sql, [status, serial_no, place_id, cust_id], function(err, rows) {
        if (err) throw err;
        console.log(rows);
        return res.render('hosts');
        

  });

};




exports.bookings = (req,res) => {

    var gphone=global.gphone;
    var sql = `select cust_id from customers where phone=?`;
    db.query(sql, [gphone], function(err, row){
        var cust_id = Object.values(row[0])
        cust_id = parseInt(cust_id[0]);
        var sql = `select * from reserves where cust_id = ?;`;
            db.query(sql, [cust_id], function(err, rows) {
              if (err) throw err;
              console.log(rows);
              return res.render('bookings', {data:rows});
              

        });

    });


};
