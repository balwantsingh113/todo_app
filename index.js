const express = require('express');
const fs=require("fs");
const app = express();
app.use(express.json())
app.use(express.static('src'));

app.get("/",function(req,res){
res.render("/src/index.html")
});

app.get("/getTasks",function(req,res){
    var obj=[];
    fs.readFile('todo.json', 'utf8', function readFileCallback(err, data){
        if (err){
            var obj1=[];
            console.log("Error reading from file, creating new");
            fs.writeFile('todo.json', JSON.stringify(obj1),'utf8', function(err){
            }); // write it back 
            res.json();
        } else {
            console.log(data);
        obj  = JSON.parse(data); //now it an object
        res.json(obj);
    }});
});

app.post("/addTask",function(req,res){
    var obj = [];
    fs.readFile('todo.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
            res.send("Error");
        } else {
        obj = JSON.parse(data); //now it an object
        var newTask ={
            "id":obj.length+1,
            "description":req.body["description"],
            "completed":req.body["completed"]
        };
        console.log(newTask);
        obj.push(newTask);
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('todo.json', json, 'utf8',(err)=>{
        }); // write it back 
        res.send("Saved");
    }});
});

app.delete("/deleteTask/:id",function(req,res){
    var obj = [];
    fs.readFile('todo.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
            res.send("Error");
        } else {
        obj = JSON.parse(data); //now it an object
        var newTaskList=[];
        obj.forEach(task => {
            if(req.params.id != task.id){
                newTaskList.push(task);
            }
        });
        var i=1;
        newTaskList.forEach(task=>{
            task.id=i;
            i++;
        });
      //  console.log(newTask);
       // obj.push(newTask);
        json = JSON.stringify(newTaskList); //convert it back to json
        fs.writeFile('todo.json', json, 'utf8',(err)=>{
        }); // write it back 
        res.send("Saved");
    }});
});

app.delete("/deleteCompletedTasks/",function(req,res){
    var obj = [];
    fs.readFile('todo.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
            res.send("Error");
        } else {
        obj = JSON.parse(data); //now it an object
        var newTaskList=[];
        obj.forEach(task => {
            if(!task.completed){
                newTaskList.push(task);
            }
        });
        var i=1;
        newTaskList.forEach(task=>{
            task.id=i;
            i++;
        });
      //  console.log(newTask);
       // obj.push(newTask);
        json = JSON.stringify(newTaskList); //convert it back to json
        console.log(json)
        fs.writeFile('todo.json', json, 'utf8',(err)=>{
        }); // write it back 
        res.send("Saved");
    }});
});

app.post("/updateTask/:id",function(req,res){
    var obj = [];
    fs.readFile('todo.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
            res.send("Error");
        } else {
        obj = JSON.parse(data); //now it an object
        obj.forEach(task => {
            if(req.params.id == task.id){
                if(task.completed)
                    task.completed = false;
                else 
                    task.completed = true;
            }
        });
      //  console.log(newTask);
       // obj.push(newTask);
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('todo.json', json, 'utf8',(err)=>{
        }); // write it back 
        res.send("Saved");
    }});
});

app.listen(3000,()=>{
console.log("App started");
});