import React, { Component } from 'react';
import HighchartInit from '../../shared/HighchartInit';

export default class CsoNdResultsBar extends Component {

    componentWillMount() {
        this.setState({
            options: {
                chart: {
                    height: '50%'
                },
                credits:false,
                title: {
                    text: 'Party results & CSO number per Governorate'
                },
               
                xAxis: [{
                    categories:     ["Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Le Kef","Mahdia","Manouba","Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"],
                    labels: {
                        rotation: 90
                    },

                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'CSO Number',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    opposite: true
            
                }, { // Secondary yAxis
                   /*  gridLineWidth: 0, */
                    title: {
                        text: 'Seats Number',
                        style: {
                            color: Highcharts.getOptions().colors[4]
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[4]
                        }
                    }
            
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    x: 0,
                    y: 0
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [
                {"name":"Ennahdha","type":"column","yAxis":1,color:'blue',"data":[72,64,114,127,138,63,95,130,83,53,71,108,89,119,102,132,187,79,51,95,54,27,67,26]},
                {"name":"Nidaa Tounes","type":"column","yAxis":1,color:'red',"data":[48,64,71,72,41,49,97,92,91,16,85,98,58,35,125,131,112,60,43,83,17,12,65,28]},
                {"name":"Courant Démocrate","type":"column","yAxis":1,color:'orange',"data":[11,3,19,4,11,5,1,7,13,12,2,9,18,2,1,13,41,2,6,11,null,null,13,1]},
                {"name":"Afek Tounes","type":"column","yAxis":1,"data":[6,null,null,12,1,null,null,1,5,null,null,19,5,1,11,4,null,null,11,18,null,0,null,null]},
                {"name":"Ajyal","type":"column","yAxis":1,"data":[null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,3,null]},
                {"name":"AL IRADA","type":"column","yAxis":1,"data":[null,2,null,4,16,3,2,3,2,12,null,null,null,13,5,2,2,9,null,null,6,3,0,null]},
                {"name":"Beni Watani","type":"column","yAxis":1,"data":[1,1,null,3,null,null,null,null,null,null,null,null,null,null,null,null,4,null,null,4,null,null,2,null]},
                {"name":"El Binaa Al Watani","type":"column","yAxis":1,"data":[null,null,0,null,0,null,0,null,null,null,null,0,null,null,1,null,2,null,null,null,1,0,1,null]},
                {"name":"La Rencontre Démocratique","type":"column","yAxis":1,"data":[null,null,null,null,null,null,null,1,null,null,null,null,null,null,null,3,null,null,null,null,null,null,null,null]},
                {"name":"L'Initiative","type":"column","yAxis":1,"data":[null,null,12,null,null,null,null,null,null,null,null,1,null,null,null,3,null,2,null,6,null,null,null,null]},
                {"name":"Machrouu Tounes","type":"column","yAxis":1,"data":[3,8,3,12,2,3,9,17,7,null,6,0,5,null,7,15,7,1,1,7,4,3,3,null]},
                {"name":"Mouvement De La Lutte Patriotique","type":"column","yAxis":1,"data":[null,null,null,null,null,null,null,null,null,null,null,null,null,2,null,null,null,null,null,null,null,null,null,null]},
                {"name":"Mouvement Démocrate","type":"column","yAxis":1,"data":[null,null,null,null,null,null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},
                {"name":"Mouvement Démocrate socialiste","type":"column","yAxis":1,"data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null]},
                {"name":"Mouvement Du Peuple","type":"column","yAxis":1,"data":[2,14,null,null,6,5,7,1,null,25,2,null,11,5,0,null,4,13,2,null,null,3,null,null]},
                {"name":"Parti De L'Avenir","type":"column","yAxis":1,"data":[null,null,null,null,null,null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null]},
                {"name":"Parti Des Verts Pour Le Progrès","type":"column","yAxis":1,"data":[null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},
                {"name":"Parti Destourien Libre Pdl","type":"column","yAxis":1,"data":[2,9,2,3,null,null,0,5,2,null,7,3,null,null,5,15,8,1,9,4,null,null,null,null]},
                {"name":"Parti Socialiste","type":"column","yAxis":1,"data":[null,null,0,null,null,1,null,null,3,null,1,null,null,null,null,2,null,7,0,null,null,null,null,null]},
                {"name":"Sawt Ettounsi","type":"column","yAxis":1,"data":[null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},
                {"name":"Tounes Awalan","type":"column","yAxis":1,"data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1]},
                {"name":"Union Populaire Républicaine","type":"column","yAxis":1,"data":[null,null,0,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,null,null,2,0]},
                {
                    name: 'CSOs number 26-05-18',
                    type: 'spline',
                     
                    data: [1086,432,881,893,734,808,572,648,861,461,448,562,482,966,875,1328,1705,877,458,1022,459,318,4266,271],
                   
                },
                {
                    name: 'CSOs for environment',
                    type: 'spline',
                     
                    data: [41,16,33,25,26,30,14,8,22,15,8,5,8,28,20,51,30,18,9,26,9,19,74,7]
                   
                },
                {
                    name: 'CSOs for human rights',
                    type: 'spline',
                     
                    data: [30,3,17,18,5,9,2,7,9,4,1,2,4,6,4,4,16,12,5,7,5,1,183,0]
                   
                },
                {
                    name: 'CSOs for citizenship',
                    type: 'spline',
                     
                    data: [67,10,40,21,22,20,22,22,18,8,10,3,11,31,26,37,32,19,7,43,14,14,219,4]                   
                },
                {
                    name: 'CSOs for women',
                    type: 'spline',
                     
                    data: [10,4,5,10,2,8,7,0,4,12,2,3,9,7,10,8,11,9,5,2,6,2,45,0]
                
                }
            
            ]
                  
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