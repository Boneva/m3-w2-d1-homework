const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017');

var stats = [
    {
        'city': 'San Juan', 
        'zip': '00926', 
        'state': 'PR', 
        'income': '34781',
        'age': '44'
    },
    {
        'city': 'Corona', 
        'zip': '11368', 
        'state': 'NY', 
        'income': '50797',
        'age': '32'
    },
    {
        'city': 'Chicago', 
        'zip': '60629', 
        'state': 'IL', 
        'income': '42019',
        'age': '31'
    },
    {
        'city': 'El Paso', 
        'zip': '79936', 
        'state': 'TX', 
        'income': '54692',
        'age': '31'
    },
    {
        'city': 'Los Angeles', 
        'zip': '90011', 
        'state': 'CA', 
        'income': '36954',
        'age': '28'
    },
    {
        'city': 'Norwalk', 
        'zip': '90650', 
        'state': 'CA', 
        'income': '66453',
        'age': '35'
    },
    {
        'city': 'Pacoima', 
        'zip': '91331', 
        'state': 'CA', 
        'income': '60360',
        'age': '33'
    },
    {
        'city': 'Ketchikan', 
        'zip': '99950', 
        'state': 'AK', 
        'income': '00000',
        'age': '00'
    }
];


 client.connect().then(function() {
    console.log("Connected to MongoDB");
    const db = client.db("statsdb");
    console.log("Database created: statsdb");
    const collection = db.collection("uscensus");
    console.log("Collection created: uscensus");

    collection.insertMany(stats).then(function(res) {
        console.log("Number of documents inserted: " + res.insertedCount);
        
    collection.findOne({city: 'Corona', state: 'NY'}).then(function(res) {
            console.log("Zip code for Corona, NY: " + res.zip);
            client.close();

       var myquery = { state: "CA" };
    dbo.collection('uscensus').find(myquery)
    .toArray()
    .then(items => {
        console.log("\nCalifornia cities income:");
        items.forEach(item => console.log(item.city + ": $" + item.income));
    });
     var myquery = { state: "AK" };
    var newvalues = {$set: {income: "38910", age: "46"}};
    dbo.collection('uscensus').updateOne(myquery, newvalues).then(function(res) {
        console.log("\nAlaska document updated - income: 38910, age: 46");
    });
    var mysort = { state: 1 };
    dbo.collection('uscensus').find()
    .sort(mysort)
    .toArray()
    .then(items => {
        console.log("\nRecords sorted by state (ascending):");
        items.forEach(item => console.log(item.state + ": " + item.city + " (Zip: " + item.zip + ")"));
        client.close();  // Close connection after last operation
    });
    });
}).catch(err => console.error(err));
});