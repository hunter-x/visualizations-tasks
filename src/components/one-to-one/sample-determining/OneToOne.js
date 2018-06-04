import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer';
import './s.css'
import axios from 'axios';
import config from '../../config';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import XlsExport from './xls-export';

class OneToOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1, position: [35.9, 9.23],
            validSamplingArray: [400, 450, 500, 550, 600, 650], circleColorArr: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f'],
            opacityCircle: 0.5,
            votingCenters: [], allVotingCenters: [], showAll: true,
            delimitation: config.initShape, delimitationConsistantMun: config.initShape, etat: 'notloaded',
            govDelimitation: config.initShape, delimitationConsistantGov: config.initShape,
            checkBoxData: [false, false, false, false, false, false],
            xlsExport: [], VCNum: 3381,
            updateMapButtonBlocked: true //this state to determine wether the update map Button in the Menu drawer would be disabled or not according to the load of map
            //defaultCheckedOverlap: 'overlap'//to ovoid excessive data download when overlaped option is not changed
            , munBorder: true, govBorder: false, toggleKey: '', toggleKeyg: '' // this state to toggle the mun|gov -> show or hide
        }
    }
    componentWillMount() {
        let qString = config.apiUrl + '/api/shape/finalData26-03-PC200-3000+oldtrn+state+unemp-b';
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        })
            .then(response => {
                var xls = new XlsExport(JSON.parse(response.data.data), 'String');
                console.log((JSON.parse(response.data.data)).length);
                this.setState({ allVotingCenters: JSON.parse(response.data.data), votingCenters: JSON.parse(response.data.data), xlsExport: xls });

            })
            .catch(function (error) {
                console.log(error);
            });
        let qString2 = 'http://inscription.tunisieelection.org:8080/api/shape/correct_mun_delimitation';

        axios({
            method: 'get',
            url: qString2,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },

        })
            .then(response => {
                this.setState({ delimitation: JSON.parse(response.data.data), updateMapButtonBlocked: false, etat: 'loaded', delimitationConsistantMun: JSON.parse(response.data.data) });
            })
            .catch(function (error) {
                console.log(error);
            });
        let qString3 = config.apiUrl + '/api/shape/gov_delimitation';

        axios({
            method: 'get',
            url: qString3,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },

        })
            .then(response => {
               // console.log(response.data.data);
                this.setState({ delimitationConsistantGov: JSON.parse(response.data.data) });
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '',
            fillOpacity: 0.1,
            fill: false
        };
    }
    styleGovDelim(feature) {
        return {
            weight: 3,
            opacity: 1,
            color: 'green',
            dashArray: '',
            fillOpacity: 0.1,
            fill: false
        };
    }
    //Trigered when button Update clicked Action when user specify the sampling radius | Opacity | color Change
    getSampling(validSamplingArray, circleColorArr, opacityCircle, checkedOverlap, toleranceValue) {
        //govBorder-> checkbox for the gov border show|hide
        //munBorder-> checkbox for the mun border show|hide

        this.setState({ etat: 'notloaded', updateMapButtonBlocked: true });
        if (Array.isArray(validSamplingArray) && Array.isArray(circleColorArr)) {
            //console.log('passed');
            //console.log(circleColorArr);
            this.setState({ validSamplingArray, circleColorArr, showAll: true });
            if (!isNaN(parseFloat(opacityCircle))) {
                this.setState({ opacityCircle });
            }
            //Logic for updating the radius data with overlape or without
            //if ((this.state.defaultCheckedOverlap != checkedOverlap) &&checkedOverlap=='noOverlap') {// this means that there have been a change in the radio button and the overlap| no overlap is triggered 

            //}

        } else {
            console.log('Error in received data from input');
        }
        if (checkedOverlap == 'noOverlap') {
            //
            let qString = config.apiUrl + '/api/noOverlapRadius/' + '[' + validSamplingArray + ']';
            axios({
                method: 'get',
                url: qString,
                headers: {
                    'name': 'Isie',
                    'password': 'Isie@ndDi',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

            })
                .then(response => {
                    //we should block other buttons and inform the user of the data loadin
                    var xls = new XlsExport(response.data, 'String');

                    this.setState({ VCNum: (response.data).length, allVotingCenters: response.data, votingCenters: response.data, etat: 'loaded', updateMapButtonBlocked: false, xlsExport: xls });
                    //console.log(tempArray);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (checkedOverlap == 'overlap') {
            let qString = config.apiUrl + '/api/shape/finalData26-03-PC200-3000+oldtrn+state+unemp-b';
            axios({
                method: 'get',
                url: qString,
                headers: {
                    'name': 'Isie',
                    'password': 'Isie@ndDi',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

            })
                .then(response => {
                    console.log(response);
                    var xls = new XlsExport(JSON.parse(response.data.data), 'String');
                    this.setState({ VCNum: JSON.parse(response.data.data).length, allVotingCenters: JSON.parse(response.data.data), votingCenters: JSON.parse(response.data.data), etat: 'loaded', updateMapButtonBlocked: false, xlsExport: xls });
                    //console.log('Overlap',response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log('tol');
            let qString = config.apiUrl + '/api/noOverlapRadiusTolerance/' + '[' + validSamplingArray + ']/' + toleranceValue;
            axios({
                method: 'get',
                url: qString,
                headers: {
                    'name': 'Isie',
                    'password': 'Isie@ndDi',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

            })
                .then(response => {
                    console.log('noOverlaptol', response.data.length);
                    var xls = new XlsExport((response.data), 'String');
                    this.setState({ VCNum: (response.data).length, allVotingCenters: response.data, votingCenters: response.data, etat: 'loaded', updateMapButtonBlocked: false, xlsExport: xls });

                    //console.log('Overlap',response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    getCheckBoxDelete(checkBoxData) {
        console.log(checkBoxData);
        //console.log((checkBoxData.arrayToDeleteNum));
        //we get the index of the array we're gone delete - this index value is in the checkbox -
        var storedNum = JSON.parse(checkBoxData.arrayToDeleteNum)
        //we define the array of checkbox -which ones are true and which are false
        var addArray = this.state.checkBoxData//ex addArray=[false,true,false,false]
        addArray[storedNum] = checkBoxData.deleteBool // ex addArray[0]=true
        console.log(addArray);

        this.setState({ checkBoxData: addArray, showAll: true });
    }
    getCircleToDelete(toDelete) {
        console.log(toDelete);

        var tempArray;
        tempArray = (this.state.votingCenters).filter(function (el) {
            //console.log('el',el);
            return el.center_name_ar !== toDelete;
        });
        var xls = new XlsExport(tempArray, 'String');
        //console.log(tempArray);
        this.setState({ votingCenters: tempArray, showAll: false, xlsExport: xls });
    }
    getBorderToggle(checkboxBorder) {
        console.log(checkboxBorder);

        if (checkboxBorder.munBorder) {
            console.log(checkboxBorder);
            //if the munborder is toggeled we inject the mun borders in the shape
            this.setState({ delimitation: this.state.delimitationConsistantMun, toggleKey: 'munBorder' });
        } else {
            console.log('ffff');
            //if the munborder is switched off we inject an empty shape
            this.setState({ delimitation: config.initShape, toggleKey: 'noMunBorder' });
        }
        if (checkboxBorder.govBorder) {
            this.setState({ govDelimitation: this.state.delimitationConsistantGov, toggleKeyg: 'govBorder' });
        } else {
            this.setState({ govDelimitation: config.initShape, toggleKeyg: 'noGovBorder' });
        }

        //console.log(munBorder, govBorder);
    }
    render() {
        const position = this.state.position;
        var sampleRadius = this.state.validSamplingArray
        var circleColorArr = this.state.circleColorArr
        var numerOfp1000, numerOf800, numerOf700, numerOf600, numerOf500, numerOfm500;
        var etatKey = this.state.etat, checkBoxData = this.state.checkBoxData, opacityCircle = this.state.opacityCircle;
        var toggleKey = this.state.toggleKey;
        var toggleKeyg = this.state.toggleKeyg;
        //var {etatKey,checkBoxData,opacityCircle}=this.state
        return (
            <div>
                <MenuDrawer getBorderSelection={this.getBorderToggle.bind(this)} VCNum={this.state.VCNum} getSampling={this.getSampling.bind(this)} xlsSave={this.state.xlsExport} getCheckBoxDelete={this.getCheckBoxDelete.bind(this)} updateMapButtonBlocked={this.state.updateMapButtonBlocked} />
                {etatKey == 'loaded' ?
                    <Map center={position} zoom={8} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
                        <TileLayer
                            url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                        />
                        <GeoJSON
                            data={this.state.delimitation}
                            key={etatKey + toggleKey}
                            style={this.style.bind(this)}
                            onEachFeature={
                                (feature, layer) => {
                                    layer.bringToBack()
                                    layer.on({ click: layer.bindPopup(feature.properties.LABEL, { permanent: false, className: "tooltipnamear", direction: "right" }) });
                                    //layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"right" })
                                }
                            }
                        />
                        {/* Gov geojson */}
                        <GeoJSON
                            data={this.state.govDelimitation}
                            key={toggleKeyg}
                            style={this.styleGovDelim.bind(this)}
                        /* onEachFeature={
                            (feature, layer) => {
                                layer.bringToBack()
                                layer.on({ click: layer.bindPopup(feature.properties.LABEL, { permanent: false, className: "tooltipnamear", direction: "right" }) });
                                //layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"right" })
                            }
                        } */
                        />
                        {/* Loop through the json of points and draw our VCs */}

                        {this.state.showAll ? (this.state.allVotingCenters).map(function (obj, i) {
                            var radius, colorFill, weight = 2
                            if ((obj.registeredVoters_mun18 >= 1000) && (checkBoxData[0] == false)) {
                                radius = sampleRadius[0]
                                colorFill = circleColorArr[0]
                            } else if ((obj.registeredVoters_mun18 >= 800 && obj.registeredVoters_mun18 < 1000) && (checkBoxData[1] == false)) {
                                radius = sampleRadius[1]
                                colorFill = circleColorArr[1]
                            } else if ((obj.registeredVoters_mun18 >= 600 && obj.registeredVoters_mun18 < 800) && (checkBoxData[2] == false)) {
                                radius = sampleRadius[2]
                                colorFill = circleColorArr[2]
                            } else if ((obj.registeredVoters_mun18 >= 400 && obj.registeredVoters_mun18 < 600) && (checkBoxData[3] == false)) {
                                radius = sampleRadius[3]
                                colorFill = circleColorArr[3]
                            } else if ((obj.registeredVoters_mun18 >= 300 && obj.registeredVoters_mun18 < 400) && (checkBoxData[4] == false)) {
                                radius = sampleRadius[4]
                                colorFill = circleColorArr[4]
                            } else if ((obj.registeredVoters_mun18 >= 200 && obj.registeredVoters_mun18 < 300) && (checkBoxData[5] == false)) {
                                radius = sampleRadius[5]
                                colorFill = circleColorArr[5]
                            } else {
                                radius = 0
                                colorFill = 'black',
                                    weight = 0
                            }
                            return (<Circle onContextMenu={this.getCircleToDelete.bind(this, obj.center_name_ar)} radius={radius} key={i} fillOpacity={opacityCircle} weight={weight} fillColor={colorFill} center={([obj.lat, obj.lon])}>
                                <Popup>
                                    <span>
                                        <h4>id: <b>{obj.id}</b></h4>
                                        <h5>VC name: <b>{obj.center_name}</b></h5>
                                        <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                        <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                        <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                        <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                        <h4>radius is : <b>{radius} m</b></h4>
                                        <h4>Parl 2014 turnout VC level: <b>{(obj.signingVoters_par14 * 100 / obj.registeredVoters_par14).toFixed(2)} %</b></h4>
                                        <h4>Pres 2014 turnout VC level:  <b>{(obj.signingVoters_pres14 * 100 / obj.registeredVoters_pres14).toFixed(2)} %</b></h4>
                                        <h4>number of registered 2018: <b>{obj.registeredVoters_mun18}</b> </h4>
                                        <h4>Rural Per: <b>{Number(obj.ruralPer).toFixed(2)}%</b> </h4>
                                        <h4>Urban Per: <b>{Number(obj.urbanPer).toFixed(2)}%</b> </h4>
                                        <h4>Unemployment Per: <b>{Number(obj.unemploymentPercentage).toFixed(2)}%</b> </h4>
                                        <h4>Mun State: <b>{obj.state}</b> </h4>
                                        {/* <button className='btn-warning col-md-offset-5' onClick={this.getCircleToDelete.bind(this, obj.center_name_ar)}>Delete</button> */}

                                    </span>
                                </Popup>
                            </Circle>)
                        }, this)

                            :
                            /* REPEATING THE SAME BLOCK AS ABOVE BUT WIth DIfFEreNT VCs -Incase we deleted some VCs we work on the deleted set here  */
                            (this.state.votingCenters).map(function (obj, i) {
                                var radius, colorFill, weight = 2
                                if ((obj.registeredVoters_mun18 >= 1000) && (checkBoxData[0] == false)) {
                                    radius = sampleRadius[0]
                                    colorFill = circleColorArr[0]
                                } else if ((obj.registeredVoters_mun18 >= 800 && obj.registeredVoters_mun18 < 1000) && (checkBoxData[1] == false)) {
                                    radius = sampleRadius[1]
                                    colorFill = circleColorArr[1]
                                } else if ((obj.registeredVoters_mun18 >= 600 && obj.registeredVoters_mun18 < 800) && (checkBoxData[2] == false)) {
                                    radius = sampleRadius[2]
                                    colorFill = circleColorArr[2]
                                } else if ((obj.registeredVoters_mun18 >= 400 && obj.registeredVoters_mun18 < 600) && (checkBoxData[3] == false)) {
                                    radius = sampleRadius[3]
                                    colorFill = circleColorArr[3]
                                } else if ((obj.registeredVoters_mun18 >= 300 && obj.registeredVoters_mun18 < 400) && (checkBoxData[4] == false)) {
                                    radius = sampleRadius[4]
                                    colorFill = circleColorArr[4]
                                } else if ((obj.registeredVoters_mun18 >= 200 && obj.registeredVoters_mun18 < 300) && (checkBoxData[5] == false)) {
                                    radius = sampleRadius[5]
                                    colorFill = circleColorArr[5]
                                } else {
                                    radius = 0
                                    colorFill = 'black',
                                        weight = 0
                                }

                                return (
                                    <Circle onContextMenu={this.getCircleToDelete.bind(this, obj.center_name_ar)} radius={radius} key={i} fillOpacity={opacityCircle} weight={weight} fillColor={colorFill} center={[obj.lat, obj.lon]}>
                                        <Popup>
                                            <span>
                                                <h4>id: <b>{obj.id}</b></h4>
                                                <h5>VC name: <b>{obj.center_name}</b></h5>
                                                <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                                <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                                <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                                <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                                <h4>radius is : <b>{radius} m</b></h4>
                                                <h4>Parl 2014 turnout VC level: <b>{(obj.signingVoters_par14 * 100 / obj.registeredVoters_par14).toFixed(2)} %</b></h4>
                                                <h4>Pres 2014 turnout VC level:  <b>{(obj.signingVoters_pres14 * 100 / obj.registeredVoters_pres14).toFixed(2)} %</b></h4>
                                                <h4>number of registered 2018: <b>{obj.registeredVoters_mun18}</b> </h4>
                                                <h4>Rural Per: <b>{Number(obj.ruralPer).toFixed(2)}%</b> </h4>
                                                <h4>Urban Per: <b>{Number(obj.urbanPer).toFixed(2)}%</b> </h4>
                                                <h4>Unemployment Per: <b>{Number(obj.unemploymentPercentage).toFixed(2)}%</b> </h4>
                                                <h4>Mun State: <b>{obj.state}</b> </h4>
                                                {/* <button className='btn-warning col-md-offset-5' onClick={this.getCircleToDelete.bind(this, obj.center_name_ar)}>Delete</button> */}
        
                                            </span>
                                        </Popup>
                                    </Circle>)
                            }, this)

                        }
                        <LayersControl position="topright">
                        <LayersControl.BaseLayer name="Google Map">
                                <TileLayer
                                    url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                                <TileLayer
                                    attribution="&copy; MapBox "
                                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                                <TileLayer
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                    </Map> : <div>
                        <div className='col-md-4'></div>
                        <div className='col-md-5' style={{ marginTop: '43vh', textAlign: 'center' }}>
                            <h2 >'Loading Map'</h2> <h3>this might take a minute, sorry for the inconvenience !</h3>
                            <div style={{ marginLeft: '40%' }}>
                                <ReactLoading type='bars' color='#444' className='react-Loader' delay={0} />
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default OneToOne;