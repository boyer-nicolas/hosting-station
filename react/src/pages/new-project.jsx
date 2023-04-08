import React from 'react';
import Pristine from 'pristinejs';
import * as BS from 'react-bootstrap';
import Api from '../core/Api';

class NewProject extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: '',
            formValid: false,
            disabled: false,
            reqSuccess: false,
            reqSent: false,
            infrastructures: {},
            project_types: {},
            retry: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.api = new Api();
    }

    getInfrastructures()
    {
        this.api.get('/infrastructures').then(response =>
        {
            this.setState({
                infrastructures: response.data.data
            });
        });
    }

    getTypes()
    {
        this.api.get('/project-types').then(response =>
        {
            this.setState({
                project_types: response.data.data
            });
        });
    }

    handleChange(event)
    {
        this.setState({ value: event.target.value });

        if (event.target.id === 'project-git')
        {
            var regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
            if (regex.test(event.target.value) && event.target.value !== '')
            {
                this.api.post('/apps/check-git', {
                    name: event.target.value
                }).then(response => 
                {
                    if (response.data.error)
                    {
                        event.target.classList.add('is-invalid');
                        let invalidFeedback = document.createElement('div');
                        event.target.parentNode.appendChild(invalidFeedback);
                        invalidFeedback.classList.add('invalid-feedback');
                        invalidFeedback.innerHTML = response.data.error;
                    }
                    else
                    {
                        event.target.classList.remove('is-invalid');
                        let invalidFeedback = document.querySelector('.invalid-feedback');
                        if (invalidFeedback)
                        {
                            invalidFeedback.remove();
                        }
                    }
                });
            }
        }

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
                <BS.Button variant='success' type="submit" className='w-100' id="submit-new-project">
                    Success
                </BS.Button>
            );
        }
        else if (state.reqSent && state.reqSuccess === false && state.retry === false)
        {
            return (
                <BS.Button variant='danger' type="submit" className='w-100' id="submit-new-project">
                    Error
                </BS.Button>
            )
        }
        else if (state.reqSent && state.retry === true)
        {
            return (
                <BS.Button variant='primary' type="submit" className='w-100' id="submit-new-project">
                    Retry
                </BS.Button>
            )
        }
        else
        {
            return (
                <BS.Button variant='primary' type="submit" className='w-100' id="submit-new-project">
                    Add
                </BS.Button>
            )
        }
    }

    handleSubmit(event)
    {
        event.preventDefault();
        let valid = this.pristine.validate();
        this.form.classList.add('was-validated');

        if (valid)
        {
            let submitBtn = document.getElementById('submit-new-project');
            submitBtn.classList.add('loading');
            this.setState({
                formValid: true,
                disabled: true,
            });

            this.api.post('/apps/add', {
                name: event.target.projectName.value,
                type: event.target.projectType.value,
                description: event.target.projectDescription.value,
                git: event.target.projectGit.value,
                infrastructure: event.target.projectInfrastructure.value,
            }).then(response =>
            {
                if (response.data.error)
                {
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
                        window.location.href = '/projects';
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

    componentDidMount()
    {
        this.getInfrastructures();
        this.getTypes();
        this.form = document.getElementById('new-app-form');
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

        Pristine.addValidator('git', (value) =>
        {
            var regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
            return regex.test(value);
        }, "This is not a Git URL.", 1, false);

        this.pristine = new Pristine(this.form, config);
    }

    render()
    {
        return (
            <>
                <h1>Add a new project</h1>
                <div className='mt-3'>
                    <fieldset disabled={this.state.disabled}>
                        <BS.Form onSubmit={this.handleSubmit} id="new-app-form" className='needs-validation bg-content p-4' noValidate>

                            {/* Pretty Name */}
                            <BS.Form.Floating className="mb-3">
                                <BS.Form.Control type="text" id="projectName" placeholder='Pretty Name' onChange={this.handleChange} required data-pristine-required-message="Please provide a name." />
                                <BS.Form.Label htmlFor="projectName">Pretty Name</BS.Form.Label>
                            </BS.Form.Floating>

                            {/* Project Infrastructure */}
                            <BS.Form.Floating className="mb-3">
                                <BS.Form.Select placeholder='Project Type' name="projectInfrastructure" required data-pristine-required-message="Please select an infrastructure.">
                                    <option value="">Select a project infrastructure</option>
                                    <option value='0'>None</option>
                                    {Object.keys(this.state.infrastructures).map(key =>
                                    {
                                        return <option key={key} value={this.state.infrastructures[key].id}>{this.state.infrastructures[key].attributes.prettyname}</option>;
                                    }
                                    )}
                                </BS.Form.Select>
                                <BS.Form.Label htmlFor="projectInfrastructure">Infrastructure</BS.Form.Label>
                            </BS.Form.Floating>

                            {/* Project Type */}
                            <BS.Form.Floating className="mb-3">
                                <BS.Form.Select placeholder='Project Type' name="projectType" required data-pristine-required-message="Please select a project type.">
                                    <option value="">Select a project type</option>
                                    {Object.keys(this.state.project_types).map(key =>
                                    {
                                        return <option key={key} value={this.state.project_types[key].id}>{this.state.project_types[key].attributes.identifier}</option>;
                                    }
                                    )}
                                </BS.Form.Select>
                                <BS.Form.Label htmlFor="projectType">Type</BS.Form.Label>
                            </BS.Form.Floating>

                            {/* Description */}
                            <BS.Form.Floating className="mb-3">
                                <textarea className='form-control' placeholder='Project Description' name="projectDescription" cols="30" rows="10" required data-pristine-required-message="Please provide a description."></textarea>
                                <BS.Form.Label htmlFor="projectDescription">Project description</BS.Form.Label>
                            </BS.Form.Floating>

                            {/* Git */}
                            <BS.Form.Floating className="mb-3">
                                <BS.Form.Control type="git" placeholder='Git URl' id="project-git" name="projectGit" onChange={this.handleChange} data-pristine-required-message="Please provide a Git URL." required />
                                <BS.Form.Label htmlFor="projectGit">Git URL</BS.Form.Label>
                            </BS.Form.Floating>

                            {/* Submit */}
                            {this.getBtnContents(this.state)}
                        </BS.Form>
                    </fieldset>
                </div>
            </>
        )
    }
}

export default NewProject;