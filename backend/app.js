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
        res.json(result);
    })

})

app.get('/searchOrder/:lastname/:zip', (req, res) => {
    connection.query(`SELECT * FROM recent_orders WHERE customer_last_name = '${req.params.lastname}' AND customer_zipcode = ${req.params.zip} AND work_order_status_id = 1`, function(err, result) {
        if (err) throw err;
        res.json(result);
    })
})

app.get('/getOrders' , (req, res) =>{
    connection.query(`SELECT * FROM recent_orders WHERE work_order_status_id = 1 ORDER BY pickup_date DESC`, function(err, result){
        if (err) throw err;
        res.json(result);
    })
})

app.get('/getDeletedOrders' , (req, res) =>{
    connection.query(`SELECT * FROM recent_orders WHERE work_order_status_id = 2 ORDER BY pickup_date DESC`, function(err, result){
        if (err) throw err;
        res.json(result);
    })
})

app.put('/removeOrder/:id' , (req, res) =>{
    connection.query(`UPDATE work_order SET work_order_status_id = 2 WHERE work_order_id = ${req.params.id}`, function(err, result){
        if (err) throw err;
        res.send('success');
    })
})

app.put('/restoreOrder/:id' , (req, res) =>{
    connection.query(`UPDATE work_order SET work_order_status_id = 1 WHERE work_order_id = ${req.params.id}`, function(err, result){
        if (err) throw err;
        res.send('success');
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
    connection.query(`SELECT * FROM order_details WHERE work_order_id = ${req.params.orderid} AND work_order_line_status_id = 1`, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getClaimDetails/:orderid', (req, res) => {
    connection.query(`SELECT * FROM claim_details WHERE work_order_id = ${req.params.orderid} AND work_order_line_status_id = 1 AND IsDelete = 0`, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.put('/updateClaims', (req, res) => {
    const claimsToAdd = req.body.claimsToAdd
    const claimsToRemove = req.body.claimsToRemove
    if (claimsToAdd.length>0) {
        for (claim of claimsToAdd) {
            if ((!claim.isDeleted) && (claim.warranty_claim_notes)) {
                const queryString = `INSERT INTO warranty_claim (work_order_line_id, warranty_claim_date, warranty_claim_amount, warranty_claim_notes) VALUES (${claim.work_order_line_id}, '${claim.warranty_claim_date}', ${claim.warranty_claim_amount}, '${claim.warranty_claim_notes}')`
                connection.query(queryString, function(err) {
                    if (err) throw err
                })
            } else if (!claim.isDeleted) {
                const queryString = `INSERT INTO warranty_claim (work_order_line_id, warranty_claim_date, warranty_claim_amount) VALUES (${claim.work_order_line_id}, '${claim.warranty_claim_date}', ${claim.warranty_claim_amount})` 
                connection.query(queryString, function(err) {
                    if (err) throw err
                })
            }
        }
    }
    if (claimsToRemove.length>0) {
        for (claim of claimsToRemove) {
            const queryString = `UPDATE warranty_claim SET IsDelete = 1 WHERE warranty_claim_id = ${claim}`
            connection.query(queryString, function(err) {
                if (err) throw err
            })
        }
    }
    res.send('success')
})

app.get('/getClaimReport', (req, res) => {
    connection.query(`SELECT * FROM claim_report WHERE number_of_claims > 0 ORDER BY cost_of_claims DESC`, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getAllOrderDetails', (req, res) => {
    connection.query('SELECT * FROM order_details', function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.get('/getAllOrderVehicleDetails', (req, res) => {
    connection.query('SELECT * FROM recent_orders', function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.post('/createCustomer', (req, res) => {
    const customer = req.body
    const queryString = `INSERT INTO customer (customer_status_id, customer_first_name, customer_last_name, customer_state_name, customer_city_name, customer_zipcode, customer_address, customer_address_2, customer_phone, customer_phone_2, customer_email, customer_driver_license_num, customer_driver_license_state) VALUES (1, '${customer.firstName}', '${customer.lastName}', '${customer.state}', '${customer.city}', '${customer.zip}', '${customer.address1}', '${customer.address2}', '${customer.phone1}', '${customer.phone2}', '${customer.email}', '${customer.dlnumber}', '${customer.dlstate}')`
    connection.query(queryString, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
})

app.put('/UpdateCustomer/:id', (req, res) => {
    const customer = req.body
    console.log(customer)
    const queryString = `UPDATE customer SET customer_first_name = '${customer.customer_first_name}', customer_last_name = '${customer.customer_last_name}', customer_address = '${customer.customer_address}', customer_address_2 = '${customer.customer_address_2}', customer_city_name = '${customer.customer_city_name}', customer_state_name = '${customer.customer_state_name}', customer_zipcode = '${customer.customer_zipcode}', customer_phone = '${customer.customer_phone}', customer_phone_2 = '${customer.customer_phone_2}', customer_email = '${customer.customer_email}', customer_driver_license_num = '${customer.customer_driver_license_num}', customer_driver_license_state = '${customer.customer_driver_license_state}' WHERE customer_id = ${req.params.id}`
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        res.json(result);
    })

})

app.get('/getMakes', (req, res) => {
    connection.query('SELECT * FROM make WHERE make_status_id = 1 AND IsDelete = 0', function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getAllMakes', (req, res) => {
    connection.query('SELECT * FROM make WHERE IsDelete = 0', function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.post('/addNewMake/:name', (req, res) => {
    connection.query(`INSERT INTO make (make_status_id, make_name) VALUES (1, '${req.params.name}')`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/changeMakeStatus/:id/:status', (req, res) => {
    connection.query(`UPDATE make SET make_status_id = ${req.params.status} WHERE make_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/removeMake/:id', (req, res) => {
    connection.query(`UPDATE make SET IsDelete = 1 WHERE make_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.get('/getModels/:id', (req, res) => {
    const queryString = `SELECT * FROM model WHERE make_id = ${req.params.id} AND model_status_id = 1 AND IsDelete = 0`
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/getAllModels/:id', (req, res) => {
    const queryString = `SELECT * FROM model WHERE make_id = ${req.params.id} AND IsDelete = 0`
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.post('/addNewModel/:makeid/:name', (req, res) => {
    connection.query(`INSERT INTO model (model_status_id, make_id, model_name) VALUES (1, ${req.params.makeid}, '${req.params.name}')`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/changeModelStatus/:id/:status', (req, res) => {
    connection.query(`UPDATE model SET model_status_id = ${req.params.status} WHERE model_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/removeModel/:id', (req, res) => {
    connection.query(`UPDATE model SET IsDelete = 1 WHERE model_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
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

app.get('/getVehicleByVin/:vin', (req, res) => {
    connection.query(`SELECT * FROM vehicles_with_details WHERE vehicle_vin_number = '${req.params.vin}'`, function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.get('/getVehicleByPhone/:phone', (req, res) => {
    connection.query(`SELECT * FROM vehicles_with_details WHERE customer_phone = '${req.params.phone}'`, function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.get('/getVehicleById/:id', (req, res) => {
    const queryString = `SELECT * FROM vehicles_with_details WHERE vehicle_id = ${req.params.id}`
    connection.query(queryString, function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.put('/updateVehicle/:id', (req, res) => {
    const vehicle = req.body
    const queryString = `UPDATE vehicle set vehicle_vin_number = '${vehicle.vehicle_vin_number}', vehicle_year = ${vehicle.vehicle_year}, color_id = ${vehicle.color_id}, vehicle_license_plate_num = '${vehicle.vehicle_license_plate_num}', vehicle_license_plate_state_id = ${vehicle.vehicle_license_plate_state_id} WHERE vehicle_id = ${vehicle.vehicle_id}`
    connection.query(queryString, function(err, result) {
        if (err) throw err
        res.send('Success')
    })
})

app.get('/getServices', (req, res) => {
    connection.query('SELECT * FROM service WHERE service_status_id = 1 AND IsDelete = 0', function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.get('/getAllServices', (req, res) => {
    connection.query('SELECT * FROM service WHERE IsDelete = 0 ORDER BY service_status_id ASC', function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.post('/addNewService/:name', (req, res) => {
    connection.query(`INSERT INTO service (service_status_id, service_type) VALUES (1, '${req.params.name}')`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/changeServiceStatus/:id/:status', (req, res) => {
    connection.query(`UPDATE service SET service_status_id = ${req.params.status} WHERE service_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/removeService/:id', (req, res) => {
    connection.query(`UPDATE service SET IsDelete = 1 WHERE service_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.get('/getWarranties', (req, res) => {
    connection.query('SELECT * FROM warranty_option WHERE IsDelete = 0 AND warranty_option_status_id = 1', function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.get('/getAllWarranties', (req, res) => {
    connection.query('SELECT * FROM warranty_option WHERE IsDelete = 0 ORDER BY warranty_option_status_id ASC', function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.post('/addNewWarranty/:months/:miles', (req, res) => {
    connection.query(`INSERT INTO warranty_option (warranty_option_status_id, warranty_option_months, warranty_option_mileage, warranty_name) VALUES (1, ${req.params.months}, ${req.params.miles}, '${req.params.months} months or ${req.params.miles} miles')`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/changeWarrantyStatus/:id/:status', (req, res) => {
    console.log(`UPDATE warranty_option SET warranty_option_status_id = ${req.params.status} WHERE warranty_option_id = ${req.params.id}`)
    connection.query(`UPDATE warranty_option SET warranty_option_status_id = ${req.params.status} WHERE warranty_option_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.put('/removeWarranty/:id', (req, res) => {
    connection.query(`UPDATE warranty_option SET IsDelete = 1 WHERE warranty_option_id = ${req.params.id}`, function(err, result) {
        if (err) throw err
        res.send('success')
    })
})

app.get('/getServiceId/:serviceName', (req, res) => {
    const queryString = `SELECT service_id FROM service WHERE service_type = '${req.params.serviceName}'`
    connection.query(queryString, function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.get('/getWarrantyId/:warrantyName', (req, res) => {
    const queryString = `SELECT warranty_option_id FROM warranty_option WHERE warranty_name = '${req.params.warrantyName}'`
    connection.query(queryString, function(err, result) {
        if (err) throw err
        res.json(result)
    })
})

app.post('/createOrder', (req, res) => {
    const order = req.body
    const queryString = `INSERT INTO work_order (vehicle_id, work_order_status_id, current_mileage, pickup_date) VALUES (${order.vehicle_id}, 1, ${order.mileage}, '${order.pickup_date}')`
    connection.query(queryString, function(err, result) {
        if (err) throw err
    })
    connection.query('SELECT work_order_id FROM work_order ORDER BY work_order_id DESC LIMIT 1', function(err, result) {
        if (err) throw err
        res.json(result)
    })

})

app.post('/addWorkOrderLines', (req,res) => {
    const services = req.body
    console.log(services)
    for (const service of services) {
        queryString = `INSERT INTO work_order_line (work_order_line_status_id, service_id, work_order_id, warranty_option_id) VALUES (1, ${service.service_type.service_id}, ${service.order_id}, ${service.warranty_name.warranty_option_id})`
        connection.query(queryString, function(err, result) {
            if (err) throw err
        })
    }
    res.send('success')
})

app.put('/updateWorkOrder', (req,res) => {
    const orderId = req.body.work_order_id
    const queryString = `UPDATE work_order SET current_mileage = ${req.body.current_mileage}, pickup_date = '${req.body.pickup_date}' WHERE work_order_id = ${orderId}`
    connection.query(queryString, function(err, result) {
        if (err) throw err
    })
    for (service of req.body.deletedServices) {
        const queryString2 = `UPDATE work_order_line SET work_order_line_status_id = 2 WHERE work_order_line_id = ${service}`
        connection.query(queryString2, function(err, result) {
            if (err) throw err
        })
    }
    for (service of req.body.addedServices) {
        if (!service.isDeleted) {
            const queryString3 = `INSERT INTO work_order_line (work_order_line_status_id, service_id, work_order_id, warranty_option_id) VALUES (1, ${service.service_id}, ${orderId}, ${service.warranty_option_id})`
            connection.query(queryString3, function(err, result) {
                if (err) throw err
            })
        }
    }
    res.send('success')
})

