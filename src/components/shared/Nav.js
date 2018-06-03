import React, { Component } from 'react';
import Translate from 'react-translate-component';
import { Link } from 'react-router-dom';

const HOME = <Translate type='text' content='nav.home' />//Home
const ONETOONE = <Translate type='text' content='nav.oneToOne' />//one to one
const POLITICALPARTYPROP = <Translate type='text' content='nav.politicalParty' />//political Party Proposal

const Nav = () => (

    <nav id="slide-menu">
        <ul>
        <Link to='/'><li>{HOME}</li></Link>
        <Link to='/pp-proposal'><li>{ONETOONE}</li></Link>
        <Link to='/one-to-one'><li>{POLITICALPARTYPROP}</li></Link>
        </ul>
    </nav>
);

export default Nav;