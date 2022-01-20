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

/* GETS */

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


app.get('/delete/:id/', (req,res)=>{
    let id= req.params.id;
    
    let connection = app.database.connection();
    let databaseUser = new app.database.databaseUser(connection);
    databaseUser.delete(id,(error,success) => {
        if(error){
            console.log(error);
        }
        res.redirect('/');
    });
});


const next = require('./routes/nexts');
app.use('/', next);

const postRouter = require('./routes/posts');
app.use('/posts', postRouter);



/* Server Door */

app.listen(3000, () =>{
    console.log('Server Working');

})