// conexion a mongod y creación del server.
"use strict";
const mongoose = require("mongoose");
const app = require("./app");
// utizamos las promesas para conectarnos mediante promesas
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
// para conectar a mongoose
mongoose
  .connect("mongodb://localhost:27017/curso_mean_social", {
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
