require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = process.env.PORT || 3000;
const Mongo_url = process.env.MONGO_URI || 'mongodb://mongo:27017/yourDatabaseName'

async function Dbconnection() {
    await mongoose.connect(Mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{console.log("connect database successful")}).catch(e=>console.log(e));
}
Dbconnection()
// Create a Mongoose model
const Email = mongoose.model('Email', {
    email: String,
});

app.get('/', (req, res) => {
    res.send('Your React app is running!');
});

app.post('/add-email', async (req, res) => {
    const { email } = req.body;
    try {
        const newEmail = new Email({ email });
        await newEmail.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error adding email');
    }
});

app.get('/emails', async (req, res) => {
    try {
        const emails = await Email.find({});
        res.json(emails);
    } catch (error) {
        res.status(500).send('Error fetching emails');
    }
});

app.get('/crash', (req, res) => {
    // console.log("server crash")
    throw Error("server internal error")
});
app.get('/health', (req, res) => {
    res.send('health is ok !');
});

app.get('/exit', (req, res) => {
    // Perform actions to stop the server or any other desired actions
    res.send('Server stopped');
    process.exit(0); // This stops the server (not recommended in production)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});