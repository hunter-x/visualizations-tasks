import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'Recharts';
import Translate from 'react-translate-component';
import './result-item.css'
export default class ResultItemBar extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const TURNOUT = <Translate type='text' content='mun_res_box.turnout' />//Turnout
        const BLANK = <Translate type='text' content='mun_res_box.blank' />//Blank
        const SEATS_NUMBER = <Translate type='text' content='mun_res_box.seats_num' />//seats number
        //console.log(this.props.data);
        let data = [];
        //data variable contains the data for the bar chart
        (this.props.data).map((object, i) => {
            data.push({
                name: object.nom_liste_fr, seats: parseInt(object.sieges_obtenus), fill: object.fill,
                votes_obtenus: parseInt(object.votes_obtenus)

            })
        })
        // we sort the data to show seats number from small to big
        data.sort(compare);

        return (
            <div className="blog-item">
                <div className="thumb1">
                    <ResponsiveContainer width='100%' height={380}>
                        <BarChart data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="seats" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="article">
                    <span className="tag">{this.props.mun_name}</span>
                    <div style={{textAlign:'center'}} >
                    <div className='text-margin-top'><h4 style={{ display: 'inline' }} >{TURNOUT}:</h4>  <h4  className="subheaderTitle inline"> {this.props.turnout} %</h4></div>
                    <div className='text-margin-top' > <h4 style={{display:'inline'}}>{BLANK}:</h4><h4 className="subheaderTitle inline"> {this.props.blank} %</h4></div>
                    <div className='text-margin-top' > <h4 style={{display:'inline'}}>{SEATS_NUMBER}:</h4><h4 className="subheaderTitle inline"> _</h4></div>
                    </div>
                    <hr />
                    <h5 className="author"></h5>
                </div>
            </div>
        );
    }
}
function compare(a, b) {
    if (a.seats < b.seats)
        return -1;
    if (a.seats > b.seats)
        return 1;
    return 0;
}