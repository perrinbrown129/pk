const express = require("express");
const app = express();
const PORT = 3003;
const mongoose = require('mongoose')

const bookmarksContoller = require('./controllers/bookmarks.js')

//Middleware
app.use(express.json());

app.use('/bookmarks', bookmarksContoller)

mongoose.connect('mongodb://localhost:27017/holidays', { 
    useNewUrlParser: true 
})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

app.listen(PORT, () => {
  console.log("listening");
});
