import Express from "express";

import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors'

let data;
const uri = "mongodb+srv://admin-rock:01893252079@clusterrock.d6ii8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "DragDropCalcData"
const collectionName = "data"
client.connect()


async function main() {
    await client.connect()
    console.log("connected to MongoDb");
    let db = client.db(dbName).collection(collectionName)
    data = await db.findOne()
    console.log(data.data);
    client.close()
    return data.data
}



const app = Express()

const dataArray = [
    { alphabet: "A", value: "1" },
    { alphabet: "B", value: "2" },
    { alphabet: "C", value: "3" },
    { alphabet: "D", value: "4" },
    { alphabet: "E", value: "5" }
]

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/', async (req, res) => {
    data = await main()
    res.send(data);

})

app.listen('5000', () => { console.log("server is running on 5000") })