import React, { Component } from 'react';
import Translate from 'react-translate-component';
import { FormGroup, FormControl, Form, Radio } from 'react-bootstrap';

import './side-menu.css'

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleNgoSector(e) {
this.props.getMapType(e.target.value)
  }
  render() {
    const searchFilter = <Translate type="text" content="csoMap.searchFilter" />//Search Filter
    const ngoType = <Translate type="text" content="csoMap.ngoType" />//Ngo Type

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-2 col-sm-offset-2 col-lg-offset-1">
              <div className="well MenuShadow SideMenuePosition">
                <h3 align="center">{searchFilter}</h3>
                <form className="form-horizontal">
                  <div className="">
                    <label className="control-label labelStyle">{ngoType}</label>
                    <FormGroup controlId="typeOfAssoc" onChange={this.handleNgoSector.bind(this)}  >
                      <FormControl componentClass="select" placeholder="All" defaultValue={0}>
                        <option value="" disabled >Select</option>
                        <option value="sum-[500, 900, 1200]/20954">All </option>

                        <option value="rights-[20,60,100]/351">Legal</option>
                        <option value="citizen-[20,60,100]/696">citizenship</option>
                        <option value="etranger-[20,60,100]/148">Foreign</option>
                        <option value="network-[20,60,100]/69">Network</option>
                        <option value="development-[20,60,100]/2143">Development</option>
                        <option value="credit-[20,60,100]/291">Micro-Credits</option>
                        <option value="coordination-[20,60,100]/14">Coordination</option>
                        <option value="women-[20,60,100]/176">Feminine</option>
                        <option value="culturel-[20,60,100]/3837">Culturel, Artistic</option>
                        <option value="enviroment-[20,60,100]/532">environnement</option>
                        <option value="scientific-[20,60,100]/1586">Scientific</option>
                        <option value="sport-[20,60,100]/2305">Sport</option>
                        <option value="amicale-[20,60,100]/1176">Amicale</option>
                        <option value="charity-[20,60,100]/2373">Charity / social</option>
                        <option value="schools-[20,60,100]/4585">School</option>
                        <option value="youth-[20,60,100]/369">Youth</option>
                        <option value="kids-[20,60,100]/303">Kids</option>

                      </FormControl>
                    </FormGroup>

                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}