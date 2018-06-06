import React, { Component } from 'react';
import { FormGroup, FormControl, Form, Radio } from 'react-bootstrap';

import Translate from 'react-translate-component';
import Nav from '../../shared/Nav';

import PartyMap from './PartyMap';
import './partySheet.css'
export default class _RootTadeem extends Component {


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
    console.log(e.target.value);
  }
  render() {
    const TITLE = <Translate type='text' content='ppproposal.title4' />//Party\'s cheat sheet
    return (
      <div>
        <Nav />

        

          <div id="content">
          <section >
            <div className="menu-trigger"></div>
            <div className="site-content">
              <h1 className="site-content__headline">Courant Democratique {TITLE}</h1>
            </div>
            <div className="col-md-offset-2 col-md-10">
              <h4 className="subheaderTitle col-md-4 "> Please select the political party :</h4>
              <div className=" subheaderTitle col-md-5">
                <FormGroup controlId="typeOfAssoc" onChange={this.handleNgoSector.bind(this)}  >
                  <FormControl componentClass="select" placeholder="All" defaultValue={0}>
                    <option value="" disabled >Select</option>
                    <option value="sum-[500, 900, 1200]/20954">Courant Democratique </option>
                    <option value="sum-[500, 900, 1200]/20954">Afek Tounes </option>
                  </FormControl>
                </FormGroup>
              </div>
            </div>

            <div className="light parallax-container center info-card-section" data-overlay="95">
              <div className="container">
                <div className="row m-space">
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-analytics-outline"></i>
                    <h2>26,000</h2>
                    <p>Visitors Daily</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-lightbulb-outline"></i>
                    <h2>10,000</h2>
                    <p>Fresh Ideas Daily</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-camera-outline"></i>
                    <h2>17,500</h2>
                    <p>Cat Photos</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-briefcase-outline"></i>
                    <h2>73</h2>
                    <p>Current Partners</p>
                  </div>
                </div>
              </div>
            </div>
            <PartyMap />
            </section>
            
          </div>
         

        
      </div>
    );
  }
}
