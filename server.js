const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const app = express();

const Users = require('./routes/api/Users');
const Profile = require('./routes/api/Profile');
const Post = require('./routes/api/Posts');


// Routes
env.config();

// DB Connect
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.z8hin.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
});

// Use Routes
app.use('/api/users', Users);
app.use('/api/profile', Profile);
app.use('/api/posts', Post);

// Port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});