const express = require('express');
const router = express.Router();
const api = require('../core/api');

const Api = new api();

router.get('/', (req, res) =>
{
    Api.get('/project-types')
        .then(response =>
        {
            res.json(response.data);
        }
        ).catch(error =>
        {
            res.status(500).json(error);
        }
        );
});

module.exports = router;
