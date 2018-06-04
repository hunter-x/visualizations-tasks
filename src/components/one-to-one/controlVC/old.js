import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer';
import axios from 'axios';
import config from '../../config';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import './s.css'
import { connect } from "react-redux";



class FinalMapLeafletControlDist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1, position: [34.6, 9.0],
            delimitation: config.initShape, delimitationConsistantMun: config.initShape, etat: 'notloaded',
            govDelimitation: config.initShape, delimitationConsistantGov: config.initShape
            , munBorder: true, govBorder: false, toggleKey: 'mun', toggleKeyg: 'gov' // this state to toggle the mun|gov -> show or hide
        }
    }
    componentWillMount() {
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
                this.setState({ /* delimitation: JSON.parse(response.data.data), */ updateMapButtonBlocked: false, etat: 'loaded', delimitationConsistantMun: JSON.parse(response.data.data) });
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


    render() {

        let { position, toggleKey, toggleKeyg, etat } = this.state;
        let { borderSelectionCheckbox, treatmentSelectionCheckbox } = this.props;
        console.log(etat);
        return (
            <div>
            <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <pattern id="stripeGrat" patternUnits="userSpaceOnUse" width="10" height="10">
      <image href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPScjMDAwMDAwJy8+CiAgPHBhdGggZD0nTS0xLDEgbDIsLTIKICAgICAgICAgICBNMCwxMCBsMTAsLTEwCiAgICAgICAgICAgTTksMTEgbDIsLTInIHN0cm9rZT0nIzU1OTRlNycgc3Ryb2tlLXdpZHRoPScyJy8+Cjwvc3ZnPg==" x="0" y="0" width="10" height="10">
      </image>
    </pattern>
  </defs>
</svg>
            <MenuDrawer /* getBorderSelection={this.getBorderSelection.bind(this)} */ />
                {etat == 'loaded' ?
                    <Map center={position} zoom={7} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
                        <TileLayer
                        url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                        />
                        {/* mun Geojson */}
                        {borderSelectionCheckbox.munBorder ?
                            <GeoJSON
                                data={this.state.delimitationConsistantMun}
                                style={this.style.bind(this)}
                                onEachFeature={
                                    (feature, layer) => {
                                        layer.on({ click: layer.bindPopup(feature.properties.LABEL, { permanent: false, className: "tooltipnamear", direction: "right" }) });
                                    }
                                }
                            />
                            :
                            null
                        }

                        {/* Gov geojson */}
                        {borderSelectionCheckbox.govBorder ?
                            <GeoJSON
                                data={this.state.delimitationConsistantGov}
                                key={toggleKeyg}
                                style={this.styleGovDelim.bind(this)}
                            />
                            :
                            null
                        }

                        {/* Loop through the json of points and draw our VCs */}
                        {
                            (G_LGratitude).map(function (obj, i) {
                                let radius,opacity, colorFill, weight = 0.1
                                if (treatmentSelectionCheckbox.gratitude) {
                                    radius = Number(obj.radius);
                                    colorFill = '#E53935';
                                    opacity=Number(treatmentSelectionCheckbox.opacity);
                                } else if (!treatmentSelectionCheckbox.gratitude) {
                                    radius = 0;
                                    colorFill = ';#4E896A'
                                    weight = 0;
                                    opacity=0
                                }
                                return (<Circle radius={radius} key={i} fillOpacity={opacity} weight={weight} stroke='#ccc' fillColor='url(#stripeGrat)' center={([Number(obj.lat), Number(obj.lon)])}>
                                    <Popup>
                                        <span>
                                            <h4>id: <b>{obj.id}</b></h4>
                                            <h5>Treata : <b>{obj.treata} </b></h5>
                                            <h5>VC name: <b>{obj.center_name}</b></h5>
                                            <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                            <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                            <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                            <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                            <h4>radius is : <b>{radius} m</b></h4>
                                        </span>
                                    </Popup>
                                </Circle>)
                            }, this)
                        }
                        {
                            (G_LIntention).map(function (obj, i) {
                                let radius,opacity, colorFill, weight = 0.1
                                if (treatmentSelectionCheckbox.intention) {
                                    radius = Number(obj.radius);
                                    colorFill = '#3D5AFE';
                                    opacity=Number(treatmentSelectionCheckbox.opacity);
                                } else if (!treatmentSelectionCheckbox.intention) {
                                    radius = 0;
                                    colorFill = ';#B9845F'
                                    weight = 0;
                                    opacity=0
                                }
                                return (<Circle radius={radius} key={i} fillOpacity={opacity} weight={weight} fillColor={colorFill} center={([Number(obj.lat), Number(obj.lon)])}>
                                    <Popup>
                                        <span>
                                            <h4>id: <b>{obj.id}</b></h4>
                                            <h5>Treata : <b>{obj.treata} </b></h5>
                                            <h5>VC name: <b>{obj.center_name}</b></h5>
                                            <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                            <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                            <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                            <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                            <h4>radius is : <b>{radius} m</b></h4>
                                        </span>
                                    </Popup>
                                </Circle>)
                            }, this)
                        }
                        {
                            (G_LPressure).map(function (obj, i) {
                                let radius,opacity, colorFill, weight = 0.1
                                if (treatmentSelectionCheckbox.pressure) {
                                    radius = Number(obj.radius);
                                    colorFill = '#FFEB3B';
                                    opacity=Number(treatmentSelectionCheckbox.opacity);
                                } else if (!treatmentSelectionCheckbox.pressure) {
                                    radius = 0;
                                    colorFill = ';#8C4557'
                                    weight = 0;
                                    opacity=0
                                }
                                return (<Circle radius={radius} key={i} fillOpacity={opacity} weight={weight} fillColor={colorFill} center={([Number(obj.lat), Number(obj.lon)])}>
                                    <Popup>
                                        <span>
                                            <h4>id: <b>{obj.id}</b></h4>
                                            <h5>Treata : <b>{obj.treata} </b></h5>
                                            <h5>VC name: <b>{obj.center_name}</b></h5>
                                            <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                            <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                            <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                            <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                            <h4>radius is : <b>{radius} m</b></h4>
                                        </span>
                                    </Popup>
                                </Circle>)
                            }, this)
                        }
                        {
                            (G_LTbd).map(function (obj, i) {
                                let radius,opacity, colorFill, weight = 0.1
                                if (treatmentSelectionCheckbox.other) {
                                    radius = Number(obj.radius);
                                    colorFill = '#64DD17';
                                    opacity=Number(treatmentSelectionCheckbox.opacity);
                                } else if (!treatmentSelectionCheckbox.other) {
                                    radius = null;
                                    colorFill = null;
                                    weight = 0;
                                    opacity=0
                                }
                                return (<Circle radius={radius} key={i} fillOpacity={opacity} weight={weight} fillColor={colorFill} center={([Number(obj.lat), Number(obj.lon)])}>
                                    <Popup>
                                        <span>
                                            <h4>id: <b>{obj.id}</b></h4>
                                            <h5>Treata : <b>{obj.treata} </b></h5>
                                            <h5>VC name: <b>{obj.center_name}</b></h5>
                                            <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                            <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                            <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                            <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                            <h4>radius is : <b>{radius} m</b></h4>
                                        </span>
                                    </Popup>
                                </Circle>)
                            }, this)

                        }
                        {
                            (G_Control_data_AaronMaps).map(function (obj, i) {
                                var radius, colorFill, weight = 0.1;
                                radius = Number(obj.radius)
                                colorFill = 'black'



                                return (<Circle radius={radius} key={i} fillOpacity={Number(treatmentSelectionCheckbox.opacity)} weight={weight} fillColor={colorFill} center={([Number(obj.lat), Number(obj.lon)])}>
                                    <Popup>
                                        <span>
                                            <h4>id: <b>{obj.id}</b></h4>
                                            <h5>Treata : <b>{obj.treata} </b></h5>
                                            <h5>VC name: <b>{obj.center_name}</b></h5>
                                            <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                            <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                            <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                            <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                            <h4>radius is : <b>{radius} m</b></h4>
                                        </span>
                                    </Popup>
                                </Circle>)
                            }, this)
                        }

                        <LayersControl position="topright">
                            <LayersControl.BaseLayer name="satellite streets mapbox">
                                <TileLayer
                                    url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="streets-mapbox" checked={true}>
                                <TileLayer
                                    attribution="&copy; MapBox "
                                    url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                                    />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Mapnik-OpenStreetMap">
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
function mapStateToProps(state) {
    console.log(state);
    return {
        borderSelectionCheckbox: state.borderSelectionCheckbox,
        treatmentSelectionCheckbox: state.treatmentSelectionCheckbox,
    };
}

export default connect(mapStateToProps)(FinalMapLeafletControlDist);