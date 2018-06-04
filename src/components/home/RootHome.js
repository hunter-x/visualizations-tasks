import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../shared/Menu';
import Card from '../shared/Card';
import counterpart from 'counterpart';

export default class RootHome extends Component {
  constructor(props) {
    super(props);
    this.state = { menuStyle: true, chosenViz: 'boxes', mapZIndex: 150 }
  }

  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    let { chosenViz } = this.state;
    const TITLE = <Translate type='text' content='home.title' />//Municipal election data
    /* translation 1st Card */
    const TITLECARD = <Translate type='text' content='home.title1' />//One to one project
    const DESC_CARD = <Translate type='text' content='home.description1' />//The project is about measuring the effect of different type of messages on the Turnout level.
    /* translation 2nd Card */
    console.log(counterpart.translate('card.title2'));
    const TITLECARD2 = <Translate type='text' content='home.title2' />//Political party proposal
    const DESC_CARD2 = <Translate type='text' content='home.description2' />//The goal of this visualizations is to help determine the selection of parties to work with.

    return (
      <section >
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE}</h1>
        </div>

        <div className='container topTitle' >
          <div className='row col-md-12' style={{ zIndex: this.state.mapZIndex }} >
            <Card img="ppproj.jpg" redirectLink="/pp-proposal" title={TITLECARD2} description={DESC_CARD2} />
            <Card img="onetoone.jpg" redirectLink="/one-to-one" title={TITLECARD} description={DESC_CARD} />
          </div>

        </div>
      </section>
    );
  }
}
