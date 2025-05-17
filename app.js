var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient('mongodb://127.0.0.1:27017');

var stats = [
    { city: 'San Juan', zip: '00926', state: 'PR', income: '34781', age: '44' },
    { city: 'Corona', zip: '11368', state: 'NY', income: '50797', age: '32' },
    { city: 'Chicago', zip: '60629', state: 'IL', income: '42019', age: '31' },
    { city: 'El Paso', zip: '79936', state: 'TX', income: '54692', age: '31' },
    { city: 'Los Angeles', zip: '90011', state: 'CA', income: '36954', age: '28' },
    { city: 'Norwalk', zip: '90650', state: 'CA', income: '66453', age: '35' },
    { city: 'Pacoima', zip: '91331', state: 'CA', income: '60360', age: '33' },
    { city: 'Ketchikan', zip: '99950', state: 'AK', income: '00000', age: '00' }
];

client.connect().then(function () {
    console.log("Connected to MongoDB");
    var db = client.db("statsdb");
    var collection = db.collection("uscensus");

    collection.insertMany(stats, function (err, result) {
        if (err) throw err;
        console.log("Data inserted");

        collection.find({}).toArray(function (err, items) {
            if (err) throw err;
            console.log("Data from 'uscensus' collection:");
            console.table(items);
            client.close();
            console.log("Connection closed");
        });
    });
}).catch(function (err) {
    console.error("Error connecting:", err);
});
