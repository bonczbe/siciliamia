import fetch from 'node-fetch';
import * as http from 'http';
import { MongoClient } from 'mongodb';


async function main(){
const uri = "mongodb+srv://sicilia:sicilia@cluster0.5ag7jeq.mongodb.net/test";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);


async function listDatabases(client){
    var databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 


const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'application/json');

    var datas={};

    if(req.url=="/refresh"&& req.method=="GET"){
        fetch('https://api.publicapis.org/entries')
            .then((response) => response.json())
            .then((data) => datas = data['entries']);

    }else if(req.method=="GET"&& req.url=="/data"){

    }
    
    res.write(JSON.stringify(datas));
    res.end();
});

server.listen(3008,'localhost',()=>{
    console.log('listening on http://localhost');
});