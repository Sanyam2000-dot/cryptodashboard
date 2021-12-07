import express from "express";
import process from "process";
import cors from "cors";

import { MongoClient } from "mongodb";

const cnxn_str =
    "mongodb+srv://sanyam:qazplm1234@cluster0.ena9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(cors());

// Fetch PORT from env, else 8080
const server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
const server_host = process.env.YOUR_HOST || "0.0.0.0";

const init = async() => {
    // Add entry
    const addOneToMongo = async(client, data) => {
        const db = await client.db("crypto");
        const collection = db.collection("history");

        collection.insertOne(data, function(err, res) {
            if (err) console.log("Inserting to Mongo failed.");
            else console.log("1 row inserted.");
        });
    };

    //   Get entries.
    const getFromMongo = async(client) => {
        const db = await client.db("crypto");
        const collection = await db.collection("history");

        return await collection.find().limit(100).toArray();
    };

    // Mongo cnxn
    const client = new MongoClient(cnxn_str, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    app.post("/history", async(req, res) => {
        //
        console.log(req.body);
        // Create object
        let currencies = {};
        currencies.time = new Date();
        currencies.c1 = req.body.c1;
        currencies.c2 = req.body.c2;

        // Push to mongo.
        await addOneToMongo(client, currencies);

        res.status(201).end();
    });

    app.get("/history", async(req, res) => {
        let currencyHistory = await getFromMongo(client);
        res.status(200).json(currencyHistory).end();
    });

    const cleanup = (event) => {
        //   Terminate mongo cnxn during exit().
        client.close();
        process.exit();
    };

    // Termination events.
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);

    // Start-server
    app.listen(server_port, server_host, () => {
        console.log("Listening on port %d", server_port);
    });

    //   Start server.
    console.log(`Server is listening on port ${server_port}`);
};

// Driver
init();