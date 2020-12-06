import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ProductsList from './components/Products/ProductsList';
import TrademarksList from './components/Trademarks/TrademarksList';
import CategoriesList from './components/Categories/CategoriesList';
import { AuthPage } from './components/AuthPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/">
          <div>
            <CategoriesList />
            <TrademarksList />
          </div>

          <ProductsList />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/auth">
        <AuthPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  )
}