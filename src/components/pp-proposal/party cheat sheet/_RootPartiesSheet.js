import React, { Component } from 'react';
import { FormGroup, FormControl, Form, Radio } from 'react-bootstrap';

import Translate from 'react-translate-component';
import Nav from '../../shared/Nav';

import PartyMap from './PartyMap';
import './partySheet.css'
export default class _RootTadeem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      VOTES_value: '75586 - 4,2%', CHAIRS_value: '206 - 2,8%', BEST_RES_value: '6/12 (Jemna)', RUNNED_MUN_value: '69/350', Party_name: 'Courant Democratique'
      ,shapeToSelect:'G_TAYAR_PARTY',grades:[0, 10, 20]
    }
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
  handleNgoSector(e) {
    /* Each object in the select drawer contains values separated by **  that we parse, pass into state and then consume in the render  */
    /* grades variable contains 2 grades one for the chair results and the other for the results per votes that wee parse in the party map according to the radio button */
    const dataString = e.target.value.split("**");
    this.setState({
      VOTES_value: dataString[0], CHAIRS_value: dataString[1], BEST_RES_value: dataString[2], RUNNED_MUN_value: dataString[3], Party_name: dataString[4]
      ,shapeToSelect:dataString[5],grades:JSON.parse(dataString[6])
    });
  }
  render() {
    const TITLE = <Translate type='text' content='ppproposal.title4' />//Party\'s cheat sheet
    const VOTES = <Translate type='text' content='partySheet.VOTES' />//Total Votes
    const CHAIRS = <Translate type='text' content='partySheet.CHAIRS' />//Total chairs
    const BEST_RES = <Translate type='text' content='partySheet.BEST_RES' />//Highest seats number
    const RUNNED_MUN = <Translate type='text' content='partySheet.RUNNED_MUN' />//Runned municipalities
    const { VOTES_value,CHAIRS_value,BEST_RES_value,RUNNED_MUN_value,Party_name,shapeToSelect,grades}=this.state;
    console.log(this.state.grades);
    return (
      <div>
        <Nav />

        <div id="content">
          <section >
            <div className="menu-trigger"></div>
            <div className="site-content">
              <h1 className="site-content__headline">{Party_name} {TITLE}</h1>
            </div>
            <div className="col-md-offset-2 col-md-10">
              <h4 className="subheaderTitle col-md-4 "> Please select the political party :</h4>
              <div className=" subheaderTitle col-md-5">
                <FormGroup controlId="typeOfAssoc" onChange={this.handleNgoSector.bind(this)}  >
                  <FormControl componentClass="select" placeholder="All" defaultValue={0}>
                    <option value="" disabled >Select</option>
                    <option value="75586 - 4,2%**206 - 2,8%**6/12 (Jemna)**69/350**Courant Democratique**G_TAYAR_PARTY**[0, 9, 20]">Courant Democratique </option>
                    <option value="19116 - 1%**93 - 1,3%**5/12 (El Hbabsa)**43/350**Afek Tounes**G_AFEK_PARTY**[0, 7, 20]">Afek Tounes </option>
                  </FormControl>
                </FormGroup>
              </div>
            </div>

            <div className="light parallax-container center info-card-section" data-overlay="95">
              <div className="container">
                <div className="row m-space">
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-analytics-outline"></i>
                    <h2>{VOTES_value} </h2>
                    <p>{VOTES}</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-lightbulb-outline"></i>
                    <h2>{CHAIRS_value}</h2>
                    <p>{CHAIRS}</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-camera-outline"></i>
                    <h2>{BEST_RES_value}</h2>
                    <p>{BEST_RES}</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-briefcase-outline"></i>
                    <h2>{RUNNED_MUN_value}</h2>
                    <p> {RUNNED_MUN}</p>
                  </div>
                </div>
              </div>
            </div>
            <PartyMap shapeToSelect={shapeToSelect} grades={grades} />
          </section>

        </div>



      </div>
    );
  }
}
