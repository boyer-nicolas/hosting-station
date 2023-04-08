import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import * as BS from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart'
import Api from '../core/Api';

class Index extends React.Component
{

    constructor(props)
    {
        super(props);
        this.api = new Api();
        this.state = {
            cpuCount: 0,
            cpuUsage: 0,
            ramUsage: 0,
            ramUsagePercentage: 0,
            totalmem: 0,
            diskUsage: 0,
            diskUsagePercentage: 0,
            netIn: 0,
            netOut: 0,
        }

        this.getAllData();
        // this.cron();
    }

    cron()
    {
        setInterval(() =>
        {
            this.getAllData();

        }, 10000);
    }

    getAllData()
    {
        this.getCpu();
        this.getTotalRam();
        this.getRamUsage();
        this.getDiskUsage();
        this.getNetUsage();
        this.getPlatform();
    }

    getCpu()
    {
        this.api.get('/os/cpu').then(res =>
        {
            this.setState({
                cpuCount: res.data.cpuCount,
                cpuUsage: res.data.cpuUsage,
                cpuModel: res.data.cpuModel,
            });
        });
    }

    getTotalRam()
    {
        this.api.get('/os/totalmem').then(res =>
        {
            this.setState({
                totalmem: res.data.totalmem,
            });
        })
    }

    getRamUsage()
    {
        this.api.get('/os/ramusage').then(res =>
        {
            this.setState({
                ramUsage: res.data.ramUsage,
                ramUsagePercentage: (res.data.ramUsagePercentage / 100),
            });
        })
    }

    getDiskUsage()
    {
        this.api.get('/os/diskusage').then(res =>
        {
            this.setState({
                diskUsage: res.data.diskUsage,
                totalDisk: res.data.totalDisk,
                diskUsagePercentage: (res.data.diskUsagePercentage / 100),
            });
        })
    }

    getNetUsage()
    {
        this.api.get('/os/netinfo').then(res =>
        {
            this.setState({
                netIn: res.data.in,
                netOut: res.data.out,
            });
        })
    }

    getPlatform()
    {
        this.api.get('/os/platform').then(res =>
        {
            this.setState({
                platform: res.data.platform,
                hostname: res.data.hostname,
                ip: res.data.ip,
                type: res.data.type,
                arch: res.data.arch,
            });
        });
    }

    render()
    {
        return (
            <div >
                <h1>Dashboard summary.</h1>
                <h5><span className='text-primary'>Hey Nicolas</span>, good to see you.</h5>
                <BS.Row className='mt-5'>
                    <BS.Col>
                        <h2>Server Stats</h2>
                        <BS.Row className='mb-3'>
                            <BS.Col>
                                <BS.Card>
                                    <h5>Platform: {this.state.platform}</h5>
                                    <h5>Hostnmae: {this.state.hostname}</h5>
                                    <h5>IP: {this.state.ip}</h5>
                                    <h5>Type: {this.state.type}</h5>
                                    <h5>Arch: {this.state.arch}</h5>
                                </BS.Card>
                            </BS.Col>
                        </BS.Row>
                        <BS.Row>
                            <BS.Col xs={12} sm={6} md={6} lg={3} className="my-2">
                                <BS.Card>
                                    <h4 className='text-center font-bold'>CPU Usage</h4>
                                    <GaugeChart id="cpu-load"
                                        nrOfLevels={100}
                                        arcsLength={[0.7, 0.3]}
                                        colors={['#ff7750', '#dc3545']}
                                        percent={this.state.cpuUsage}
                                        arcPadding={0.02}
                                        textColor="#000000"
                                        needleColor="#4e37b2"
                                        needleBaseColor="#ff7750"
                                        animate={true}
                                    />
                                    <h6 className='text-center'>Model: {this.state.cpuModel}</h6>
                                    <h6 className='text-center'>Cores Used: {this.state.cpuCount}</h6>
                                </BS.Card>
                            </BS.Col>
                            <BS.Col xs={12} sm={6} md={6} lg={3} className="my-2">
                                <BS.Card>
                                    <h4 className='text-center font-bold'>Ram Usage</h4>
                                    <GaugeChart id="ram-load"
                                        nrOfLevels={100}
                                        arcsLength={[0.7, 0.3]}
                                        colors={['#ff7750', '#dc3545']}
                                        percent={this.state.ramUsagePercentage}
                                        arcPadding={0.02}
                                        textColor="#000000"
                                        needleColor="#4e37b2"
                                        needleBaseColor="#ff7750"
                                        animate={true}
                                    />
                                    <h6 className='text-center'>{this.state.ramUsage} Go of {this.state.totalmem} Go</h6>
                                </BS.Card>
                            </BS.Col>
                            <BS.Col xs={12} sm={6} md={6} lg={3} className="my-2">
                                <BS.Card className='bg-secondary'>
                                    <h4 className='text-center font-bold text-white'>Storage Usage</h4>
                                    <GaugeChart id="ram-load"
                                        nrOfLevels={100}
                                        arcsLength={[0.7, 0.3]}
                                        colors={['#fff', '#dc3545']}
                                        percent={this.state.diskUsagePercentage}
                                        arcPadding={0.02}
                                        textColor="#fff"
                                        needleColor="#4e37b2"
                                        needleBaseColor="#fff"
                                        animate={true}
                                    />
                                    <h6 className='text-center text-white'>{this.state.diskUsage} go of {this.state.totalDisk} Go</h6>
                                </BS.Card>
                            </BS.Col>
                            <BS.Col xs={12} sm={6} md={6} lg={3} className="my-2">
                                <BS.Card>
                                    <div>
                                        <h4 className='text-center font-bold'>Network Usage</h4>
                                        <h5 className='text-center font-bold'>Inbound</h5>
                                        <GaugeChart id="ram-load"
                                            nrOfLevels={100}
                                            arcsLength={[0.7, 0.3]}
                                            colors={['#ff7750', '#dc3545']}
                                            percent={this.state.netIn}
                                            arcPadding={0.02}
                                            textColor="#000000"
                                            needleColor="#4e37b2"
                                            needleBaseColor="#ff7750"
                                            animate={true}
                                        />
                                    </div>
                                    <div>
                                        <h5 className='text-center font-bold'>Outbound</h5>
                                        <GaugeChart id="ram-load"
                                            nrOfLevels={100}
                                            arcsLength={[0.7, 0.3]}
                                            colors={['#ff7750', '#dc3545']}
                                            percent={this.state.netOut}
                                            arcPadding={0.02}
                                            textColor="#000000"
                                            needleColor="#4e37b2"
                                            needleBaseColor="#ff7750"
                                            animate={true}
                                        />
                                    </div>
                                </BS.Card>
                            </BS.Col>
                        </BS.Row>
                    </BS.Col>
                </BS.Row>
            </div>
        );
    }
}

export default Index;