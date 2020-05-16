// configuaració del servidor
"use strict";
// configurar express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// acceder a ficheros
const path = require('path');

//cargar rutas
// cargar la configuración de rutas del user
const user_routes = require('./routes/user');
const follow_routes = require('./routes/follow');
const publication_routes = require('./routes/publication');
const messages_routes = require('./routes/messages');

//middelwares
app.use(bodyParser.urlencoded({ extended: false }));
// para que convierta a json cada petición a nuestro backend
app.use(bodyParser.json());

//Cors
//https://victorroblesweb.es/2017/11/09/configurar-cabeceras-acceso-cors-en-nodejs/
// configurar cabeceras http, sirve para poder hacer peticiones entre dominios de manera cruzada
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
   // res.header('Access-Control-Allow-Headers', 'token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//rutas
// ruta para producción, entra el la carpeta client de producción de angular.
// Con esta manera se le pone un hastag a la url y queda url no amigable
//app.use(express.static(path.join(__dirname, 'client')), );

// entrar a la carpeta client sin que redireccione, de producción de angular. en vez de la llamada de arriba comentada.
//app.use(express.static('client', {redirect:false}))
// sobreiscribe la url 
app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', publication_routes);
app.use('/api', messages_routes);

// reescribir las urls virtuales para que la app de angular active el refresco de su página interna
//'*' cualquier url por get
app.get('*', function(req, res, next){
    // cuando cargue cualquier ruta que no sea una de las de arriba, coge automanticamente lo que se tiene en la url
    res.sendFile(path.resolve('client/index.html'));
});


// app.get('*', function (req, res,next) {
//     const index = path.join(__dirname, 'client', 'index.html');
//     res.sendFile(index);
//   });

//exportar
module.exports = app;
