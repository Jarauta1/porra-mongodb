const express = require("express");
const app = express();
const mongodb = require("mongodb"); /* MongoDB */

app.use(express.static("public")); /*  */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

let MongoClient = mongodb.MongoClient; /* MongoDB */

MongoClient.connect("mongodb://127.0.0.1:27017", function(err,client){
    if (err !== null) {
        console.log(err);
    } else {
        let db = client.db("NombreBaseDatos")
    }
})

app.get("/mongo", function (req,res){
    let nombreObjeto = req.body;
    db.collection("NombreColeccion").find({propiedad: nombreObjeto}).toArray(function(err,datos){
        if (err !== null) {
            console.log(err);
            res.send({mensaje: `Error ${err}`})
        } else {
            console.log(datos);
            res.send({datos: datos})
        }
    })
    res.send({mensaje: "Obtenidos los datos"})
})

app.post("/mongo", function (req,res){
    let nombreObjeto = req.body;
    db.collection("NombreColeccion").insertOne(nombreObjeto, function(err,res){
        if (err !== null) {
            console.log(err);
            res.send({mensaje: `Ha habido un error: ${err}`})
        } else {
            res.send(res)
        }
    })
})


app.get("/", function (req,res){
    res.send({mensaje: "Obtenidos los datos"})
})

app.get("/persona/:nombre", function (req, res){
    let nombre = req.params.nombre;
    let apellido = req.query.apellido;
    res.send({mensaje: `Obtenido datos de persona ${nombre}`})
})

app.post("/", function (req,res){
    let nombre = req.body.nombre;
    res.send({mensaje: `Has subido los datos de ${nombre}`})
})

app.put("/", function(req,res) {
    let nombre = req.body.nombre;
    res.send({mensaje: `Has modificado los datos de ${nombre}`})
})

app.delete("/", function(req,res){
    let nombre = req.body.nombre;
    res.send({mensaje: `Has eliminado los datos de ${nombre}`})
})


app.listen(3000);