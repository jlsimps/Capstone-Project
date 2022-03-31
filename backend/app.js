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

app.get('/getCustomers', (req, res) => {
    connection.query(`SELECT * FROM customer ORDER BY customer_last_name ASC`, function(err, result) {
        if (err) throw err;
        res.json(result);
    })
})

app.get('/searchCustomer/:phone', (req, res) => {
    connection.query(`SELECT * FROM customer WHERE customer_phone = '${req.params.phone}'`, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getCustomerById/:id', (req, res) => {
    connection.query(`SELECT * FROM customer WHERE customer_id = ${req.params.id}`, function(err, result) {
        if (err) throw err;
        res.json(result)
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
    const queryString = `INSERT INTO customer (customer_status_id, customer_social_media, customer_first_name, customer_last_name, customer_state_name, customer_city_name, customer_zipcode, customer_address, customer_address_2, customer_phone, customer_phone_2, customer_email, customer_driver_license_num, customer_driver_license_state) VALUES (1, '', '${customer.firstName}', '${customer.lastName}', '${customer.state}', '${customer.city}', '${customer.zip}', '${customer.address1}', '${customer.address2}', '${customer.phone1}', '${customer.phone2}', '${customer.email}', '${customer.dlnumber}', '${customer.dlstate}')`
    connection.query(queryString, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
})

app.put('/UpdateCustomer/:id', (req, res) => {
    const customer = req.body
    const queryString = `UPDATE customer SET customer_first_name = '${customer.customer_first_name}', customer_last_name = '${customer.customer_last_name}', customer_address = '${customer.customer_address}', customer_address_2 = '${customer.customer_address_2}', customer_city_name = '${customer.customer_city_name}', customer_state_name = '${customer.customer_state_name}', customer_zipcode = '${customer.customer_zipcode}', customer_phone = '${customer.customer_phone}', customer_phone_2 = '${customer.customer_phone_2}', customer_email = '${customer.customer_email}', customer_driver_license_num = '${customer.customer_driver_license_num}', customer_driver_license_state = '${customer.customer_driver_license_state}' WHERE customer_id = ${req.params.id}`
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        res.json(result);
    })

})

app.get('/getMakes', (req, res) => {
    connection.query('SELECT * FROM make', function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getModels/:id', (req, res) => {
    const queryString = `SELECT * FROM model WHERE make_id = ${req.params.id}`
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getColors', (req, res) => {
    connection.query('SELECT * FROM color', function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getStates', (req, res) => {
    connection.query('SELECT * FROM vehicle_license_plate_state', function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.post('/createVehicle', (req, res) => {
    const vehicle = req.body
    const queryString = `INSERT INTO vehicle (customer_id, model_id, vehicle_status_id, color_id, vehicle_license_plate_state_id, vehicle_vin_number, vehicle_license_plate_num, vehicle_year) VALUES (${vehicle.customer_id}, ${vehicle.model_id}, ${vehicle.vehicle_status_id}, ${vehicle.color_id}, ${vehicle.vehicle_license_plate_state_id}, '${vehicle.vehicle_vin_number}', '${vehicle.vehicle_license_plate_num}', ${vehicle.vehicle_year})`
    connection.query(queryString, function(err, result) {
        if (err) throw err
        res.send('Success')
    })
})

app.get('/getVehicles', (req, res) => {
    connection.query('SELECT * FROM vehicles_with_details', function(err, result) {
        if (err) throw err
        res.json(result)
    })
})