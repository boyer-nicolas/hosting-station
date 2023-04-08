const axios = require('axios');
const express = require('express');
require('dotenv').config()
const router = express.Router();

class Api
{
    constructor()
    {

        this.axios = axios.create({
            baseURL: process.env.STRAPI_URL + '/api',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + process.env.STRAPI_TOKEN
            }
        });
    }

    get(url)
    {
        return this.axios.get(url);
    }

    post(url, data)
    {
        return this.axios.post(url, data);
    }

    put(url, data)
    {
        return this.axios.put(url, data);
    }

    delete(url)
    {
        return this.axios.delete(url);
    }
}

module.exports = Api;