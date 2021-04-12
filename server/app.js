const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const testData = {
    name: 'Josh',
    age: '30',
    account_balance: '15.5'
}

app.post('/subscribe', (req, res) => {
    const { email , js } = req.body;
    console.log(req.body);

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
        url: '86b56758af',
        method:'POST',
        headers: {
            Authorization: 'auth b055aac03b452f1891f0bf78b154342e-us1'
        },
        body: mcDataPost
    }

    if (email) {
        request(options, (err, response, body) => {
            if (err) {
                res.json({error: err})
            } else {
                if (js) {
                    res.sendStatus(200);
                }
            }
        })
    } else [
        res.status(404).send({message: 'Failed'})
    ]
})


app.get('/', (req, res) => res.send(testData))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));