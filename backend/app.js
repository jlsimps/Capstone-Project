const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cis4375',
    database: 'ExpressDB'
})

connection.connect();

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())




app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
});

app.get('/', (req, res) => {
    connection.query(`SELECT * FROM customer`, function(err, result){
        if (err) throw err;
        console.log(result);
        res.json(result);
    })

})

app.get('/searchOrder/:lastname/:zip', (req, res) => {
    connection.query(`SELECT * FROM recent_orders WHERE customer_last_name = '${req.params.lastname}' AND customer_zipcode = ${req.params.zip}`, function(err, result) {
        if (err) throw err;
        res.json(result);
    })
})

app.get('/getOrders' , (req, res) =>{
    connection.query(`SELECT * FROM recent_orders ORDER BY completion_date DESC`, function(err, result){
        if (err) throw err;
        res.json(result);
    })
})

app.get('/getOrderDetails/:orderid', (req, res) => {
    connection.query(`SELECT * FROM order_details WHERE work_order_id = ${req.params.orderid}`, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.post('/createCustomer', (req, res) => {
    const customer = req.body
    const queryString = `INSERT INTO customer VALUES (27, 1, '${customer.firstName}', '${customer.lastName}', '${customer.state}', '${customer.city}', '${customer.zip}', '${customer.address1}', '${customer.address2}', '${customer.phone1}', '${customer.phone2}', '${customer.email}', 'facebook', '${customer.dlnumber}', '${customer.dlstate}')`
    connection.query(queryString, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
})
