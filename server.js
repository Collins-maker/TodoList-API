const express= require('express');

const todoTasks = require('./data')

const app = express();


app.use(express.json())

app.get('/', (req, res)=>{
   res.send('welcome to todolist') 
})

app.get('/todos', (req,res)=>{
    res.json(todoTasks)
})
app.post('/todos',(req, res)=>{
    let body= req.body;
    // console.log(body)
    todoTasks.push(body);
    res.send(body)

})

//deleting an item
app.delete('/todos:id', (req,res)=>{
    const todoID = parseInt(req.params.id);
    const index = todoTasks.findIndex(todo=>todo.id===todoID);
    if (index===-1) {
        return res.status(404).json({error: "todo does not exist"})
        
    }
    todoTasks.splice(index,1)
    res.sendStatus(204)
});

//updating an item
app.put('/todos/:id', (req,res)=>{
    const todoID = parseInt(req.params.id);

    const index = todoTasks.findIndex(todo=>todo.id===todoID);
    let data = todoTasks.filter(todo=>todo.id===todoID)
    console.log(req.body)
    data = req.body
    todoTasks.splice(index,1,data)
    console.log(todoTasks)
     res.json(todoTasks)
     
});

//display singe item
app.get('/todos/:id', (req,res)=>{
    const todoID = parseInt(req.params.id);
    
    let data = todoTasks.filter(todo=>todo.id===todoID)

    res.json(data)

})
    

const port = 4000;

app.listen(port, ()=>console.log(`sever running on port: ${port}`))