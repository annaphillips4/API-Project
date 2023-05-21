import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import Main from "./components/Main";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path={['/', '/login', '/signup']}>
            <LandingPage />
          </Route>
          <Route path='/app'>
            <Main />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
