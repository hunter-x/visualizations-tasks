import React, { Component } from 'react';
import FinalMapLeafletDist from './FinalMapLeafletDist';
import MenuDrawer from './MenuDrawer';
import config from '../config';

export default class WrFinalMapLeafletDist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delimitation: config.initShape, delimitationConsistantMun: config.initShape, etat: 'notloaded',
            govDelimitation: config.initShape, delimitationConsistantGov: config.initShape
            , munBorder: true, govBorder: false, toggleKey: 'mun', toggleKeyg: 'gov' // this state to toggle the mun|gov -> show or hide
        }
    }
    getBorderSelection(checkboxBorder) {
        //console.log(checkboxBorder);
        if (checkboxBorder.munBorder) {
            console.log(checkboxBorder);
            //if the munborder is toggeled we inject the mun borders in the shape
            this.setState({ delimitation: this.state.delimitationConsistantMun, toggleKey: 'munBorder' });
        } else {
            //console.log('ffff');
            //if the munborder is switched off we inject an empty shape
            this.setState({ delimitation: config.initShape, toggleKey: 'noMunBorder' });
        }
        if (checkboxBorder.govBorder) {
            this.setState({ govDelimitation: this.state.delimitationConsistantGov, toggleKeyg: 'govBorder' });
        } else {
            this.setState({ govDelimitation: config.initShape, toggleKeyg: 'noGovBorder' });
        }
    }
    render() {
        return (
            <div>
                <FinalMapLeafletDist delimitation toggleKey govDelimitation toggleKeyg />
                <MenuDrawer getBorderSelection={getBorderSelection} />
            </div>
        );
    }
}
