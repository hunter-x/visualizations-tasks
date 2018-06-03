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
    const TITLECARD = <Translate type='text' content='card.title1' />//Distribution of citizens & Sport infrastructure
    const DESC_CARD = <Translate type='text' content='card.description1' />//Tunis Municipality
    /* translation 2nd Card */
    console.log(counterpart.translate('card.title2'));
    const TITLECARD2 = <Translate type='text' content='card.title2' />//Municipal election data
    const DESC_CARD2 = <Translate type='text' content='card.description2' />//Municipal election data
    /* translation 2nd Card */
    console.log(counterpart.translate('card.title2'));
    const TITLECARD3 = <Translate type='text' content='card.title3' />//Municipal election data
    const DESC_CARD3 = <Translate type='text' content='card.description3' />//Municipal election data

    return (
      <section >
        <Menu />
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE}</h1>
        </div>

        <div className='container topTitle' >
          <div className='row col-md-12' style={{ zIndex: this.state.mapZIndex }} >
            <Card img="card2.jpg" redirectLink="/pp-proposal" title={TITLECARD2} description={DESC_CARD2} />
            <Card img="card1.jpg" redirectLink="/one-to-one" title={TITLECARD} description={DESC_CARD} />
          </div>

        </div>
      </section>
    );
  }
}
