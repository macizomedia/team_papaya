import React from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./store/Auth";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./config/routes.js";
import AppRoute from "./components/AppRoute.js";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <main>
        <br />
        <Router>
          <Switch>
            {routes.map((route) => (
              <AppRoute
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </Router>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
