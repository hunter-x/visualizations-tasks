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
      VOTES_value: '517077 - 28,6%', CHAIRS_value: '2146 - 29,7%', BEST_RES_value: '17/24 (Ghannouch-Gabes)', RUNNED_MUN_value: '350/350', partyName: 'Ennahdha'
      ,shapeToSelect:'G_NAHDHA_PARTY',grades_votes:[0, 20, 30],grades_seats:[0,10,15],shapeType:'normalShape'
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
    console.log('------------------------------------------',e.target.value);
    /* Each object in the select drawer contains values separated by **  that we parse, pass into state and then consume in the render  */
    /* grades variable contains 2 grades one for the chair results and the other for the results per votes that wee parse in the party map according to the radio button */
    const dataString = e.target.value.split("**");
    //we check if the party is within a mixed shape to color specefically in the map
    /* let shapeType='normalShape';
    dataString[8]=='mixed'?shapeType='mixed':'normalShape'; */
    this.setState({
      VOTES_value: dataString[0], CHAIRS_value: dataString[1], BEST_RES_value: dataString[2], RUNNED_MUN_value: dataString[3], partyName: dataString[4]
      ,shapeToSelect:dataString[5],grades_votes:JSON.parse(dataString[6]),grades_seats:JSON.parse(dataString[7])
    });
  }
  
  render() {
    const TITLE = <Translate type='text' content='ppproposal.title4' />//Party\'s cheat sheet
    const VOTES = <Translate type='text' content='partySheet.VOTES' />//Total Votes
    const CHAIRS = <Translate type='text' content='partySheet.CHAIRS' />//Total chairs
    const BEST_RES = <Translate type='text' content='partySheet.BEST_RES' />//Highest seats number
    const RUNNED_MUN = <Translate type='text' content='partySheet.RUNNED_MUN' />//Runned municipalities
    const { VOTES_value,CHAIRS_value,BEST_RES_value,RUNNED_MUN_value,partyName,shapeToSelect,grades_votes,grades_seats}=this.state;
    return (
      <div>
        <Nav />

        <div id="content">
          <section >
            <div className="menu-trigger"></div>
            <div className="site-content">
              <h1 className="site-content__headline">{partyName} {TITLE}</h1>
            </div>
            <div className="col-md-offset-2 col-md-10">
              <h4 className="subheaderTitle col-md-4 "> Please select the political party :</h4>
              <div className=" subheaderTitle col-md-5">
                <FormGroup controlId="typeOfAssoc" onChange={this.handleNgoSector.bind(this)}  >
                  <FormControl componentClass="select" placeholder="All" defaultValue={0}>
                    <option value="" disabled >Select</option>
                    <option value="517077 - 28,6%**2146 - 29,7%**17/24 (Ghannouch-Gabes)**350/350**Ennahdha**G_NAHDHA_PARTY**[0, 20, 30]**[0,10,15]**40">Ennahdha</option>
                    <option value="376945 - 20,8%**1593 - 22,0%**13/18(Khmeyria-Jendouba)**345/350**Nidaa Tounes**G_NIDA_PARTY**[0, 20, 30]**[0,10,15]**40">Nidaa Tounes</option>
                    <option value="75586 - 4,1%**205 - 2,8%**6/12 (Jemna-Kebili)**69/350**Courant Democratique**G_TAYAR_PARTY**[0, 9, 20]**[0,2,4]**50">Courant Democratique </option>
                    <option value="26014 - 1,4%**123 - 1,7%**8/18 (Souk Essebt-Jendouba)**69/350**Machrouu Tounes**G_MASHROU_PARTY**[0, 9, 20]**[0,1,4]**40">Machrouu Tounes</option>
                    <option value="24928 - 1,3%**75 - 1,0%**7/24 (Siliana)**31/350**Parti Destourien Libre**G_DOSSTOURI_PARTY**[0, 9, 20]**[0,1,4]**40"> Parti Destourien Libre</option>
                    <option value="23998 - 1,3%**84 - 1,1%**4/12 (El Golaa-Kebili)**46/350**AL IRADA**G_IRADA_PARTY**[0, 9, 20]**[0,1,4]**40"> AL IRADA</option>
                    <option value="23958 - 1,3%**100 - 1,3%**8/18 (Souk El Ahed-Kebili)**40/350**Mouvement Du Peuple**G_HARAK_PARTY**[0, 9, 20]**[0,1,4]**40">Mouvement Du Peuple</option>
                    <option value="19116 - 1,0%**94 - 1,3%**5/12 (El Hbabsa-Siliana)**43/350**Afek Tounes**G_AFEK_PARTY**[0, 9, 20]**[0,1,4]**40">Afek Tounes</option>
                    <option value="9097 - 0,5%**15 - 0,2%**2/18 (Ksibet Thrayet-Sousse)**9/350**Beni Watani**G_PARTIES_P_ONE**[0, 5, 15]**[0,1,4]**40">Beni Watani</option>
                    <option value="6405 - 0,3%**24 - 0,3%**6/24 (Hammam-Sousse)**7/350**L'Initiative**G_PARTIES_P_ONE**[0, 5, 15]**[0,1,4]**40">L'Initiative</option>
                    <option value="4206 - 0,2%**5 - 0,06%**2/18 (Ghraiba-Sfax)**15/350**El Binaa Al Watani**G_PARTIES_P_TWO**[0, 5, 15]**[0,1,4]**40">El Binaa Al Watani</option>
                    <option value="3376 - 0,1%**14 - 0,1%**4/18 (Rahal-Sidi Bouzid)**12/350**Parti Socialiste**G_PARTIES_P_ONE**[0, 5, 15]**[0,1,4]**40">Parti Socialiste</option>
                    <option value="2752 - 0,1%**7 - 0,09%**4/18 (Zaouia Sousse)**6/350**Union Populaire Républicaine**G_PARTIES_P_ONE**[0, 5, 15]**[0,1,4]**40">Union Populaire Républicaine</option>
                    <option value="1145 - 0,06%**6 - 0,08%**3/18 (Carthage)**2/350**Ajyal**G_PARTIES_P_ONE**[0, 5, 15]**[0,1,4]**40">Ajyal</option>
                    <option value="1041 - 0,05%**3 - 0,04%**3/36 (Bizerte)**2/350**Sawt Ettounsi**G_PARTIES_P_TWO**[0, 5, 15]**[0,1,4]**40"> Sawt Ettounsi</option>
                    <option value="733 - 0,04%**3 - 0,04%**5/12 (Foussana)**1/350**Mouvement Démocrate**G_PARTIES_P_TWO**[0, 1, 2]**[0,1,4]**40">Mouvement Démocrate</option>
                    <option value="703 - 0,03%**2 - 0,02%**2/24 (Medenine)**1/350**Mouvement De La Lutte Patriotique**G_PARTIES_P_TWO**[0, 1, 2]**[0,1,4]**40">Mouvement De La Lutte Patriotique</option>
                    <option value="623 - 0,03%**4 - 0,05%**1/ (El Mida-Nabeul)**3/350**La Rencontre Démocratique**G_PARTIES_P_TWO**[0, 1, 2]**[0,1,4]**40">La Rencontre Démocratique</option>
                    <option value="301 - 0,01%**1 - 0,01%**5/12 ()**1/350**Tounes Awalan**G_PARTIES_P_TWO**[0, 1, 2]**[0,1,4]**40">Tounes Awalan</option>
                    <option value="214 - 0,01%**1 - 0,01%**5/12 ()**1/350**Parti De L'Avenir**G_PARTIES_P_ONE**[0, 1, 2]**[0,1,4]**40">Parti De L'Avenir</option>
                    <option value="178 - 0,009%**0 - 0%**5/12 ()**1/350**Mouvement Démocrate socialiste**G_PARTIES_P_TWO**[0, 1, 2]**[0,1,4]**40">Mouvement Démocrate socialiste</option>
                    <option value="150 - 0,008%**1 - 0,01%**5/12 ()**1/350**Parti Des Verts Pour Le Progrès**G_PARTIES_P_TWO**[0, 1, 2]**[0,1,4]**40">Parti Des Verts Pour Le Progrès</option>
                  </FormControl>
                </FormGroup>
              </div>
            </div>

            <div className="light parallax-container center info-card-section" data-overlay="95">
              <div className="container">
                <div className="row m-space">
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-analytics-outline"></i>
                    <h3>{VOTES_value} </h3>
                    <p>{VOTES}</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-lightbulb-outline"></i>
                    <h3>{CHAIRS_value}</h3>
                    <p>{CHAIRS}</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-camera-outline"></i>
                    <h5>{BEST_RES_value}</h5>
                    <p>{BEST_RES}</p>
                  </div>
                  <div className="col-md-3 col-xs-6 info-card-font">
                    <i className="ion-ios-briefcase-outline"></i>
                    <h3>{RUNNED_MUN_value}</h3>
                    <p> {RUNNED_MUN}</p>
                  </div>
                </div>
              </div>
            </div>
            <PartyMap shapeToSelect={shapeToSelect} grades_votes={grades_votes} grades_seats={grades_seats} partyName={partyName} />
          </section>

        </div>



      </div>
    );
  }
}
