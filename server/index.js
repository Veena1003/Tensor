// server/index.js
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./adminsdk.json');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'firebase-adminsdk-7bx3w@tensorgo-92cd3.iam.gserviceaccount.com',
});

// Routes
app.post('/submit-form', async (req, res) => {


    try {
        console.log(req.body)
        const { email, text, option } = req.body;
        const db = admin.firestore();
        const userRef = db.collection('users').doc(email);
        await userRef.collection('requests').add({ text, option });
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.log(req)
        console.error('Error submitting form:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
});

app.get('/get-submissions/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const db = admin.firestore();
        const userRef = db.collection('users').doc(email);
        const submissionsSnapshot = await userRef.collection('requests').get();
        const submissionsData = submissionsSnapshot.docs.map(doc => doc.data());
        console.log(submissionsData)
        //   const submissionsData = submissionsSnapshot.docs.map(doc => doc.data());
        res.status(200).json(submissionsData);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
