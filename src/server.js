import { application } from "express";
import express from "express";
const app = express();
const port = 8080;

app.use((req,res,next) => {
    res.sendStatus(404);
})

app.use((error,req,res,next) => {
    console.log(error);
    res.sendStatus(500);
})


app.get('/', (req,res) => {
    res.send('hi! this is port 8080');
})

app.post('/', (req, res) => {
    res.send('got a post request!')
})

app.put('/user', (req,res) => {
    res.send('got a put request at /user')
})

app.delete((req, res) => {
    res.send('got a delete request at /user')
})

app.listen(port, () => {    console.log(`Example app listening on port ${port}`)
})