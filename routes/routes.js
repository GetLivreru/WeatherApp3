const express = require("express");
const axios = require("axios");
const path = require("path");
const { client, connectToDatabase } = require('../db/db.js');
const API_KEY = "94b07001ec1f4be8df8aa962a94b7dad";
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcrypt');

router.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});


router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get("/ping", function(req, res){
    res.status(200); 
    res.send("pong"); 
});

router.get("/weather/:city", function(req, res){
    const city = req.params.city;
    const lang = req.query.lang || 'en'; // Используйте параметр запроса lang
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`; // Используйте lang в URL

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
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Проверяем, что все данные присутствуют
        if (!username || !email || !password) {
            return res.status(400).send({ success: false, message: "Missing required fields" });
        }

        // Подключаемся к базе данных
        await connectToDatabase();

        // Выполняем операцию добавления пользователя в коллекцию users
        await client.db("users").collection("users").insertOne({
            username,
            email,
            password
        });

        res.status(200).send({ success: true, redirectUrl: "/" });
 
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ success: false, message: "Error registering user" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Проверяем, что все данные присутствуют
        if (!username || !password) {
            return res.status(400).send({ success: false, message: "Missing username or password" });
        }

        // Подключаемся к базе данных
        await connectToDatabase();

        // Ищем пользователя по имени в базе данных
        const user = await client.db("users").collection("users").findOne({ username });

        if (!user) {
            return res.status(401).send({ success: false, message: "Incorrect username or password" });
        }

        // Сверяем хэшированный пароль из базы данных с введенным паролем
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send({ success: false, message: "Incorrect username or password" });
        }

        // Если все верно, отправляем успешный ответ
        res.status(200).send({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send({ success: false, message: "Incorrect username or password" });
    }
});


module.exports = router;
