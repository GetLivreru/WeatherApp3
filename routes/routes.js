const express = require("express");
const axios = require("axios");
const { client, connectToDatabase } = require('../db/db.js');
const API_KEY = "94b07001ec1f4be8df8aa962a94b7dad";
const router = express.Router();

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get("/ping", function(req, res){
    res.status(200); 
    res.send("pong"); 
});

router.get("/weather/:city", function(req, res){
    const city = req.params.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&local=ru`;

    axios.get(url)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else if (error.request) {
                res.status(500).send({ message: "No response received from the weather service" });
            } else {
                res.status(500).send({ message: "Error in making request to the weather service" });
            }
    });
});

router.get("/wallet/:address", function(req, res){
    const address = req.params.address;
    const url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?limit=5`;

    axios.get(url)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else if (error.request) {
                res.status(500).send({ message: "No response received from the balance service" });
            } else {
                res.status(500).send({ message: "Error in making request to the balance service" });
            }
    });
});

router.get("/BTC/price", function(req, res){
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD';

    axios.get(url)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else if (error.request) {
                res.status(500).send({ message: "No response received from the BTC price service" });
            } else {
                res.status(500).send({ message: "Error in making request to the BTC price service" });
            }
    });
});

module.exports = router;
