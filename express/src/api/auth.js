const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config()


class Auth
{
    constructor()
    {
        this.axios = axios.create({
            baseURL: process.env.STRAPI_URL + "/api",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        router.post('/login', (req, res) =>
        {
            this.login(req, res);
        });

        router.post('/register', (req, res) =>
        {
            this.register(req, res);
        });
    }

    login(req, res)
    {
        this.axios
            .post('/auth/local', {
                identifier: req.body.email,
                password: req.body.password,
            })
            .then(response =>
            {
                res.json({
                    success: response.data
                });
            }).catch(error =>
            {
                if (error.response.status === 400)
                {
                    res.json({
                        error: "Invalid credentials"
                    });
                }
                else
                {
                    res.json({
                        error: error
                    });
                }
            });
    }

    register(req, res)
    {
        this.axios
            .post('/auth/local', {
                username: 'salokain',
                email: 'nicolas@niwee.fr',
                password: 'Proutprout63!',
            })
            .then(response =>
            {
                res.json({
                    success: response.data
                });
            })
            .catch(error =>
            {
                res.json({
                    error: error
                });
            });
    }
}

new Auth;
module.exports = router;
