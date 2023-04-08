import React from 'react';
import Api from '../core/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import * as BS from 'react-bootstrap';
import Pristine from 'pristinejs';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.api = new Api();
        this.state = {
            value: '',
            formValid: false,
            disabled: false,
            reqSuccess: false,
            reqSent: false,
            retry: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    login()
    {
        this.api.get('/auth/login').then(response =>
        {
            if (response.data.error)
            {
                console.log(response.data.error);
            }
            else
            {
                console.log(response.data.success);
            }
        });
    }

    handleChange(event)
    {
        this.setState({ value: event.target.value });

        let formInputs = document.querySelectorAll('#new-app-form input');
        for (let i = 0; i < formInputs.length; i++)
        {
            if (formInputs[i].parentNode.classList.contains('is-invalid'))
            {
                formInputs[i].classList.add('is-invalid');
            }
            else
            {
                formInputs[i].classList.remove('is-invalid');
            }

            if (formInputs[i].parentNode.classList.contains('is-valid'))
            {
                formInputs[i].classList.add('is-valid');
            }
            else
            {
                formInputs[i].classList.remove('is-valid');
            }
        }
    }

    handleSubmit(event)
    {
        event.preventDefault();
        let valid = this.pristine.validate();
        this.form.classList.add('was-validated');

        if (valid)
        {
            let submitBtn = document.getElementById('login-btn');
            submitBtn.classList.add('loading');
            this.setState({
                formValid: true,
                disabled: true,
            });

            this.api.post('/auth/login', {
                email: event.target.email.value.toLowerCase(),
                password: event.target.password.value,
            }).then(response =>
            {
                if (response.data.error)
                {
                    console.log(response.data.error);
                    this.setState({
                        reqSuccess: false,
                        reqSent: true,
                        disabled: false,
                        retry: true
                    });

                    alert(response.data.error);
                }
                else
                {
                    this.setState({
                        reqSuccess: true,
                        reqSent: true,
                        retry: false
                    });

                    setTimeout(() =>
                    {
                        localStorage.setItem('jwt', response.data.success.jwt);
                        window.location.href = '/';
                    }, 1000);
                }
            }).catch(error =>
            {
                console.error(error);
                this.setState({
                    reqSuccess: false,
                    reqSent: true,
                });
            });
        }
    }

    getBtnContents(state)
    {
        if (state.formValid && state.reqSent === false)
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
        else if (state.reqSent && state.reqSuccess === true && state.retry === false)
        {
            return (
                <BS.Button variant='success' type="submit" className='w-100' id="login-btn">
                    Success
                </BS.Button>
            );
        }
        else if (state.reqSent && state.reqSuccess === false && state.retry === false)
        {
            return (
                <BS.Button variant='danger' type="submit" className='w-100' id="login-btn">
                    Error
                </BS.Button>
            )
        }
        else if (state.reqSent && state.retry === true)
        {
            return (
                <BS.Button variant='primary' type="submit" className='w-100' id="login-btn">
                    Retry
                </BS.Button>
            )
        }
        else
        {
            return (
                <BS.Button variant='primary' type="submit" className='w-100' id="login-btn">
                    Login
                </BS.Button>
            )
        }
    }

    componentDidMount()
    {
        this.form = document.getElementById('login-form');
        let config = {
            // class of the parent element where the error/success class is added
            classTo: 'form-floating',
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            // class of the parent element where error text element is appended
            errorTextParent: 'form-floating',
            // type of element to create for the error text
            errorTextTag: 'div',
            // class of the error text element
            errorTextClass: 'invalid-feedback'
        };

        Pristine.addValidator('email', (value) =>
        {
            var regex = /^\S+@\S+\.\S+$/;
            return regex.test(value);
        }, "This is not a valid email.", 1, false);

        this.pristine = new Pristine(this.form, config);
    }

    render()
    {
        return (
            <>
                <BS.Container>
                    <BS.Row className="row py-5 mt-4 justify-content-center align-items-center">
                        <BS.Col>
                            <BS.Row>
                                <BS.Col className='d-flex justify-content-center flex-column align-items-center'>
                                    <BS.Image src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" width="700" alt="" />
                                    <h1>Hi, please login to continue.</h1>
                                </BS.Col>
                            </BS.Row>
                            <BS.Row className='d-flex justify-content-center mt-5'>
                                <BS.Col md="8">
                                    <fieldset disabled={this.state.disabled}>
                                        <BS.Form onSubmit={this.handleSubmit} id="login-form" className='needs-validation bg-content p-4' noValidate>
                                            <BS.Form.Floating className="mb-3">
                                                <BS.Form.Control type="email" id="email" placeholder='Email' onChange={this.handleChange} required data-pristine-required-message="Please provide an email." />
                                                <BS.Form.Label htmlFor="email">Email</BS.Form.Label>
                                            </BS.Form.Floating>

                                            <BS.Form.Floating className="mb-3">
                                                <BS.Form.Control type="password" id="password" placeholder='Password' onChange={this.handleChange} required data-pristine-required-message="Please provide a password." />
                                                <BS.Form.Label htmlFor="password">Password</BS.Form.Label>
                                            </BS.Form.Floating>

                                            {this.getBtnContents(this.state)}

                                        </BS.Form>
                                    </fieldset>
                                </BS.Col>
                            </BS.Row>
                        </BS.Col>
                    </BS.Row>
                </BS.Container>

            </>
        )
    }
}

export default Login;