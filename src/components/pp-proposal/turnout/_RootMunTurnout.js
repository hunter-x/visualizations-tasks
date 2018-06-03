import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../../shared/Menu';
import MunTurnoutMap from './MunTurnoutMap' ;
export default class _RootMunTurnout extends Component {
  
  render() {
    const TITLE = <Translate type='text' content='ppproposal.title1' />//Municipal election Turnout 2018
    return (
      <section >
        <Menu />
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE}</h1>
        </div>
      <MunTurnoutMap/>
      </section>
    );
  }
}
