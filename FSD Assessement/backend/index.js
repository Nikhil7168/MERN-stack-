const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PostRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

// Configuration statements
const port = 4000;
app.use(bodyParser.json());


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Contro;-Allow-Headers','Origin,x-Requested-With,Content-type,Accept,Authorization,Role')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE');
    next();
})

app.use('/ap11',PostRoutes);
app.use('/api1',commentRoutes);

app.use((error, req, res, next) => {
    res.status(error.code);
    res.json({ message: error.message || 'Unknown error occured', code: error.code });
});

mongoose.connect('mongodb+srv://nikhilrai:7u1AMABDO9FkAqiw@mernstackcluster.56g0u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(() => {
    app.listen(port, () => {
        console.log('App running')
    });

}).catch(err => {
    console.log(err);
});