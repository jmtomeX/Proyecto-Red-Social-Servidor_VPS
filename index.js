// conexion a mongod y creación del server.
"use strict";
// var http = require('http');
// var https = require('https');
const mongoose = require("mongoose");
const app = require("./app");
// utizamos las promesas para conectarnos mediante promesas
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
// para conectar a mongoose

mongoose
  .connect("mongodb://iremti2:HJ1aKts8hlxrYi6U@cluster0-shard-00-00-kq94q.mongodb.net:27017,cluster0-shard-00-01-kq94q.mongodb.net:27017,cluster0-shard-00-02-kq94q.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "La conexión a la base de datos se ha realizado correctamente."
    );
    // settings
    // obtener el puerto si el servidor da un puerto se utiliza, si no usa el 3000
    app.set("port", process.env.PORT || 3000);
    //app.use(express.logger());
   
    // crear servidor
    // app.listen(port, () => {
    //   console.log("Servidor corriendo correctamente");
    // });
    app.listen(app.get('port'), () => {
      console.log('Servidor en puerto ', app.get('port'));
  });
  })
  .catch((err) => console.log(err));

// Hasta aquí ya se puede trabajar con lo base de datos

//arrancar --> cd api/ --> npm start
