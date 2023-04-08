import React from 'react';
import Api from '../core/Api';
import * as BS from 'react-bootstrap';

class TestExpressApi extends React.Component
{
    constructor(props)
    {
        super(props);
        this.api = new Api();
        this.state = {
            show: false
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose()
    {
        this.setState({
            show: false
        });
    }

    test()
    {
        this.api.get('/test').then(response =>
        {
            this.setState({
                show: false
            });
        }).catch(error =>
        {
            console.error('Express API: DOWN.');
            console.log(error);
            this.setState({
                show: true
            });

            const closeBtn = document.querySelector('.btn-close');
            closeBtn.addEventListener('click', () =>
            {
                this.handleClose();
            });
        });
    }

    componentDidMount()
    {
        this.test();
        setInterval(() =>
        {
            this.test();
        }, 30000);
    }

    render()
    {
        return (
            <>
                <BS.Modal show={this.state.show} onHide={this.handleClose}>
                    <BS.Modal.Header closeButton>
                        <BS.Modal.Title>Whoops...</BS.Modal.Title>
                    </BS.Modal.Header>
                    <BS.Modal.Body>
                        <p>The Express API seems to be down.</p>
                        <p>Try to restart this instance to fix the problem.</p>
                        <p>If you have modified files in this API, try and save one to restart it.</p>
                    </BS.Modal.Body>
                    <BS.Modal.Footer>
                        <BS.Button variant="primary" onClick={this.handleClose}>
                            Close
                        </BS.Button>
                    </BS.Modal.Footer>
                </BS.Modal>
            </>
        );
    }
}

export default TestExpressApi;