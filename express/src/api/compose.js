const express = require('express');
const router = express.Router();
const dCompose = require('docker-compose');
const fs = require('fs');

class Compose
{
    constructor()
    {
        this.projectsDir = '/var/opt/projects';

        router.post('/', (req, res) =>
        {
            res.json({
                "docker-compose": "1.0.0"
            })
        });

        router.post('/ps', (req, res) =>
        {
            this.ps(req, res);
        });

        router.post('/services', (req, res) =>
        {
            this.services(req, res);
        });

        router.post('/check', (req, res) =>
        {
            this.check(req, res);
        });
    }

    services(req, res)
    {
        if (!req.body.name)
        {
            return res.json({
                error: 'Project name is required'
            });
        }

        const path = this.projectsDir + '/' + req.body.name;

        if (fs.existsSync(path + '/.env.template'))
        {
            fs.copyFileSync(path + '/.env.template', path + '/.env');
        }

        dCompose.configServices({
            cwd: path,
            log: true
        }).then((data) =>
        {
            res.json(data);
        }, (err) =>
        {
            res.json({
                error: err
            });
        });
    }

    check(req, res)
    {
        const path = this.projectsDir + '/' + req.body.name;

        dCompose.config({
            cwd: path,
            log: true
        }).then((data) =>
        {
            res.json(data);
        }, (err) =>
        {
            res.json({
                error: err
            });
        });
    }

    ps(req, res)
    {
        if (!req.body.name)
        {
            return res.json({
                error: 'Project name is required'
            });
        }

        const path = this.projectsDir + '/' + req.body.name;

        dCompose.ps({
            cwd: path,
            log: true
        }).then((data) =>
        {
            res.json(data);
        }, (err) =>
        {
            res.json({
                error: err
            });
        });
    }
}

new Compose();

module.exports = router;

