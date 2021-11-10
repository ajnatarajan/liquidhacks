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
import ProfilePage from './components/ProfilePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";


const rootElement = document.getElementById("root");
render(
  <Auth0Provider
    domain="dev-3u3zqf0o.us.auth0.com"
    clientId="27xAeB9Z0IK0JJuHMn7S1s4I7YIt7D5t"
    redirectUri="http://localhost:3000/profile"
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="host" element={<Host />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
