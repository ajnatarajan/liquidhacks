import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import Host from "./routes/Host";
import Login from "./routes/Login";
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";


const rootElement = document.getElementById("root");
render(
  <Auth0Provider
    domain="dev-3u3zqf0o.us.auth0.com"
    clientId="27xAeB9Z0IK0JJuHMn7S1s4I7YIt7D5t"
    // redirectUri must match what is in my auth0 account so if you change
    // this, talk to Ajay since Ajay will need to update his auth0 account
    // stuff to match whatever you change this to.
    redirectUri="http://localhost:3000/home"
    useRefreshTokens={ true }
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="host" element={<Host />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="home" element={<MainPage />}/>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
