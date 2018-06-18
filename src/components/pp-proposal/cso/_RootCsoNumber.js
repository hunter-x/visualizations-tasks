import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../../shared/Menu';
import Nav from '../../shared/Nav';
import CsoMap from './CsoMap';
import CsoNdResultsBar from './CsoNdResultsBar' ;
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
export default class _RootCsoNumber extends Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: [true, false] }
  }
  componentDidMount() {
    (function () {
      var $body = document.body
        , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

      if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', function () {
          $body.className = ($body.className == 'menu-active') ? '' : 'menu-active';
        });
      }

    }).call(this);
  }
  vizTypeChangeHandler(index) {
    var array = [false, false];
    array[index] = true;
    console.log(array);
    this.setState({ activeButton: array });
  }
  render() {
    const TITLE = <Translate type='text' content='ppproposal.title2' />//CSOs Statistics
    const CSO_ND_RESULTS = <Translate type='text' content='csoMap.csoMunRes' />//Csos and results
    const CSOMAP = <Translate type='text' content='csoMap.CsoMap' />//Csos and results
    return (
      <section >
        <Menu />
        <Nav />
        <div id="content">
          <div className="menu-trigger"></div>
          <div className="site-content">
            <h1 className="site-content__headline">{TITLE}</h1>
          </div>
          {/* toggle between viz buttons */}
          <div className='col-md-12  col-xs-12 '>
            <RaisedButton
              label={CSOMAP}
              className='viz-changer-button'
              labelStyle={{textTransform:'initial'}}
              primary={this.state.activeButton[0]}
              onClick={this.vizTypeChangeHandler.bind(this, 0)}
              icon={<FontIcon className="far fa-map" color='#000000' />}
            />
            <RaisedButton
              label={CSO_ND_RESULTS}
              labelStyle={{textTransform:'initial'}}
              className='viz-changer-button'
              primary={this.state.activeButton[1]}
              onClick={this.vizTypeChangeHandler.bind(this, 1)}
              icon={<FontIcon className="fas fa-chart-bar" />}
            />


          </div>
          {this.state.activeButton[0]?<CsoMap />:<CsoNdResultsBar/>}
        </div>

      </section>
    );
  }
}
