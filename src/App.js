/*
 * Spectre CSS Imports
 * See: https://picturepan2.github.io/spectre/getting-started/installation.html
 */
import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';
import 'spectre.css/dist/spectre.min.css';

import './App.css';

import React from "react";

import EnvAuthenticationButton from "./component/AuthenticationAuthTokenPage/EnvAuthenticationButton";
import { AuthenticationProvider } from "./context/AuthenticationProvider";
import { ComposerProvider } from "./context/ComposerProvider";

const App = () => {
  return (
    <div className="App">
      <AuthenticationProvider><ComposerProvider>
        <EnvAuthenticationButton></EnvAuthenticationButton>
      </ComposerProvider></AuthenticationProvider>
    </div>
  )
}

export default App
