import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../../shared/Menu';
import Nav from '../../shared/Nav';
import TadeemMap from './TadeemMap';
export default class Gov_ResultOverview extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }
  
  componentWillMount() {
    //get the name of the gov- start reading from position 13 after /mun-results/
    console.log((this.props.location.pathname).substring(13));
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

  render() {
    const TITLE = <Translate type='text' content='ppproposal.title3' />//Municipal election Turnout 2018
    return (
      <section >
        <h1>HHHHH</h1>
      </section>
    );
  }
}
