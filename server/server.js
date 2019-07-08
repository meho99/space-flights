const express = require('express');
var bodyParser = require("body-parser");
const app = express();


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

// ----- DATABASE -----

const mysql = require('mysql');

// connection data

const con = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'databaseName'
});

// ----- QUERYS -----

const getAllFlights = "SELECT * FROM flights";

const addFlight = (values) => `INSERT INTO flights (id, arrival, departure, seatsNumber, price, tourists) VALUES ("${values[0]}","${values[1]}","${values[2]}",${values[3]},"${values[4]}","${values[5]}")`;
const delFlight = (flightId) => `DELETE FROM flights WHERE id = "${flightId}"`
const findTouristsList = (flight) => `SELECT tourists FROM flights WHERE id = "${flight}"`
const updateTouristsInFlight = (flight, tourists) => `UPDATE flights SET tourists = "${tourists}" WHERE id = "${flight}"`

const getAllTourists = "SELECT * FROM tourists";

const addTourist = (values) => `INSERT INTO tourists (id, firstName, secoundName, sex, country, notes, birth, flights) VALUES ("${values[0]}","${values[1]}","${values[2]}","${values[3]}","${values[4]}","${values[5]}","${values[6]}","${values[7]}")`;
const delTourist = (touristId) => `DELETE FROM tourists WHERE id = "${touristId}"`
const findFlightsList = (tourist) => `SELECT flights FROM tourists WHERE id = "${tourist}"`
const updateTouristFlights = (tourists, flight) => `UPDATE tourists SET flights = "${flight}" WHERE id = "${tourists}"`


