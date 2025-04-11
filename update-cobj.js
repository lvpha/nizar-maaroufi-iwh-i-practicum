const express = require('express');
const axios = require('axios');
const app = express();
const pug = require('pug');
const token = '';

app.post('/update-cobj', async (req, res) => {

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    const update = {
        properties: {
            "name": req.body.cname,
            "size": req.body.csize,
            "color": req.body.ccolor
        }
    }

    const url = `https://api.hubapi.com/crm/v3/objects/2-41795069`;
   

    try { 
        await axios.post(url, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
res.render('updates');

//app.listen(3000, () => console.log('Listening on http://localhost:3000'));
