const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config()

const app = express();


//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const testData = {
    name: 'Josh',
    age: '30',
    account_balance: '15.5'
}

app.post('/subscribe', (req, res) => {
    const { fullName, email } = req.body;

    const mcData = {
        members: [
            {
                email_address: email,
                status: 'pending'
            }
        ]
    }

    const mcDataPost = JSON.stringify(mcData);

    const options = {
        url: `https://${process.env.MC_DC}.api.mailchimp.com/3.0/lists/${process.env.MC_AUDIENCE_ID}`,
        method:'POST',
        headers: {
            Authorization: `auth ${process.env.MC_API_KEY}`
        },
        body: mcDataPost
    }
    console.log(options)

    request(options, (err, response, body) => {
        if (err)
            res.json({error:err})
        else
            res.sendStatus(200);
    });
})


app.get('/api/form', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));