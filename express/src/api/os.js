const express = require('express');
const router = express.Router();
var os = require('os');
var osu = require('node-os-utils');
var mem = osu.mem;
var drive = osu.drive;
var cpu = osu.cpu;
var netstat = osu.netstat;
var oss = osu.os;
const isWsl = require('is-wsl');

function convertToGB(value)
{
    return (value / 1024).toFixed(2);
}

router.get('/cpu', (req, res) =>
{
    cpu.usage()
        .then(cpuPercentage =>
        {
            res.json({
                cpuUsage: (cpuPercentage / 100),
                cpuCount: cpu.count(),
                cpuModel: cpu.model(),
            })
        })
});

router.get('/freemem', (req, res) =>
{
    res.json({
        freemem: convertToGB(mem.free())
    })
});

router.get('/totalmem', (req, res) =>
{
    mem.info().then(mem =>
    {
        res.json({
            totalmem: convertToGB(mem.totalMemMb)
        });
    });
});

router.get('/ramusage', (req, res) =>
{
    mem.used().then(used =>
    {
        let usedRam = used.usedMemMb;
        let totalRam = used.totalMemMb;
        let ramUsage = (usedRam / totalRam) * 100;

        res.json({
            ramUsage: convertToGB(usedRam),
            ramUsagePercentage: ramUsage
        })
    })
});

router.get('/diskusage', (req, res) =>
{
    drive.used().then(used =>
    {
        let usedDisk = used.usedGb;
        let totalDisk = used.totalGb;
        let diskusage = used.usedPercentage;

        res.json({
            diskUsage: usedDisk,
            totalDisk: totalDisk,
            diskUsagePercentage: diskusage
        })
    });
});

router.get('/netinfo', (req, res) =>
{
    netstat.inOut().then(info =>
    {
        res.json({
            in: info.total.inputMb,
            out: info.total.outputMb
        })
    });
});

router.get('/platform', (req, res) =>
{
    let platform = oss.platform();
    if (os.release().toLowerCase().includes('microsoft'))
    {
        platform = oss.platform() + " (Windows Subsystem for Linux)";
    }

    res.json({
        platform: platform,
        hostname: oss.hostname(),
        ip: oss.ip(),
        type: oss.type(),
        arch: oss.arch(),
    });
});

module.exports = router;
