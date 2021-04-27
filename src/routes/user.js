const {Router} = require('express');
const router = Router();

const mysqlConnetion = require('../database.js');

// Ruta principal
 router.get('/index', (req, res) => {
    mysqlConnetion.query('SELECT * from hotel', (err, rows, fields) =>{
        if(!err){
            res.render('index.html', {
                title: "Inicio",
                datos: rows
            });
        }else{
            console.log(err);
        }
    });
});

// Ruta para crear nuevo hotel
router.get('/nuevoHotel', (req, res) => {
    res.render('nuevoHotel.html', { title: "Nuevo Hotel" });
});

// Metodo de POST para crear hotel
router.post('/crearNuevoHotel', (req, res) => {
    const {hotelName, categoria, precio, caldelcliente} = req.body;
    mysqlConnetion.query('INSERT INTO hotel SET?', {
        hotelName,
        categoria,
        precio,
        caldelcliente
    }, (err, rows, fields) =>{
        res.redirect('/index');
    });
});

// Ruta para actualziar el hotel
router.get('/actualizarHotel', (req, res) => {
    mysqlConnetion.query('SELECT * from hotel', (err, rows, fields) =>{
        if(!err){
            res.render('actualizarHotel.html', {
                title: "Actualizar Hotel",
                datos: rows
            });
        }else{
            console.log(err);
        }
    });
});

// Actualizar los hotel
router.post('/actualizarDatoHotel', (req, res) => {
    const data = {hotelid, hotelName, categoria, precio, caldelcliente} = req.body;
    mysqlConnetion.query('UPDATE hotel SET ? WHERE id = ?',[data, hotelid], {
        hotelid,
        hotelName,
        categoria,
        precio,
        caldelcliente
    }, (err, rows, fields) =>{
        res.redirect('/index');
    });
});

// Ruta del metodo de actualziar hotel
router.get('/actualizarHotel/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnetion.query('SELECT * from hotel WHERE id = ?',[id], (err, rows, fields) =>{
        if(!err){
            res.render('actualizarHotel.html', {
                title: "Actualizar Hotel",
                datos: rows
            });
        }else{
            console.log(err);
        }
    });
});

// metoo de borrar hotel
router.get('/deleteHotel/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    metodo.delete = (req, res) => {
    const { id } = req.params;
    req.mysqlConnetion((err, connection) => {
        connection.query('DELETE FROM hotel WHERE id = ?', [id], (err, rows) => {
        res.redirect('/index');
        });
    });   
    } 
});

// Metodo de POST para filtar
router.get('/filtrarCategoria', (req, res) => {
    const { categoria } = req.body;
    mysqlConnetion.query('SELECT * from hotel WHERE categoria = ?',[categoria], (err, rows, fields) =>{
        if(!err){
            res.redirect('/index',{
                title: "Inicio",
                datos: rows
            });
        }else{
            console.log(err);
        }
    });
});

// Metodo de POST para filtrar ase y desc
router.get('/index2', (req, res) => {
   mysqlConnetion.query('SELECT * from hotel ORDER BY precio DESC', (err, rows, fields) =>{
            if(!err){
                res.render ('/index',{
                    title: "Inicio",
                    datos: rows
                });
            }else{
                console.log(err);
            }
        });   
});

module.exports = router;
