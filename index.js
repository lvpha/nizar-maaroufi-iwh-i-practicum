const express = require('express');
const axios = require('axios');
const app = express();
const pug = require('pug');
const PRIVATE_APP_ACCESS = 'pat-na1-577f70d7-9d97-4da6-be15-072019597741';

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {
    const colosses = 'https://api.hubspot.com/crm/v3/objects/colosses';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    const params = {
        properties: 'name,color,size'
    }

        const response = await axios.get(colosses, {
            headers: headers,
            params: params 
        });

        const data = response.data.results;

        res.render('colosses', { title: 'HubSpot APIs', data });
        
    })



// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.


app.get('/updates', async (req, res) => {
    const colosses = 'https://api.hubspot.com/crm/v3/objects/colosses';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
        
    })

    // TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.


app.post('/updates', async (req, res) => {
    const update = {
        properties: {
            "name": req.body.cname,
            "size": req.body.csize,
            "color": req.body.ccolor
        }
    }


    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
try {

    await axios.post('https://api.hubapi.com/crm/v3/objects/2-41795069', update, { headers });
  
} 

catch(err) {
    console.error(err);
}
res.redirect('http://localhost:3000/');

});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));