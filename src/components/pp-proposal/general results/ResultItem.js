import React, { Component } from 'react';
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from 'Recharts' ;
import Translate from 'react-translate-component';
import './result-item.css'
export default class ResultItem extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const TURNOUT = <Translate type='text' content='mun_res_box.turnout' />//Turnout
        const BLANK = <Translate type='text' content='mun_res_box.blank' />//Blank
        const SEATS_NUMBER = <Translate type='text' content='mun_res_box.seats_num' />//seats number
        const data = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210}
      ];
        return (
            <div className="blog-item">
                <div className="thumb1">
                <ResponsiveContainer width='100%' height={380}>
                <BarChart  data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="pv" fill="#8884d8" />
           <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
          </ResponsiveContainer>                    
                </div>
                <div className="article">
                    <span className="tag">{this.props.mun_name}</span>
                    <h4>{TURNOUT} {this.props.turnout} %</h4>
                    <h4>{BLANK} {this.props.blank} %</h4>
                    <h4>{SEATS_NUMBER} _</h4>
                    <hr />
                    <h5 className="author">By Adam J</h5>
                </div>
            </div>
        );
    }
}
