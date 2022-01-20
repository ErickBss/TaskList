const express = require('express');
const next = express.Router();

const consign = require('consign');
consign().include('database').into(next);

next.get('/proccess/:id/', (req,res) => {
    let id = req.params.id;
    let data = {
        id: id,
        status:'In Proccess'
    };

    let connection = next.database.connection();
    let databaseUser = new next.database.databaseUser(connection);
    databaseUser.proccess(data,(error,success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });
});

next.get('/pending/:id/', (req,res) => {
    let id = req.params.id;
    let data = {
        id: id,
        status:'Pending'
    };

    let connection = next.database.connection();
    let databaseUser = new next.database.databaseUser(connection);
    databaseUser.proccess(data,(error,success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });
});


module.exports = next;