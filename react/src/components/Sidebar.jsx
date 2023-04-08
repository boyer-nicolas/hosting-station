import React from 'react';
import { NavLink } from 'react-router-dom';
import * as BS from 'react-bootstrap';
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

class SidebarMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            show: props.show
        }

        console.log(props.show);
    }

    render()
    {
        if (isMobile)
        {
            return (
                <BS.Offcanvas show={this.state.show}>
                    {this.children}
                </BS.Offcanvas>
            )
        }
        else
        {
            return (
                <BS.Navbar className='h-navbar bg-white'>
                    {this.children}
                </BS.Navbar>
            )
        }
    }
}

class Sidebar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            activeClassName: 'nav-link active',
            show: false
        }
    }

    logout()
    {
        localStorage.removeItem('jwt');
        window.location.href = '/';
    }

    handleMenu = () =>
    {
        if (document.body.classList.contains('nav-open'))
        {
            document.body.classList.remove('nav-open');
            this.setState({
                show: false
            });
            this.menu.classList.remove('opened');
        }
        else
        {
            document.body.classList.add('nav-open');
            this.setState({
                show: true
            });
            this.menu.classList.add('opened');
        }
    };

    renderMenuBtn()
    {
        if (isMobile)
        {
            return (
                <button onClick={this.handleMenu} className="menu" id="menu-toggle" aria-label="Main Menu">
                    <svg width="50" height="50" viewBox="0 0 100 100">
                        <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                        <path className="line line2" d="M 20,50 H 80" />
                        <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                    </svg>
                </button>
            )
        }
    }

    renderOffCanvasClose()
    {
        if (isMobile)
        {
            return (
                <BS.Offcanvas.Header closeButton />
            );
        }
        else
        {
            return (
                <BS.Offcanvas.Header />
            )
        }
    }

    componentDidMount()
    {
        this.menu = document.getElementById('menu-toggle');
    }

    render()
    {

        const RenderTags = (props) =>
        {
            if (isMobile)
            {
                return (
                    <BS.Offcanvas show={this.state.show} onHide={this.handleMenu}>
                        {props.children}
                    </ BS.Offcanvas >
                )
            }
            else
            {
                return (
                    <BS.Navbar className='h-navbar bg-white'>
                        {props.children}
                    </BS.Navbar>
                )
            }
        }

        return (
            <>
                <RenderTags>
                    <BS.Row className='h-100 w-100'>
                        <div>
                            {this.renderOffCanvasClose()}
                            <BS.Offcanvas.Body className='h-100 d-flex flex-column'>
                                <h1>Hosting Station.</h1>
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <h6 className='text-muted nav-category'>MAIN NAVIGATION</h6>
                                    <li className="my-2 rounded">
                                        <NavLink to="/" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid('gauge')} />
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/projects" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid("bars-progress")} />
                                            Projects
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/infrastructures" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={brands("git-alt")} />
                                            Infrastructures
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/project-types" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid("list")} />
                                            Project Types
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/domains" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid("globe")} />
                                            Domains
                                        </NavLink>
                                    </li>
                                    <h6 className='text-muted nav-category mt-3'>EXTERNAL APPS</h6>
                                    <li className="my-2 rounded">
                                        <NavLink to="/filebrowser" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid("folder-open")} />
                                            FileBrowser
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/traefik" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid("traffic-light")} />
                                            Traefik
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/portainer" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={brands("docker")} />
                                            Portainer
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/uptime" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid("signal")} />
                                            Uptime
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <NavLink to="/pma" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid("database")} />
                                            PhpMyAdmin
                                        </NavLink>
                                    </li>
                                    <li className="my-2 rounded">
                                        <a href="https://dash.cloudflare.com" target="_blank" className="nav-link link-dark">
                                            <FontAwesomeIcon icon={brands('cloudflare')} />
                                            Cloudflare
                                            <FontAwesomeIcon className="sidebar-icon-right" icon={solid("arrow-up-right-from-square")} />
                                        </a>
                                    </li>
                                    <li className="my-2 rounded">
                                        <a href="https://mailadmin.localhost" target="_blank" className="nav-link link-dark">
                                            <FontAwesomeIcon icon={solid('envelope')} />
                                            Mail Admin
                                            <FontAwesomeIcon className="sidebar-icon-right" icon={solid("arrow-up-right-from-square")} />
                                        </a>
                                    </li>
                                    <li className="my-2 rounded">
                                        <a href="https://webmail.localhost" target="_blank" className="nav-link link-dark">
                                            <FontAwesomeIcon icon={solid('envelope')} />
                                            Webmail
                                            <FontAwesomeIcon className="sidebar-icon-right" icon={solid("arrow-up-right-from-square")} />
                                        </a>
                                    </li>
                                    <h6 className='text-muted nav-category mt-3'>UTILITIES</h6>
                                    <li className="my-2 rounded">
                                        <NavLink to="/logs" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid('file')} />
                                            Logs
                                        </NavLink>
                                    </li>
                                </ul>
                                <ul className="nav nav-pills flex-column">
                                    <li className="my-2 rounded">
                                        <NavLink to="/settings" className={({ isActive }) =>
                                            isActive ? this.state.activeClassName : "nav-link link-dark"
                                        }>
                                            <FontAwesomeIcon icon={solid('cog')} />
                                            Settings
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className="dropdown">
                                    <a href="/" className="d-flex justify-content-between bg-primary px-3 py-1 mx-3 text-white rounded align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="d-flex flex-column">
                                            <strong>NIWEE</strong>
                                            <i>Workspace</i>
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                        <li><a className="dropdown-item" href="/">Salokain</a></li>
                                        <li><a className="dropdown-item" href="/">Clopelek</a></li>
                                    </ul>
                                </div>
                            </BS.Offcanvas.Body>
                        </div >
                    </BS.Row>
                </RenderTags>
                <header className="p-3 text-white">
                    <BS.Navbar expand="lg">
                        <BS.Container fluid className='d-flex align-items-center'>
                            {this.renderMenuBtn()}
                            <BS.Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                                <BS.Nav className="w-100 d-flex flex-wrap align-items-center justify-content-center justify-content-between">
                                    <div className="dropdown">
                                        <a href="/" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <div className="d-flex flex-column">
                                                <strong>Nicolas</strong>
                                                <i>nicolas@niwee.fr</i>
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                            <li><a className="dropdown-item" href="/">Profile</a></li>
                                            <li><a className="dropdown-item" onClick={this.logout}>Sign out</a></li>
                                        </ul>
                                    </div>
                                </BS.Nav>
                            </BS.Navbar.Collapse>
                        </BS.Container>
                    </BS.Navbar>
                </header>
            </>
        )
    }
}

export default Sidebar;