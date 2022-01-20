const express = require('express');
const router = express.Router();

const consign = require('consign');
consign().include('database').into(router);


router.post('/task', (req,res) => {

    data= req.body.task;
    let status = 'Pending';
    var data = {
        status: status,
        task: data
    };
 
    let connection = router.database.connection();
    let databaseUser = new router.database.databaseUser(connection); 
    databaseUser.register(data, (error, success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });

});

router.post('/changes/:id', (req,res) =>{
    let id = req.params.id;
    let data = {
        id: id,
        status: req.body.status,
        task : req.body.task
    };

    let connection = router.database.connection();
    let databaseUser = new router.database.databaseUser(connection);
    databaseUser.change(data,(error,success) =>{
        if(error){
            console.log(error);
        }
        res.redirect('/');
    }); 
});

router.post('/done/:id/', (req,res) => {
    let id = req.params.id;
    let data = {
        id: id,
        status:'Completed'
    };

    let connection = router.database.connection();
    let databaseUser = new router.database.databaseUser(connection);
    databaseUser.done(data,(error,success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });
});

router.post('/undone/:id/', (req,res) => {
    let id = req.params.id;
    let data = {
        id: id,
        status:'Pending'
    };

    let connection = router.database.connection();
    let databaseUser = new router.database.databaseUser(connection);
    databaseUser.done(data,(error,success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });
});

module.exports = router
