/* This component contains the cards of the pp viz  */
import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../shared/Menu';
import Card from '../shared/Card';
import counterpart  from 'counterpart';

export default class OneMain extends Component {

  render() {
    const TITLE = <Translate type='text' content='oneToOne.title' />//One To One Project
    /* translation 1st Card */
    const TITLECARD1 = <Translate type='text' content='oneToOne.title1' />//Determining Sample
    const DESC_CARD1 = <Translate type='text' content='oneToOne.description1' />//The map allow to draw radius arround voting centers taking into concideration information about registration ..
    /* translation 2nd Card */
    const TITLECARD2 = <Translate type='text' content='oneToOne.title2' />//Direct targeting
    const DESC_CARD2 = <Translate type='text' content='oneToOne.description2' />//VC that would get direct intervention with different messages types
    /* translation 3rd Card */
    const TITLECARD3 = <Translate type='text' content='oneToOne.title3' />//Brochure targeting
    const DESC_CARD3 = <Translate type='text' content='oneToOne.description3' />//VC that would get Brochure intervention with different messages types
    /* translation 4th Card */
    const TITLECARD4 = <Translate type='text' content='oneToOne.title4' />//Brochure distribution advancement
    const DESC_CARD4 = <Translate type='text' content='oneToOne.description4' />// following the daily brochure distribution percentage
    /* translation 5th Card */
    const TITLECARD5 = <Translate type='text' content='oneToOne.title5' />//Project Overview
    const DESC_CARD5 = <Translate type='text' content='oneToOne.description5' />//Map contains all the location of control VC, Direct Targeting & Brochure targeting

    return (
      <section>
        <Menu/>
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE}</h1>
        </div>

        <div className='container topTitle' >
          <div className='row col-md-12'  >
          <Card img="brochure-dist.jpg" redirectLink="/leaflet-progress" title={TITLECARD4} description={DESC_CARD4} />
          <Card img="onetoone-overview.jpg" redirectLink="/final-map-lealfet-control" title={TITLECARD5} description={DESC_CARD5} />
          <Card img="direct-targeting.jpg" redirectLink="/final-map-direct" title={TITLECARD2} description={DESC_CARD2} />
          <Card img="brochure-targeting.jpg" redirectLink="/final-map-lealfet" title={TITLECARD3} description={DESC_CARD3} />
          <Card img="sampeling.jpg" redirectLink="/sample-determining" title={TITLECARD1} description={DESC_CARD1} />

          </div>
          
        </div>
      </section>
    );
  }
}
