import React from 'react';
import classes from './app.module.css';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';

const App = () => {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuthenticated }}>
      <div className={classes.container}>
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;