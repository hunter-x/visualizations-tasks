import React, { Component } from 'react';
import ResultOverviewColumn from './ResultOverviewColumn';
import ResultOverviewBar from './ResultOverviewBar';
import ResultOverviewSunburst from './ResultOverviewSunburst';
import { Link } from 'react-router-dom';
import Translate from 'react-translate-component';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import party_res from './all_parties_res.js'
import mun_to_gov from './Governorates_associated to municipality.js'
export default class _RootGovResultOverview extends Component {
    constructor(props) {
        super(props);
        this.state = { mun_name: '',activeButton: [true, false, false] }
    }
    componentWillMount() {
        let chosenGov = (this.props.location.pathname).substring(13);
        let RES=[]
        //get all the municipalities of a certain gov 
        var munsOfGov = _.filter(mun_to_gov, function (o) { return o.GOV_EN == chosenGov; });
        //munsOfGov contains all the municipalities of a certain governorate
        console.log(munsOfGov);
        //get results of specified municipalities from the result array
        for (let i = 0; i < munsOfGov.length; i++) {
            const MunNameAr = munsOfGov[i].NAME_AR;
            RES.push(_.filter(party_res, function (o) { return o.map_names_ar == MunNameAr; }))
        }

        this.setState({ mun_name: chosenGov,partyResultsOfMun:RES  });
    }
    vizTypeChangeHandler(index) {
        var array = [false, false, false];
        array[index] = true;
        console.log(array);
        this.setState({ activeButton: array });
    }
    render() {
        const TITLE = <Translate type='text' content='mun_res_box.title' />//Governorate result
        const COLUMN = <Translate type='text' content='mun_res_box.column' />//columnchart
        const BARCHART = <Translate type='text' content='mun_res_box.barchart' />//barchart
        const SUNBURST = <Translate type='text' content='mun_res_box.sunburst' />//sunburst
        const WHISKER = <Translate type='text' content='mun_res_box.whisker' />//whisker

        return (
            <div id="contentBlog">

                <div className="menu-trigger"><Link to="/mun-results">
                    <button className="btn success" >Back</button>
                </Link></div>

                <div className="site-content" style={{ marginBottom: '5vh' }}>
                    <h1 className="site-content__headline">{this.state.mun_name}{TITLE}</h1>
                </div>
                {/* toggle between viz buttons */}
                <div className='col-md-9  col-xs-12 '>
                    <RaisedButton
                        label={COLUMN}
                        className='viz-changer-button'
                        primary={this.state.activeButton[0]}
                        onClick={this.vizTypeChangeHandler.bind(this, 0)}
                        icon={<FontIcon className="fas fa-chart-bar" color='#000000' />}
                    />

                    <RaisedButton
                        label={BARCHART}
                        className='viz-changer-button'
                        primary={this.state.activeButton[1]}
                        onClick={this.vizTypeChangeHandler.bind(this, 1)}
                        icon={<FontIcon className="fas fa-bars" color='#000000' />}
                    />
                    <RaisedButton
                    label={SUNBURST}
                    className='viz-changer-button'
                    primary={this.state.activeButton[2]}
                    onClick={this.vizTypeChangeHandler.bind(this, 2)}
                    icon={<FontIcon className="fas fa-chart-pie" />}
                />
                </div>
                {this.state.activeButton[0] ?
                    <ResultOverviewColumn  partyResultsOfMun={this.state.partyResultsOfMun} />
                    : this.state.activeButton[1] ?
                        <ResultOverviewBar govName={this.state.mun_name} partyResultsOfMun={this.state.partyResultsOfMun} />
                        : this.state.activeButton[2] ?
                        <ResultOverviewSunburst govName={this.state.mun_name} partyResultsOfMun={this.state.partyResultsOfMun} />
                        :null
                }
            </div>
        );
    }
}

