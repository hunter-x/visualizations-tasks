/* This component contains the cards of the pp viz  */
import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../shared/Menu';
import Card from '../shared/Card';
import counterpart from 'counterpart';

export default class PPMain extends Component {

  render() {
    const TITLE = <Translate type='text' content='ppproposal.title' />//Political party proposal
    /* translation 1st Card */
    const TITLECARD1 = <Translate type='text' content='ppproposal.title1' />//Voter Turnout 2018
    const DESC_CARD1 = <Translate type='text' content='ppproposal.description1' />//Voter turnout map of the municipal election- Governorate and municipal level 
    /* translation 2nd Card */
    const TITLECARD2 = <Translate type='text' content='ppproposal.title2' />//CSOs Statistics
    const DESC_CARD2 = <Translate type='text' content='ppproposal.description2' />//Number of CSOs & their domain of activity -By governorate - 26-05-18.
    /* translation 3rd Card */
    const TITLECARD3 = <Translate type='text' content='ppproposal.title3' />//Tadeem Project
    const DESC_CARD3 = <Translate type='text' content='ppproposal.description3' />//Municipalities where the Tadeem project operates + info about turnout, null & blank votes..
    /* translation 4th Card */
    const TITLECARD4 = <Translate type='text' content='ppproposal.title4' />//cheat sheet
    const DESC_CARD4 = <Translate type='text' content='ppproposal.description4' />//statistics about parties, their participation in the local election and beyond ..
    /* translation 5th Card */
    const TITLECARD5 = <Translate type='text' content='ppproposal.title5' />//General results Overview
    const DESC_CARD5 = <Translate type='text' content='ppproposal.description5' />// Vizualizing All municipalities results per Governo

    return (
      <section>
        <Menu />
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE}</h1>
        </div>

        <div className='container topTitle' >
          <div className='row col-md-12'  >
            <Card img="partySheet.jpg" redirectLink="/party-sheet" title={TITLECARD4} description={DESC_CARD4} />
            <Card img="mun_res.jpg" redirectLink="/mun-results" title={TITLECARD5} description={DESC_CARD5} />
            <Card img="munturnout18.jpg" redirectLink="/municipal-turnout18" title={TITLECARD1} description={DESC_CARD1} />
            <Card img="csoNumbert18.jpg" redirectLink="/cso-stat" title={TITLECARD2} description={DESC_CARD2} />
            <Card img="tadeem.jpg" redirectLink="/tadeem" title={TITLECARD3} description={DESC_CARD3} />
          </div>

        </div>
      </section>
    );
  }
}
