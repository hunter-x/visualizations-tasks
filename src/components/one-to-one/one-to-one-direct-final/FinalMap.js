import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer';
import axios from 'axios';
import config from '../../config';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import './s.css'
import { connect } from "react-redux";



class FinalMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1, position: [35.9, 9.23],
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

    /* getBorderSelection(checkboxBorder) {
        console.log(checkboxBorder);
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
    getTreatment() {

    } */
    render() {

        let { position, toggleKey, toggleKeyg, etat } = this.state;
        let { borderSelectionCheckbox, treatmentSelectionCheckbox } = this.props;
        console.log(etat);
        return (
            <div>
                <MenuDrawer /* getBorderSelection={this.getBorderSelection.bind(this)} */ />
                {etat == 'loaded' ?
                    <Map center={position} zoom={9} style={{ height: '100vh', position: 'relative', backgroundColor: 'white' }}>
                        <TileLayer
                            url='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
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
                            
                            (G_Direct_data_AaronMaps).map(function (obj, i) {
                                var radius, colorFill, weight = 0.1
                                if (treatmentSelectionCheckbox.gratitude) {
                                    if (obj.treata == 'D-Gratitude') {
                                        radius = Number(obj.radius)
                                        colorFill = 'green'
                                    }
                                }else if(!treatmentSelectionCheckbox.gratitude){
                                    if (obj.treata == 'D-Gratitude') {
                                        radius = 0
                                        colorFill = 'green'
                                        weight=0
                                    }
                                }

                                if (treatmentSelectionCheckbox.intention) {
                                    if (obj.treata == 'D-Intentions') {
                                        radius = Number(obj.radius)
                                        colorFill = 'orange'
                                    }
                                }else if(!treatmentSelectionCheckbox.intention){
                                    if (obj.treata == 'D-Intentions') {
                                        radius = 0
                                        colorFill = 'green'
                                        weight=0
                                    }
                                }

                                if (treatmentSelectionCheckbox.pressure) {
                                    if (obj.treata == 'D-Pressure') {
                                        radius = Number(obj.radius)
                                        colorFill = 'red'
                                    }
                                }else if(!treatmentSelectionCheckbox.pressure){
                                    if (obj.treata == 'D-Pressure') {
                                        radius = 0
                                        colorFill = 'green'
                                        weight=0
                                    }
                                }

                                if (treatmentSelectionCheckbox.other) {
                                    if (obj.treata == 'L-TBD') {
                                        radius = Number(obj.radius)
                                        colorFill = 'blue'
                                    }
                                }else if(!treatmentSelectionCheckbox.other){
                                    if (obj.treata == 'L-TBD') {
                                        radius = 0
                                        colorFill = 'green'
                                        weight=0
                                    }
                                }

                        return (<Circle radius={radius} key={i} fillOpacity={Number(treatmentSelectionCheckbox.opacity)} weight={weight} fillColor={colorFill} center={([Number(obj.lat),Number(obj.lon)])}>
                            <Popup>
                                <span>
                                    <h4>id: <b>{obj.id}</b></h4>
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
                                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
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

export default connect(mapStateToProps)(FinalMap);