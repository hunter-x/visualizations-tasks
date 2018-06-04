import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../../shared/Menu';
import Nav from '../../shared/Nav';
import CsoMap from './CsoMap';
export default class _RootCsoNumber extends Component {


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
    const TITLE = <Translate type='text' content='ppproposal.title2' />//CSOs Statistics
    return (
      <section >
        <Menu />
        <Nav/>
        <div id="content">
          <div className="menu-trigger"></div>
          <div className="site-content">
            <h1 className="site-content__headline">{TITLE}</h1>
          </div>
          <CsoMap />
        </div>

      </section>
    );
  }
}
