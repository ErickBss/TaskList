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
            var completed = success.map( function (item){
                if(item.status === 'Completed'){
                    return item;
                }
            });
            console.log(completed);
            let size = Object.keys(success).length;
            res.render('index.ejs', {'tasks': success, 'size':size} );
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

/* Server Door */

app.listen(3000, () =>{
    console.log('Server Working');

})