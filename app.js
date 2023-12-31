const express = require('express')
const app = express();
const cors = require("cors")
const port = 3000;

const pool = require('./db')

app.use(cors());
app.use(express.json())

//POST

app.post('/todo', async(req, res) => {
        try {

            const {description} = req.body;
            const newTodo = await pool.query(
                "INSERT INTO bench_todo(description) VALUES($1) RETURNING *",
                [description]
            );
           res.json(newTodo.rows[0]) 

       
            
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Server error' });
        }
})

//GET all

app.get('/todo', async(req, res)=> {
        try {
            const allTodo = await pool.query(
                "SELECT * FROM bench_todo"
            )
            res.json(allTodo.rows)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Server error' });
            
        }
})


//GET one
app.get('/todo/:id', async(req, res)=> {
    try {
        const {id} = req.params
        const singleTodo = await pool.query(
            "SELECT * FROM bench_todo WHERE bench_todo_id = $1", [id]
           
            )
           if(singleTodo.rows.length === 0) {
            res.status(404)
            .json({error:'not found'})
           }
            res.json(singleTodo.rows[0])
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Server error' });

    }
})


//UPDATE
app.put("/todo/:id", async(req, res)=> {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            "UPDATE bench_todo SET description = $1 WHERE bench_todo_id = $2", [description, id]
        )
        res.json("todo is updated!")
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Server error' });
    }
})

//DELETE
app.delete("/todo/:id", async(req, res)=> {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM bench_todo WHERE bench_todo_id = $1",[id]
        )
        res.json("todo is deleted!")
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Server error' });
    }
})





//app.listen(port, ()=> console.log(`app listening on port ${port}`))


// 404
app.all("/*", (req, res) => {
    res.status(404).send({ msg: "path not found" });
  });
  

module.exports = app;

// Check if the script is run directly, if so, start the server
if (require.main === module) {
    app.listen(port, () => console.log(`app listening on port ${port}`));
  }
