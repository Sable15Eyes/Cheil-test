const mysql = require('mysql');

// Estableciendo Conexion 
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cheil-prueba'
});

// Validacio de la conexion con la base de datos
conexion.connect((error) => {
    if(error){
        console.log(error);
    }else{
        console.log("Conexion Exitosa");
    }
})

module.exports = conexion;