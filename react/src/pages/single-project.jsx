import PageLoader from "../components/PageLoader";
import React from 'react';
import Api from '../core/Api';
import * as BS from 'react-bootstrap';

class SingleProject extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            app: {},
            utdApp: '',
            utdInfra: '',
            online: '',
            delete: false,
            deleting: false,
            deleteStatus: '',
            services: {},
            servicesError: '',
            servicesLoaderShow: true,
            env: {},
            envError: '',
            envLoaderShow: true
        }
        this.api = new Api();
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEnvChange = this.handleEnvChange.bind(this);
    }

    getApp()
    {
        this.api.post('/apps/single', {
            name: this.appName
        }).then(response =>
        {
            this.setState({
                isLoading: false,
                app: response.data
            })
            this.utdInfra();
            this.utdApp();
            this.onlineStatus();
            this.getServices();
            this.getEnv();
        })
    }

    utdInfra()
    {
        if (this.state.utdInfra)
        {
            delete this.state.utdInfra;
        }

        this.api.post('/infrastructures/utd', {
            name: this.appName
        }).then(response =>
        {
            if (response.data.usingInfrastructure != undefined && response.data.usingInfrastructure === false)
            {
                this.setState({
                    utdInfra: <BS.Badge className="mt-3" bg="primary">Not using infrastructure</BS.Badge>
                });
            }
            else
            {
                let utd = response.data.upToDate;
                if (utd)
                {
                    this.setState({
                        utdInfra: <BS.Badge className="mt-3" bg="success">Infrastructure is up to date</BS.Badge>
                    });
                }
                else
                {
                    this.setState({
                        utdInfra: <BS.Badge className="mt-3" bg="warning">Infrastructure needs updating</BS.Badge>
                    });
                }
            }
        });
    }

    getEnv()
    {
        this.api.post('/apps/env', {
            name: this.appName
        }).then(response =>
        {
            this.setState({
                envLoaderShow: false,
            });

            if (response.data.error)
            {
                console.error(response.data.error.err);
                this.setState({
                    envError: (
                        <BS.Alert variant="danger">
                            <BS.Alert.Heading>Error</BS.Alert.Heading>
                            <p>{response.data.error.err}</p>
                        </BS.Alert>
                    )
                })
            }
            else
            {
                let env = response.data.env.split("\n");
                let complexEnv = [];

                for (let i = 0; i < env.length; i++)
                {
                    if (env[i] === '')
                    {
                        env.splice(i, 1);
                    }
                    else
                    {
                        complexEnv.push({
                            key: env[i].split("=")[0],
                            value: env[i].split("=")[1]
                        });
                    }
                    i++;
                }

                this.setState({
                    env: complexEnv
                })
            }
        })
    }

    getServices()
    {
        this.api.post('/compose/services', {
            name: this.appName
        }).then(response =>
        {
            console.log(response.data);
            this.setState({
                servicesLoaderShow: false,
            });

            if (response.data.error)
            {
                let error = response.data.error.err.split("\n");

                for (let i = 0; i < error.length; i++)
                {
                    if (error[i] === '')
                    {
                        error.splice(i, 1);
                    }
                }

                this.setState({
                    servicesError: (
                        <BS.Alert variant="danger">
                            <h4>Error: Could not retrieve services: </h4>
                            <ol>{error.map((errorItem) => (
                                <li key={errorItem}>{errorItem}</li>
                            ))}</ol>
                        </BS.Alert>
                    )
                })
            }
            else if (response.data.err)
            {
                this.setState({
                    servicesError: (
                        <BS.Alert variant="danger">
                            <h4>Error: </h4>
                            <p>{response.data.out}</p>
                        </BS.Alert>
                    )
                })
            }
            else
            {
                this.setState({
                    services: response.data
                })
            }

            console.log(response.data);
        })
    }

    onlineStatus()
    {
        if (this.state.online)
        {
            delete this.state.online;
        }
        this.api.post('/apps/online', {
            name: this.appName
        }).then(response =>
        {
            if (response.data)
            {
                this.setState({
                    online: <BS.Badge bg="success">App is Online</BS.Badge>
                });
            }
            else
            {
                this.setState({
                    online: <BS.Badge bg="danger">App is Offline</BS.Badge>
                });
            }
        });
    }

    utdApp()
    {
        if (this.state.utdApp)
        {
            delete this.state.utdApp;
        }

        this.api.post('/apps/utd', {
            name: this.appName
        }).then(response =>
        {
            let utd = response.data.upToDate;
            if (utd)
            {
                this.setState({
                    utdApp: <BS.Badge bg="success">App is Up to date</BS.Badge>
                });
            }
            else
            {
                this.setState({
                    utdApp: <BS.Badge bg="warning">App Needs updating</BS.Badge>
                });
            }
        });
    }

    handleClose()
    {
        this.setState({
            delete: false
        });
    }

    handleDelete()
    {
        this.setState({
            deleting: true
        });
        this.api.post('/apps/delete', {
            name: this.appName
        }).then(response =>
        {
            this.setState({
                deleting: false
            })
            if (response.data.success)
            {
                this.setState({
                    deleteStatus: "success"
                });
            }
            else if (response.data.error)
            {
                this.setState({
                    deleteStatus: "fail"
                });
                console.error(response.data.error);
            }
            else
            {
                console.log(response);
            }
        }).catch(error =>
        {
            console.error(error);
            this.setState({
                deleting: false
            })
            this.setState({
                deleteStatus: "fail"
            });
        });
    }

    deleteModal()
    {
        this.setState({
            delete: true
        })
    }

    componentDidMount()
    {
        const params = new URLSearchParams(window.location.search);
        const appName = params.get('name');
        const action = params.get('action');

        if (action)
        {
            switch (action)
            {
                case 'delete':
                    this.deleteModal();
            }
        }

        if (!appName)
        {
            window.location.href = '/projects';
        }
        else
        {
            this.appName = appName;
            this.getApp();
        }
    }

    getDeleteBtn()
    {
        if (this.state.deleting)
        {
            return (
                <BS.Button variant="primary" disabled className="w-100">
                    <BS.Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                </BS.Button>
            );
        }
        else if (this.state.deleteStatus === "fail")
        {
            return (
                <BS.Button disabled variant="danger">
                    Error
                </BS.Button>
            )
        }
        else if (this.state.deleteStatus === "success")
        {
            return (
                <BS.Button disabled variant="success">
                    Success
                </BS.Button>
            )
        }
        else
        {
            return (
                <BS.Button variant="danger" onClick={this.handleDelete}>
                    Yes
                </BS.Button>
            )
        }
    }

    handleEnvChange(event)
    {
        for (let i = 0; i < this.state.env.length; i++)
        {
            if (this.state.env[i].key === event.target.name)
            {
                this.setState({
                    env: this.state.env.slice(0, i).concat([{
                        key: event.target.name,
                        value: event.target.value
                    }]).concat(this.state.env.slice(i + 1))
                });
            }
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
                <>
                    <BS.Container>
                        <BS.Row className="mt-2">
                            {this.state.utdInfra || <BS.Badge bg="secondary"><BS.Spinner animation="border" size="sm" /></BS.Badge>}
                        </BS.Row>
                        <BS.Row className="mt-2">
                            {this.state.utdApp || <BS.Badge bg="secondary"><BS.Spinner animation="border" size="sm" /></BS.Badge>}
                        </BS.Row>
                        <BS.Row className="mt-2">
                            {this.state.online || <BS.Badge bg="secondary"><BS.Spinner animation="border" size="sm" /></BS.Badge>}
                        </BS.Row>
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h1>{this.state.app.name}</h1>
                                <p className="text-muted">{this.state.app.description}</p>
                            </div>
                            <div>
                                <BS.Button>
                                    Edit Info
                                </BS.Button>
                            </div>
                        </div>
                        <BS.Row>
                            <BS.Col>
                                {this.state.servicesLoaderShow ? <BS.Button variant="primary" disabled className="w-100">
                                    <BS.Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="ms-3">Loading Services...</span>
                                    <span className="visually-hidden">Loading...</span>
                                </BS.Button> : ''}
                                {this.state.servicesError}
                            </BS.Col>
                        </BS.Row>
                        <BS.Row>
                            <BS.Col>
                                {this.state.envLoaderShow ? <BS.Button variant="primary" disabled className="w-100">
                                    <BS.Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="ms-3">Loading Env...</span>
                                    <span className="visually-hidden">Loading...</span>
                                </BS.Button> : ''}
                                {this.state.envError}
                                <BS.Form>
                                    {Object.entries(this.state.env).map((env, index) =>
                                    {
                                        return (
                                            <BS.Form.Group className="input-group mb-3" key={index}>
                                                <span className="input-group-text" id={env[0]}>{env[1].key}</span>
                                                <BS.Form.Control onChange={this.handleEnvChange} type="text" aria-describedby={env[0]} aria-label={env[1].value} placeholder={env[1].value} name={[env[1].key]} value={env[1].value} />
                                            </BS.Form.Group>
                                        );
                                    })}
                                    <BS.Button className="mx-2" type="submit">Update</BS.Button>
                                    <BS.Button className="mx-2" type="button" variant="secondary">Regenerate Entries</BS.Button>
                                </BS.Form>
                            </BS.Col>
                        </BS.Row>
                    </BS.Container>
                    <BS.Modal show={this.state.delete} onHide={this.handleClose}>
                        <BS.Modal.Header closeButton>
                            <BS.Modal.Title>Are you sure ?</BS.Modal.Title>
                        </BS.Modal.Header>
                        <BS.Modal.Body>
                            <p>This app will be deleted from Hosting Station.</p>
                        </BS.Modal.Body>
                        <BS.Modal.Footer>
                            {this.getDeleteBtn()}
                            <BS.Button variant="primary" onClick={this.handleClose}>
                                Close
                            </BS.Button>
                        </BS.Modal.Footer>
                    </BS.Modal>
                </>
            )
        }
    }
}

export default SingleProject;