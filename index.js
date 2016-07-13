var geocoder = require('geocoder');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + "/static/"));

app.get('/ping', function (req, res) {
  res.json(["pong"]);
});

app.get('/geo/reverse', function (req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;

    geocoder.reverseGeocode(lat, lon, function (err, data) {
        if (!err) {
            console.log("reverse geocoded location");
            res.json(data);
        } else {
            console.log("error during reverse geocode address submission");
            res.sendStatus(404);
        }
    });
});

app.post('/address', function (req, res) {
    var address = req.body.address;
    geocoder.geocode(address, function (err, data) {
        if (!err) {
            console.log("geocoded address submission");
            // Todo: extract the address, admin_subdiv, country, and postal code
            // to persist to database, etc.
            res.json(data);
        } else {
            console.log("error during geocode address submission");
            res.sendStatus(404);
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});
