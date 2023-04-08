import React from 'react';
import ReactDOM from "react-dom/client";
import
{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './layouts/main';
import Index from './pages/index';
import NotFoundPage from './pages/not-found';
import Projects from './pages/projects';
import NewProject from './pages/new-project';
import SingleProject from './pages/single-project';
import Login from './pages/login';
import FileBrowser from './pages/filebrowser';
import Uptime from './pages/uptime';
import Portainer from './pages/portainer';
import Traefik from './pages/traefik';
import PMA from './pages/pma';

const root = ReactDOM.createRoot(
  document.getElementById("hostingstation")
);

const JWT = localStorage.getItem('jwt');

if (!JWT)
{
  if (window.location.pathname !== '/login')
  {
    window.location.href = '/login';
  }
}


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/">
          <Route index element={<Index />} />
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path="view" element={<SingleProject />} />
          </Route>
          <Route path="new" element={<NewProject />} />
          <Route path="filebrowser" element={<FileBrowser />} />
          <Route path="uptime" element={<Uptime />} />
          <Route path="portainer" element={<Portainer />} />
          <Route path="traefik" element={<Traefik />} />
          <Route path="pma" element={<PMA />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);