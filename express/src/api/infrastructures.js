const express = require('express');
const router = express.Router();
const api = require('../core/api');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

class Infrastructures
{
    constructor()
    {
        this.projectsDir = '/var/opt/projects';
        this.api = new api();

        router.get('/', (req, res) =>
        {
            this.index(req, res);
        });

        router.post('/utd', (req, res) =>
        {
            this.utd(req, res);
        });
    }

    index(req, res)
    {
        this.api.get('/infrastructures')
            .then(response =>
            {
                res.json(response.data);
            }
            ).catch(error =>
            {
                console.error(error.toString());
                res.status(500).json(error);
            });
    }

    utd(req, res)
    {
        if (fs.existsSync(`${this.projectsDir}/${req.body.name}/app`))
        {
            const git = simpleGit(`${this.projectsDir}/${req.body.name}`);
            git.fetch('origin', 'main', (err, update) =>
            {
                if (err)
                {
                    res.json({
                        upToDate: false
                    })
                }
                else
                {
                    git.status().then((status) =>
                    {
                        if (status.behind > 0)
                        {
                            res.json({
                                upToDate: false
                            })
                        }
                        else
                        {
                            res.json({
                                upToDate: true
                            })
                        }
                    });
                }
            });
        }
        else
        {
            res.json({
                upToDate: false,
                usingInfrastructure: false
            })
        }
    }
}

new Infrastructures();

module.exports = router;
