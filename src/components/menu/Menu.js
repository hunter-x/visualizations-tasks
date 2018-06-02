import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import './Menu.css';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: 'Language'}
    }
    componentWillMount() {
        //counterpart.getLocale();
        counterpart.setLocale('en');
    }
    handleChangeDropdown(eventkey, event) {
        console.log(eventkey, event.target.innerText)
        this.setState({ eventkey, dropdown: event.target.innerText })
        counterpart.setLocale(eventkey);
    };

    render() {
        const ENGLISH = <Translate type='text' content='language.english' />//Mun Map
        const FRENCH = <Translate type='text' content='language.french' />//Mun Map

        return (
            <div>
                <div style={{ position: 'absolute', right: 0, margin: '30px' }}>
                    <DropdownButton
                        title={this.state.dropdown}
                        pullRight
                        onSelect={this.handleChangeDropdown.bind(this)}
                    >
                        <MenuItem eventKey="en">{ENGLISH}</MenuItem>
                         <MenuItem eventKey="fr">{FRENCH}</MenuItem> 
                    </DropdownButton>
                </div>
            </div>
        );
    }
}

export default Menu;