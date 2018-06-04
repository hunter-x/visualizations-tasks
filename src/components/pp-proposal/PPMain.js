/* This component contains the cards of the pp viz  */
import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../shared/Menu';
import Card from '../shared/Card';
import counterpart  from 'counterpart';

export default class PPMain extends Component {

  render() {
    const TITLE = <Translate type='text' content='ppproposal.title' />//Political party proposal
    /* translation 1st Card */
    const TITLECARD1 = <Translate type='text' content='ppproposal.title1' />//Voter Turnout 2018
    const DESC_CARD1 = <Translate type='text' content='ppproposal.description1' />//Voter turnout map of the municipal election- Governorate and municipal level 
    /* translation 2nd Card */
    const TITLECARD2 = <Translate type='text' content='ppproposal.title2' />//CSOs Statistics
    const DESC_CARD2 = <Translate type='text' content='ppproposal.description2' />//Number of CSOs & their domain of activity -By governorate - 26-05-18.

    return (
      <section>
        <Menu/>
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE}</h1>
        </div>

        <div className='container topTitle' >
          <div className='row col-md-12'  >
          <Card img="munturnout18.jpg" redirectLink="/municipal-turnout18" title={TITLECARD1} description={DESC_CARD1} />
          <Card img="csoNumbert18.jpg" redirectLink="/cso-stat" title={TITLECARD2} description={DESC_CARD2} />
          </div>
          
        </div>
      </section>
    );
  }
}
