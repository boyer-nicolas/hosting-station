import Api from '../core/Api';
import React from 'react';
import PageLoader from "../components/PageLoader";
import { Link } from 'react-router-dom';
import * as BS from 'react-bootstrap';
import WPLogo from '../images/wp.svg';
import PHPLogo from '../images/php.svg';
import NodeJSLogo from '../images/nodejs.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icon from '@fortawesome/free-solid-svg-icons';

class Projects extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            Apps: {},
            utdInfra: {},
            utdApp: {},
            online: {}
        }

        this.api = new Api();

        this.handleReload = this.handleReload.bind(this);
    }

    cron()
    {
        setInterval(() =>
        {
            this.getApps();
        }, 60000);
    }

    getApps()
    {
        return this.api.get('/apps').then(response =>
        {
            this.setState({
                isLoading: false,
                Apps: response.data,
            });

            Object.entries(response.data).map((item, i) =>
            {
                this.utdApp(item[1].slug);
                this.utdInfra(item[1].slug);
                this.onlineStatus(item[1].slug);
            });
        });
    }

    NoAppsFound()
    {
        return (
            <p>No apps found</p>
        )
    }

    utdApp(name)
    {
        if (this.state.utdApp[name])
        {
            delete this.state.utdApp[name];
        }

        this.api.post('/apps/utd', {
            name: name
        }).then(response =>
        {
            console.log(response);
            if (response.data.usingGit && response.data.usingGit === false)
            {
                this.setState(prevState => ({
                    utdApp: {
                        ...prevState.utdApp,
                        [name]: <BS.Badge className="mt-3" bg="danger">App is not using Git</BS.Badge>
                    }
                }));
            }
            else
            {
                let utd = response.data.upToDate;
                if (utd)
                {
                    this.setState(prevState => ({
                        utdApp: {
                            ...prevState.utdApp,
                            [name]: <BS.Badge className="mt-3" bg="success">App is up to date</BS.Badge>
                        }
                    }));
                }
                else
                {
                    this.setState(prevState => ({
                        utdApp: {
                            ...prevState.utdApp,
                            [name]: <BS.Badge className="mt-3" bg="warning">App needs updating</BS.Badge>
                        }
                    }));
                }
            }
        }).catch(error =>
        {
            console.error(error);
        })
    }

    utdInfra(name)
    {
        if (this.state.utdInfra[name])
        {
            delete this.state.utdInfra[name];
        }
        this.api.post('/infrastructures/utd', {
            name: name
        }).then(response =>
        {
            if (response.data.usingInfrastructure != undefined && response.data.usingInfrastructure === false)
            {
                this.setState(prevState => ({
                    utdInfra: {
                        ...prevState.utdInfra,
                        [name]: <BS.Badge className="mt-3" bg="primary">Not using infrastructure</BS.Badge>
                    }
                }));
            }
            else
            {
                let utd = response.data.upToDate;
                if (utd)
                {
                    this.setState(prevState => ({
                        utdInfra: {
                            ...prevState.utdInfra,
                            [name]: <BS.Badge className="mt-3" bg="success">Infrastructure is up to date</BS.Badge>
                        }
                    }));
                }
                else
                {
                    this.setState(prevState => ({
                        utdInfra: {
                            ...prevState.utdInfra,
                            [name]: <BS.Badge className="mt-3" bg="warning">Infrastructure needs updating</BS.Badge>
                        }
                    }));
                }
            }
        });
    }

    onlineStatus(name)
    {
        if (this.state.online[name])
        {
            delete this.state.online[name];
        }
        this.api.post('/apps/online', {
            name: name
        }).then(response =>
        {
            if (response.data)
            {
                this.setState(prevState => ({
                    online: {
                        ...prevState.online,
                        [name]: <BS.Badge className="mt-3" bg="success">Online</BS.Badge>
                    }
                }));
            }
            else
            {
                this.setState(prevState => ({
                    online: {
                        ...prevState.online,
                        [name]: <BS.Badge className="mt-3" bg="danger">Offline</BS.Badge>
                    }
                }));
            }
        }).catch(error =>
        {
            console.error(error);
        });
    }

    handleReload()
    {
        this.getApps();
    }

    componentDidMount()
    {
        this.getApps();
        // this.cron();
    }

    renderCardImage(type)
    {
        switch (type)
        {
            case 'php':
                return <BS.Card.Img variant="top" src={PHPLogo} />;
            case 'wp':
                return <BS.Card.Img variant="top" src={WPLogo} />;
            case 'nodejs':
                return <BS.Card.Img variant="top" src={NodeJSLogo} />;
            default:
                return <BS.Card.Img variant="top" src={PHPLogo} />;
        }
    }

    render()
    {
        if (this.state.isLoading)
        {
            return <PageLoader />;
        }
        else
        {
            return (
                <div>
                    <h1>Projects</h1>
                    <div className='d-flex justify-content-between'>
                        <Link className='btn btn-primary' to="/new">
                            New <FontAwesomeIcon icon={Icon.faPlus} />
                        </Link>
                        <BS.Button onClick={this.handleReload}>Reload <FontAwesomeIcon icon={Icon.faArrowsRotate} /></BS.Button>
                    </div>
                    <BS.Row className='mt-3'>
                        {!Object.entries(this.state.Apps).length ? <this.NoAppsFound /> : ''}
                        {Object.entries(this.state.Apps).map((item, i) =>
                        {
                            return (
                                <BS.Card className="m-2" key={i} style={{ width: '24rem' }}>
                                    <BS.Card.Body className="d-flex flex-column pt-0 mt-0">
                                        <BS.DropdownButton id="dropdown-basic-button" className="card-dropdown" title={<FontAwesomeIcon className='card-settings-elipsis' icon={Icon.faEllipsisV} />}>
                                            <Link data-rr-ui-dropdown-item className="dropdown-item" to={"/projects/view?name=" + item[1].slug}>View</Link>
                                            <Link data-rr-ui-dropdown-item className="dropdown-item" to={"/projects/view?name=" + item[1].slug}>Update</Link>
                                            <Link data-rr-ui-dropdown-item className="dropdown-item" to={"/projects/view?name=" + item[1].slug + "&action=edit"}>Edit</Link>
                                            <Link data-rr-ui-dropdown-item className="dropdown-item" to={"/projects/view?name=" + item[1].slug + "&action=delete"}>Delete</Link>
                                        </BS.DropdownButton>
                                        {/* <Link to={"/projects/view?name=" + item[1].slug}>
                                            {this.renderCardImage(item[1].type)}
                                        </Link> */}
                                        <BS.Card.Title className='d-flex align-items-center justify-content-between mt-2'>
                                            <Link to={"/projects/view?name=" + item[1].slug}>
                                                {item[1].name}
                                            </Link>
                                        </BS.Card.Title>
                                        <BS.Card.Text className="text-muted">
                                            {item[1].description}
                                        </BS.Card.Text>
                                        {this.state.utdApp[item[1].slug] || <BS.Badge className="mt-3" bg="secondary"><BS.Spinner animation="border" size="sm" /></BS.Badge>}
                                        {this.state.utdInfra[item[1].slug] || <BS.Badge className="mt-3" bg="secondary"><BS.Spinner animation="border" size="sm" /></BS.Badge>}
                                        {this.state.online[item[1].slug] || <BS.Badge className="mt-3" bg="secondary"><BS.Spinner animation="border" size="sm" /></BS.Badge>}
                                    </BS.Card.Body>
                                </BS.Card>
                            )
                        })}
                    </BS.Row>
                </div>
            );
        }
    }
}

export default Projects;