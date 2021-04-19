const express = require('express');
const request = require('request'); 
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch')
//const firebase = require('../client/src/firebase')

var cors = require('cors')

require('dotenv').config()

const app = express();


//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: 'http://localhost:3000'}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    next();
});

app.post('/api/subscribe', (req, res) => {
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

    request(options, (err, response, body) => {
        if (err)
            res.json({error:err}),
            console.log('SOMETHING FUCKED UP')
        else {
            console.log(`Successfully added ${email}`)
            res.sendStatus(200);
        }
    });
})

app.get('/api/getList', (req, res) => {
    const options = {
        //url: `https://${process.env.MC_DC}.api.mailchimp.com/3.0/lists/${process.env.MC_AUDIENCE_ID}/members`,
        method:'GET',
        headers: {
            Authorization: `auth ${process.env.MC_API_KEY}`
        },
        mode: 'no-cors'
    }   

    fetch(`https://${process.env.MC_DC}.api.mailchimp.com/3.0/lists/${process.env.MC_AUDIENCE_ID}/members`,options)
    .then(response => response.json())
    .then(data => {
        //set response status code and content type
        res.writeHead(200, { "Content-Type": "text/html" });
        // // set response content
        res.write(JSON.stringify(data.members.map((member) => ({
            email: member.email_address,
            status: member.status
        }))))
        return res.end();

       
        // res.json(data.members.map((member) => ({
        //     email: member.email_address,
        //     status: member.status
        // })))
    })
    .catch(error => {
        console.log(error)
    })
    // request(options, (err, response, body) => {
    //     if (err) {
    //         res.json({error:err})
    //     }
    //     else {
    //         console.log('statusCode:', response && response.statusCode);
    //         if (response.statusCode===200) {
    //             // //set response status code and content type
    //             // res.writeHead(200, { "Content-Type": "application/json" });
    //             // // set response content
    //             // res.write(JSON.parse(JSON.parse(body).members.map(a => a.email_address)))
    //             // return res.end();
    //             res.json(JSON.parse(body).members.map(a => 
    //                 a.email_address
    //                 // {    
    //                 //     a.email_address,
    //                 //     a.status
    //                 // }
    //             ));
                
    //         }
            
    //     }
    // });
})


app.get('/api/test', (req, res) => res.sendFile(path.join(__dirname,'public/index.html')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));