const sqlite3 = require('sqlite3');
var express = require('express');
var app = express();
app.use(express.json());
var id=0;
let db = new sqlite3.Database("./saral_clone.sqlite3", (err) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
        console.log('Database created!') 
        db.run("CREATE TABLE IF NOT EXISTS courses(id INTEGER PRIMARY KEY AUTOINCREMENT, course_name TEXT, discription TEXT);");
    }
});

app.get('/courses',(req, res) => {
    let db = new sqlite3.Database('./saral_clone.sqlite3', (err) => {
        if (!err){
            db.all("SELECT * FROM courses;", (err, data) => {
                console.log(data);
                return res.send(data);
            })
        }else {
            return res.send('something went wrong');
        }
    })
});

app.get('/courses/:id',(req, res) => {
    let a =req.params.id
    let db = new sqlite3.Database('./saral_clone.sqlite3', (err) => {
        if (!err){
            db.all('SELECT * FROM courses WHERE id ='+a+';', (err, data) => {
                console.log(data);
                return res.send(data);
            })
        }else {
            return res.send('something went wrong');
        }
    })
});

app.post('/courses',(req, res, err) => {
    let name = req.body.course_name;
    let discription = req.body.discription;
    let db = new sqlite3.Database("./saral_clone.sqlite3", (err) => { 
    if (err) { 
        console.log('somthing went wrong', err) 
    } else {
        db.run('INSERT INTO courses(course_name, discription) VALUES(" ' +name + ' " , " ' + discription + ' ");')
        return res.send("Posting successfully")
        }
})
});

app.put('/courses/:id', (req, res, err) => {
    let name = req.body.course_name;
    let discription = req.body.discription;
    let db = new sqlite3.Database("./saral_clone.sqlite3", (err) => { 
    if (err) { 
        console.log('somthing went wrong', err) 
    } else {
        console.log('UPDATE courses SET course_name ="'+name+'and discription="'+discription+'" WHERE id = '+req.params.id+';')
        db.run('UPDATE courses SET course_name ="'+name+'" , discription="'+discription+'" WHERE id = '+req.params.id+';');
        return res.send("your data is updated successfully!")
        }
    })
});

let db2 = new sqlite3.Database("./saral_clone.sqlite3", (err) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
        console.log('Database created!') 
        db.run("CREATE TABLE IF NOT EXISTS exercise (course_id INTEGER, id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT, content TEXT, hint TEXT);");
    }
});

app.get('/courses/:id/exercise', (req, res, err) =>{
    let db2 = new sqlite3.Database('./saral_clone.sqlite3', (err) => {
        if (!err){
            db2.all('SELECT topic,content,hint FROM exercise WHERE course_id ='+req.params.id+';', (err, data) => {
                console.log(data);
                return res.send(data);
            })
        }else {
            return res.send('something went wrong');
        }
    })
});
app.post('/courses/:id/exercise',(req, res, err) => {
    let name = req.body.course_name;
    let content = req.body.content;
    let hint = req.body.hint;
    let db2 = new sqlite3.Database("./saral_clone.sqlite3", (err) => { 
    if (err) { 
        res.send('somthing went wrong', err) 
    } else {
        console.log('INSERT INTO exercise(course_id, topic, content, hint) VALUES("'+req.params.id+'" , "'+name+'" , "'+content+'" , "'+hint+'");');
        db2.run('INSERT INTO exercise(course_id, topic, content, hint) VALUES("'+req.params.id+'" , "'+name+'" , "'+content+'" , "'+hint+'");');
        return  res.send("Post successfully")
        
        }
})
});
app.put('/courses/:id/exercise/:exercise', (req, res, err) =>{
    let name = req.body.course_name;
    let content = req.body.content;
    let hint = req.body.hint;
    let db2 = new sqlite3.Database("./saral_clone.sqlite3", (err) => { 
    if (err) { 
        return res.send('somthing went wrong', err) 
    } else {
        db.run('UPDATE exercise SET topic ="'+name+'" , content="'+content+'" WHERE course_id = '+req.params.exercise+' and id = '+id+';');
        }
})
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log('Start')
});

