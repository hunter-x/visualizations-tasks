import React, { Component } from 'react';

class HighchartInit extends Component {
    componentDidMount() {
        /* Highcharts.theme = {
            colors: [ "#8085e9","#f45b5b", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
               "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                theme: "SandSignika",
               backgroundColor: null,
               style: {
                  fontFamily: "Signika, serif"
               }
            },
            title: {
               style: {
                  color: 'black',
                  fontSize: '16px',
                  //fontWeight: 'bold'
               }
            },
            subtitle: {
               style: {
                  color: 'black'
               }
            },
            tooltip: {
               borderWidth: 0
            },
            legend: {
               itemStyle: {
                  //fontWeight: 'bold',
                  fontSize: '13px'
               }
            },
            xAxis: {
               labels: {
                  style: {
                     color: '#6e6e70'
                  }
               }
            },
            yAxis: {
               labels: {
                  style: {
                     color: '#6e6e70'
                  }
               }
            },
            plotOptions: {
               series: {
                  shadow: true
               },
               candlestick: {
                  lineColor: '#404048'
               },
               map: {
                  shadow: false
               }
            },
         
            // Highstock specific
            navigator: {
               xAxis: {
                  gridLineColor: '#D0D0D8'
               }
            },
            rangeSelector: {
               buttonTheme: {
                  fill: 'white',
                  stroke: '#C0C0C8',
                  'stroke-width': 1,
                  states: {
                     select: {
                        fill: '#D0D0D8'
                     }
                  }
               }
            },
            scrollbar: {
               trackBorderColor: '#C0C0C8'
            },
         
            // General
            background2: '#E0E0E8'
            
         };
        Highcharts.setOptions(Highcharts.theme); */

        this.chart = Highcharts.chart(
                this.refs.chart,
                this.props.options,
            )
    }
    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {

        return (
            <div ref="chart" style={{ height: "30vh" }} />
        );
    }
}

export default HighchartInit;