con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');

    // --------------------  Client communication  --------------------

    // ---------------  FLIGHTS  ---------------

    app.post('/', (req, res) => {
        con.query(getAllFlights, async (err, result) => {
            if (err) throw err;
            res.send(result)
        });
    });

    // ----- add flight to database -----

    app.post('/addflight', (req, res) => {
        console.log(req.body)
        const flight = [req.body.id, req.body.arrival, req.body.departure, Number(req.body.seatsNumber), req.body.price,
        req.body.tourists
        ]
        con.query(addFlight(flight), (err, result) => {
            if (err) throw err;
            let response = { ok: 'true' }
            // send data to client
            res.send(response)
        });
    });

    // ----- delete flight from database -----

    app.post('/delFlight', (req, res) => {
        let id = req.body.id

        con.query(delFlight(id), (err, result) => {
            if (err) throw err;
            console.log(result)
            let response = { ok: 'true' }
            // send data to client
            res.send(response)
        });
    });

    // ----- add tourist to flight -----

    app.post('/addTouristToFlight', (req, res) => {
        console.log(req.body)

        con.query(findTouristsList(req.body.flight), (err, resoult) => { // ----- find tourist list 
            if (err) throw err;
            let touristsList = resoult[0].tourists.split(',') // make array 
            touristsList.push(req.body.tourist) // add new tourist 
            con.query(updateTouristsInFlight(req.body.flight, touristsList), (err, resoult) => { // modify Row
                if (err) throw err;
                let response = { ok: 'true' }
                // if ok  send data to client
                res.send(response)
            })
        })
    })

    // ----- delete tourist from flight -----

    app.post('/delTouristFromFlight', (req, res) => {
        console.log(req.body)

        con.query(findTouristsList(req.body.flight), (err, resoult) => { // ----- find tourist list 
            if (err) throw err;
            let touristsList = resoult[0].tourists.split(',') // make array 

            for (let i = 0; i < touristsList.length; i++)  // delete tourist
                if (touristsList[i] === req.body.tourist)
                    touristsList.splice(i, 1)

            con.query(updateTouristsInFlight(req.body.flight, touristsList), (err, resoult) => { // modify Row
                if (err) throw err;
                console.log(resoult)
                let response = { ok: 'true' }
                // if ok  send data to client
                res.send(response)
            })
        })
    })

    // ----- delete tourist from all flights 

    app.post('/delTouristFromAll', async (req, res) => {
        console.log(req.body + '134')

        await con.query(getAllFlights, (err, resoult) => { // ----- find tourist list 
            if (err) throw err;
            for (var j = 0; j < resoult.length; j++) {
                let list = resoult[j].tourists.split(',') // make array
                for (var i = 0; i < list.length; i++) {
                    if (list[i] === req.body.tourist) { // find flight
                        list.splice(i, 1)  // remove flight
                        con.query(updateTouristsInFlight(resoult[j].id, list), (err, resoult) => { // update rows
                            if (err) throw err;

                        })
                    }
                }
            }
        })
        let response = { ok: 'true' }
        // if ok  send data to client
        res.send(response)
    })

    // ---------------  TOURISTS  ---------------

    // ----- get All Data -----

    app.post('/allTourists', (req, res) => {
        con.query(getAllTourists, (err, resoult) => {
            if (err) throw err;
            res.send(resoult)
        })
    })

    // ---- add tourist -----

    app.post('/addTourist', (req, res) => {
        let values = [req.body.id, req.body.firstName, req.body.secoundName, req.body.sex, req.body.country, req.body.birth, req.body.notes, req.body.flights]
        con.query(addTourist(values), (err, resoult) => {
            if (err) throw err;
            console.log(resoult)
            let response = { ok: 'true' }
            // if ok  send data to client
            res.send(response)
        })
    })

    // ----- delete flight from database -----

    app.post('/delTourist', (req, res) => {
        let id = req.body.id

        con.query(delTourist(id), (err, result) => {
            if (err) throw err;
            console.log(result)
            let response = { ok: 'true' }
            // send data to client
            res.send(response)
        });
    });

    // ----- add flight to tourist -----

    app.post('/addFlightToTourist', (req, res) => {
        console.log(req.body)

        con.query(findFlightsList(req.body.tourist), (err, resoult) => { // ----- find flight list 
            if (err) throw err;
            console.log('resoult', resoult)
            let flightsList = resoult[0].flights.split(',') // make array 
            flightsList.push(req.body.flight) // add new flight 
            con.query(updateTouristFlights(req.body.tourist, flightsList), (err, resoult) => { // modify Row
                if (err) throw err;
                let response = { ok: 'true' }
                // if ok  send data to client
                res.send(response)
            })
        })
    })

    // ----- add flight to tourist -----

    app.post('/delFlightFromTourist', (req, res) => {
        console.log(req.body)

        con.query(findFlightsList(req.body.tourist), (err, resoult) => { // ----- find flight list 
            if (err) throw err;
            console.log('resoult', resoult)
            let flightsList = resoult[0].flights.split(',') // make array 
            for (let i = 0; i < flightsList.length; i++) { // delete tourist
                if (flightsList[i] === req.body.flight)
                    flightsList.splice(i, 1)
            }
            con.query(updateTouristFlights(req.body.tourist, flightsList), (err, resoult) => { // modify Row
                if (err) throw err;
                let response = { ok: 'true' }
                // if ok  send data to client
                res.send(response)
            })
        })
    })

    // ----- delete flight from all tourists 

    app.post('/delFlightFromAll', async (req, res) => {

        await con.query(getAllTourists, (err, resoult) => { // ----- find tourist list 
            if (err) throw err;
            var block = 0;
            for (var j = 0; j < resoult.length; j++) {
                let list = resoult[j].flights.split(',') // make array
                for (var i = 0; i < list.length; i++) {
                    if (list[i] === req.body.flight) { // find flight
                        list.splice(i, 1)  // remove flight
                        con.query(updateTouristFlights(resoult[j].id, list), (err, resoult) => { // update rows
                            if (err) throw err;

                        })
                    }
                }
            }
        })
        let response = { ok: 'true' }
        // if ok  send data to client
        res.send(response)
    })

});

app.listen(3001, function () {
    console.log("Started on PORT 3000");
})