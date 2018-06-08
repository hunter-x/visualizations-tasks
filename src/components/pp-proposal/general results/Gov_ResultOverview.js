import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../../shared/Menu';
import Nav from '../../shared/Nav';
import TadeemMap from './TadeemMap';
export default class Gov_ResultOverview extends Component {


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
  handleMapClickFather(e){
    console.log('root',e);
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
