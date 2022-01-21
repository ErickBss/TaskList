const express = require('express');
const next = express.Router();

const consign = require('consign');
consign().include('database').into(next);

next.get('/process/:id/', (req,res) => {
    let id = req.params.id;
    let data = {
        id: id,
        status:'In Process'
    };

    let connection = next.database.connection();
    let databaseUser = new next.database.databaseUser(connection);
    databaseUser.process(data,(error,success) => {
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
    databaseUser.process(data,(error,success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });
});


module.exports = next;