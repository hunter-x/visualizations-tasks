import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import counterpart  from 'counterpart';
counterpart.registerTranslations('en',require('./../locales/en'));
counterpart.registerTranslations('fr',require('./../locales/fr'));

import RootHome from './components/home/RootHome' ;

/* Laura */
import PPMain from './components/pp-proposal/PPMain' ;
import _RootMunTurnout from './components/pp-proposal/turnout/_RootMunTurnout' ;
import _RootCsoNumber from './components/pp-proposal/cso/_RootCsoNumber' ;
import _RootTadeem from './components/pp-proposal/tadeem/_RootTadeem' ;
import _RootPartiesSheet from './components/pp-proposal/party cheat sheet/_RootPartiesSheet' ;

/* Aaron */
import OneMain from './components/one-to-one/OneMain' ;

import OneToOne from './components/one-to-one/sample-determining/OneToOne' ;
import FinalMap from './components/one-to-one/one-to-one-direct-final/FinalMap' ;
import FinalMapLeafletDist from './components/one-to-one/one-to-one-leaflet-final/FinalMapLeafletDist' ;
import LeafletProgress from './components/one-to-one/leaflet-progress/LeafletProgress' ;
import FinalMapLeafletControlDist from './components/one-to-one/controlVC/FinalMapLeafletControlDist' ;

export default class App extends Component {
  
  render() {
    return (
      <Switch>
      <Route exact path="/" component={RootHome} />
      {/* Laura Project */}
      <Route exact path="/pp-proposal" component={PPMain} />
      <Route exact path="/municipal-turnout18" component={_RootMunTurnout} />
      <Route exact path="/cso-stat" component={_RootCsoNumber} />
      <Route exact path="/tadeem" component={_RootTadeem} />
      <Route exact path="/party-sheet" component={_RootPartiesSheet} />

      {/* Aaron Project */}
      <Route exact path="/one-to-one" component={OneMain} />
      <Route  path="/sample-determining" component={OneToOne}/>
      <Route  path="/final-map-direct" component={FinalMap}/>
      <Route  path="/final-map-lealfet" component={FinalMapLeafletDist}/>
      <Route  path="/leaflet-progress" component={LeafletProgress}/>
      <Route  path="/final-map-lealfet-control" component={FinalMapLeafletControlDist}/>

      </Switch>
    );
  }
}
