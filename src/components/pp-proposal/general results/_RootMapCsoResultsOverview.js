import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../../shared/Menu';
import Nav from '../../shared/Nav';
import SelectionMap from './SelectionMap';
//if we use Redirect the browsing history will be deleted but push history keeps track of history when cllicking back button
/*import { Redirect  } from 'react-router-dom'; <Redirect  to={this.state.redirect} /> */ 

export default class _RootMapCsoResultsOverview extends Component {
  constructor(props) {
    super(props);
    this.state={redirect: 'none'}
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
  handleMapClickFather(Gov_name) {
    this.setState({ redirect: '/mun-results/'+Gov_name });
  }
  render() {
    const TITLE = <Translate type='text' content='ppproposal.title2' />//Municipal election Turnout 2018
    return (
      <section >
        {this.state.redirect == 'none' ?
        <div>
          <Menu />
          <Nav />
          <div id="content">
            <div className="menu-trigger"></div>
            <div className="site-content">
              <h1 className="site-content__headline">{TITLE}</h1>
            </div>
            <div className="col-md-offset-1 col-md-10">
              <h4 className="subheaderTitle "> You can click on the governorate of which you want discover results :</h4>

            </div>
            <SelectionMap handleMapClickFather={this.handleMapClickFather.bind(this)} />
          </div>
          </div>
      
      :
        
        this.props.history.push(this.state.redirect)
       
        }
      </section>
    );
  }
}
