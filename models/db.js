const MongoClient = require('mongodb').MongoClient;
const settings = require("./settings.js");

function _connectDB(callback){
    const url = settings.dburl;
    MongoClient.connect(url,{ useNewUrlParser: true },(err, db) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(err, db);
        console.log("Connected correctly to server");
    });
}

initial();
function initial() {
    // initialize database
    _connectDB((err, db) => {
        if (err) {
            console.log(err);
        }
        const dbName = db.db();
        dbName.collection("users_info").createIndex({
            "username": 1
        }, null, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log("Index Create Successfully!");
        })
    });
}

// insert data
exports.insertOne = (collectionName, json, callback) => {
    // connect database, then find data
    _connectDB((err, db) => {
        const dbName = db.db();
        dbName.collection(collectionName).insertOne(json, (err, result) => {
            callback(err, result);
            db.close();
        })
    })
};

// find user info
exports.findUser = (collectionName, json, callback) => {
    const result = [];
    _connectDB((err, db) => {
        if (err) {
            callback(err, db);
            db.close();
            return;
        }
        const dbName = db.db();
        const cursor = dbName.collection(collectionName).find(json);
        cursor.each((err, doc) => {
            if (err) {
                callback(err, null);
                db.close();
                return;
            }
            if (doc != null) {
                result.push(doc); // put result array
            }else {
                // until there is no more doc
                callback(null, result);
                db.close();
          }
      })
  })
};

// find data
exports.findData = (collectionName, json1, json2, callback) => {
    const result = [];
    _connectDB((err, db) => {
        if (err) {
            callback(err, db);
            db.close();
            return;
        }
        // skip numbers of data
        const skip_number = json2.page_amount * json2.page;
        // the data should be read, limit the data
        const limit = json2.page_amount || 0;
        // order
        const sort = json2.sort || {};

        const dbName = db.db();
        const cursor = dbName.collection(collectionName).find(json1).skip(skip_number).limit(limit).sort(sort);
        cursor.each((err, doc) => {
            if (err) {
                callback(err, null);
                db.close();
                return;
            }
            if (doc != null) {
                result.push(doc); // put result array
            }else {
                // until there is no more doc
                callback(null, result);
                db.close();
            }
        })
    })
};

// delete data
exports.deleteMany = ((collectionName, json, callback) => {
    _connectDB((err, db) => {
        // delete
        const dbName = db.db();
        dbName.collection(collectionName).deleteMany(json, (err, results) => {
            callback(err, results);
            db.close();
        })
    })
});

// change data
exports.updateMany = ((collectionName, json1, json2, callback) => {
    _connectDB((err, db) => {
        const dbName = db.db();
        dbName.collection(collectionName).updateMany(json1, json2, (err, results) => {
            callback(err, results);
            db.close();
        })
    });
});

// check all count
exports.getAllCount = ((collectionName, callback) => {
    _connectDB((err, db) => {
        const dbName = db.db();
        dbName.collection(collectionName).countDocuments({}).then((count) => {
            console.log(count);
            callback(count);
            db.close();
        });
    });
});