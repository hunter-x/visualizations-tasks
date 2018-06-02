import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RootHome from './components/home/RootHome' ;

import counterpart  from 'counterpart';
counterpart.registerTranslations('en',require('./../locales/en'));
counterpart.registerTranslations('fr',require('./../locales/fr'));
export default class App extends Component {
  
  render() {
    return (
      <Switch>
      <Route exact path="/" component={RootHome} />

      </Switch>
    );
  }
}
