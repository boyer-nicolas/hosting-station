const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

router.get('/', (req, res) =>
{
    swaggerUi.serve;
    swaggerUi.setup(swaggerFile);
});

module.exports = router;

