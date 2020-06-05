const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    axios.get('https://api.covid19india.org/state_district_wise.json')
    .then((response) => {
        let coronaData = (response.data);
        // let coronaData = (response.data[req.body.area].districtData[req.body.data]);
        // res.send(coronaData);
        res.render("home");
    });      
});

app.post('/', (req, res) => {
    axios.get('https://api.covid19india.org/state_district_wise.json')
    .then((response) => {
        let area = req.body.area;
        let district = req.body.district;
        let coronaData = (response.data[area].districtData[district]);
        // res.send(coronaData);
        res.render("index", {data: coronaData, district: district});
    });      
});

app.listen(3000, function (req, res) {
  console.log('server started at 3000');
});
