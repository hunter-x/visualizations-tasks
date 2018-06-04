import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RootHome from './components/home/RootHome' ;

import PPMain from './components/pp-proposal/PPMain' ;
import _RootMunTurnout from './components/pp-proposal/turnout/_RootMunTurnout' ;
import _RootCsoNumber from './components/pp-proposal/cso/_RootCsoNumber' ;
import _RootTadeem from './components/pp-proposal/tadeem/_RootTadeem' ;

import counterpart  from 'counterpart';
counterpart.registerTranslations('en',require('./../locales/en'));
counterpart.registerTranslations('fr',require('./../locales/fr'));
export default class App extends Component {
  
  render() {
    return (
      <Switch>
      <Route exact path="/" component={RootHome} />
      
      <Route exact path="/pp-proposal" component={PPMain} />
      <Route exact path="/municipal-turnout18" component={_RootMunTurnout} />
      <Route exact path="/cso-stat" component={_RootCsoNumber} />
      <Route exact path="/tadeem" component={_RootTadeem} />

      </Switch>
    );
  }
}
