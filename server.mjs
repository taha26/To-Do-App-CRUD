import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
const app = express()
const port = process.env.port || 3000



let todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: String,
    createdOn: { type: Date, default: Date.now }
});
const todoModel = mongoose.model('todos', todoSchema);



app.use(express.json());
app.use(cors())

// let todos = [];

app.get('/todos', (req, res) => {

    todoModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "here is you todo list",
                data: data
            })
        }else{
            res.status(500).send({
                message: "server error"
            })
        }
    });

})
app.post('/item', (req, res) => {
    // todos.push(req.body.text)



    todoModel.create({ text: req.body.text }, (err, saved) => {
        if (!err) {
            console.log(saved);

            res.send({
                message: "your todo is saved",
        // data:todos,
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    })

})

app.delete('/todos', (req, res) => {

    todoModel.deleteMany({}, (err, data) => {
        if (!err) {
            res.send({
                message: "All Todo has been deleted successfully",
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.delete('/todo/:id', (req, res) => {

    todoModel.deleteOne({ _id: req.params.id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Todo has been deleted successfully",
                })
            } else {
                res.send({
                    message: "No todo found with this id: " + req.params.id,
                })
            }


        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



let dbURI = 'mongodb+srv://ibtihaj_ali:hahaflat202@todo.hj5dqzx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});