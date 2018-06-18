import React, { Component } from 'react';
import HighchartInit from '../../shared/HighchartInit';
import chroma from 'chroma-js';
//import counterpart from 'counterpart' ;
export default class ResultOverviewSunburst extends Component {
    constructor(props) {
        super(props);
        this.state = { option: {} }
    }
    componentWillMount() {
        console.log(chroma('slategray').saturate(1).hex());
        let RES = this.props.partyResultsOfMun, obj = {}, dataArray = []
        //constructing the data 
        obj.id = '0.0'; obj.parent = ''; obj.name = this.props.govName; obj.color = '#fff'; dataArray.push(obj); obj = {}
        for (let i = 0; i < RES.length; i++) {
            obj.id = `1.${i}`; obj.parent = '0.0'; obj.name = RES[i][0].mun_fr; obj.color = chroma.random().saturate(3).brighten(2).hex(); dataArray.push(obj); obj = {}
            for (let j = 0; j < RES[i].length; j++) {
                obj.id = `2.${j}`; obj.parent = `1.${i}`; obj.name = RES[i][j].nom_liste_fr; obj.value = parseInt(RES[i][j].sieges_obtenus); obj.color = RES[i][j].fill;obj.mun = ` in ${RES[i][j].mun_fr}` ; dataArray.push(obj); obj = {}
            }
        }
        console.log(dataArray);

        this.setState({
            options: {

                chart: {
                    height: '65%'
                },
                credits:false,
                title: {
                    text: ''
                },

                series: [{
                    type: "sunburst",
                    data: dataArray,
                    allowDrillToNode: true,
                    cursor: 'pointer',
                    borderColor: '#000',
                    dataLabels: {
                        format: '{point.name}',
                    },
                    levels: [{
                        level: 1,
                        levelIsConstant: false,
                        dataLabels: {
                            rotationMode: 'parallel',
                            filter: {
                                property: 'outerArcLength',
                                operator: '>',
                                value: 64
                            }
                        }
                    }, {
                        level: 2,
                        colorByPoint: true,
                            label:{
                                rotation: 90
                            }
                    },
                    {
                        level: 3,
                        borderColor: '{point.fill}'
                    }]

                }],
                tooltip: {
                    headerFormat: "",
                    pointFormat: 'Party seats of <b>{point.name}</b> <b>{point.mun}</b> is <b>{point.value}</b>'
                }
            }
        });
    }
    render() {
        return (
            <div className='col-md-12' >
                <HighchartInit options={this.state.options} />
            </div>
        );
    }
}
