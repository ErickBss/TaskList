const express = require('express');
const app = express();
const consign = require('consign');
consign().include('database').into(app);
const session = require('express-session');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'dolist',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:700000}
}));

/* ENTRIES */

app.get('/', (req,res) =>{
    let connection = app.database.connection();
    let databaseUser = new app.database.databaseUser(connection); 
    databaseUser.selectTasks( (error, success) => {
        if(error){
            console.log(error);
        }
        else{
            var pending = success.filter( function (item){
                if(item.status == 'Pending'){
                    return item;
                }
              
            });
            var proccess = success.filter( function (item){
                if(item.status == 'In Proccess'){
                    return item;
                }
              
            });
            var completed = success.filter( function (item){
                if(item.status == 'Completed'){
                    return item;
                }
              
            });
            
            let size = Object.keys(pending).length;
            let size2 = Object.keys(proccess).length;
            let size3 = Object.keys(completed).length;

           res.render('index.ejs', {'pending': pending, 'proccess': proccess, 'completed': completed, 'size':size, 'size2':size2,'size3':size3} ); 
        }
    });

       
});

app.post('/task', (req,res) => {

    data= req.body.task;
    let status = 'Pending';
    var data = {
        status: status,
        task: data
    };
 
    let connection = app.database.connection();
    let databaseUser = new app.database.databaseUser(connection); 
    databaseUser.register(data, (error, success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });

});

app.get('/config/:id', (req,res) =>{
    
    let id = req.params.id;

    let connection = app.database.connection();
    let databaseUser = new app.database.databaseUser(connection);
    databaseUser.search(id,(error,success) => {
        if(error){
            console.log(error);
        }

        res.render('config.ejs',{'tasks':success[0]});
    });
});

app.post('/changes/:id', (req,res) =>{
    let id = req.params.id;
    let data = {
        id: id,
        status: req.body.status,
        task : req.body.task
    };

    let connection = app.database.connection();
    let databaseUser = new app.database.databaseUser(connection);
    databaseUser.change(data,(error,success) =>{
        if(error){
            console.log(error);
        }
        res.redirect('/');
    }); 
});

app.post('/done/:id/', (req,res) => {
    let id = req.params.id;
    let data = {
        id: id,
        status:'Completed'
    };

    let connection = app.database.connection();
    let databaseUser = new app.database.databaseUser(connection);
    databaseUser.done(data,(error,success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });
});

/* Server Door */

app.listen(3000, () =>{
    console.log('Server Working');

})