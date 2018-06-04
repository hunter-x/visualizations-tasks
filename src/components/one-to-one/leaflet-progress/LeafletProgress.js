import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Marker, Circle, CircleMarker } from 'react-leaflet';
import MenuDrawer from './MenuDrawer';
import axios from 'axios';
import config from '../../config';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import './s.css'
import { connect } from "react-redux";



class LeafletProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1, position: [34.8, 9.0],
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
        /* values to send to Menu drawer related to distribution */
        let retourValue=0,totaldistriuted=0,vcNumberRetour=0,vcNumberreached=0,per=0
        if (this.props.dateSelectionMenu=='G_L_23') {
            retourValue=2052 ;  totaldistriuted=205600 ; vcNumberRetour=16,vcNumberreached=257,per=25.7 ;
        }else if(this.props.dateSelectionMenu=='G_L_24'){
            retourValue=1425 ;  totaldistriuted=94400 ; vcNumberRetour=17,vcNumberreached=118,per=37.5 ;
        }else if(this.props.dateSelectionMenu=='G_L_25'){
            retourValue=2694 ;  totaldistriuted=102400 ; vcNumberRetour=44,vcNumberreached=128,per=50.3 ;
        }else if (this.props.dateSelectionMenu=='G_L_26'){
            retourValue=2372 ;  totaldistriuted=97600 ; vcNumberRetour=52,vcNumberreached=122,per=62.5 ;
        }else if (this.props.dateSelectionMenu=='G_L_27'){
            retourValue=0 ;  totaldistriuted=63200 ; vcNumberRetour=0,vcNumberreached=79,per=70.4 ;
        }else if (this.props.dateSelectionMenu=='G_L_28'){
            retourValue=0 ;  totaldistriuted=106400 ; vcNumberRetour=0,vcNumberreached=133,per=83.7 ;
        }else if (this.props.dateSelectionMenu=='G_L_29'){
            retourValue=0 ;  totaldistriuted=92800 ; vcNumberRetour=0,vcNumberreached=116,per=95.3 ;
        }
        return (
            <div>
                <MenuDrawer retourValue={retourValue} totaldistriuted={totaldistriuted} vcNumberRetour={vcNumberRetour} vcNumberreached={vcNumberreached} per={per} />
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

                            (window[this.props.dateSelectionMenu]).map(function (obj, i) {
                                let opacityMap
                                if (!treatmentSelectionCheckbox.retour) {
                                    var funcRes = allocatePoints(treatmentSelectionCheckbox.gratitude, treatmentSelectionCheckbox.intention, treatmentSelectionCheckbox.pressure, treatmentSelectionCheckbox.other, obj.treata, obj.radius)
                                    funcRes[3] == 0 ? opacityMap = 0 : opacityMap = Number(treatmentSelectionCheckbox.opacity)

                                } else {
                                    var funcRes = allocatePointsReturn(treatmentSelectionCheckbox.gratitude, treatmentSelectionCheckbox.intention, treatmentSelectionCheckbox.pressure, treatmentSelectionCheckbox.other, obj.treata, obj.radius, obj.retour)
                                 funcRes==undefined?funcRes=[null, null, 0, 0]:null;
                                 funcRes[3] == 0 ? opacityMap = 0 : opacityMap = Number(treatmentSelectionCheckbox.opacity)

                                }
                                
                                return (<Circle radius={funcRes[0]} key={i} fillOpacity={opacityMap} weight={funcRes[2]} fillColor={funcRes[1]} center={([Number(obj.lat), Number(obj.lon)])}>
                                    <Popup>
                                        <span>
                                            <h4>id: <b>{obj.id}</b></h4>
                                            <h4>retour: <b>{obj.retour?obj.retour:'N/A'}</b></h4>
                                            <h5>VC name: <b>{obj.center_name}</b></h5>
                                            <h5>VC name Ar: <b>{obj.center_name_ar}</b></h5>
                                            <h4>mun name: <b>{obj.mun_name_en}</b></h4>
                                            <h4>mun name Ar: <b>{obj.mun_name_ar}</b></h4>
                                            <h4>gov name: <b>{obj.gov_name_en}</b></h4>
                                            <h4>radius is : <b>{funcRes[0]} m</b></h4>
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
                                    url="https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
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
        dateSelectionMenu: state.dateSelectionMenu
    };
}

export default connect(mapStateToProps)(LeafletProgress);
function allocatePoints(gratitude, intention, pressure, other, treata, radiusInput) {
    //console.log(gratitude,intention ,pressure,other,treata,radiusInput);
    var radius, colorFill, weight = 0.1
    if (gratitude) {
        if (treata == 'L-Gratitude') {
            radius = Number(radiusInput)
            colorFill = 'green'
            return [radius, colorFill, 0.1]
        }
    } else if (!gratitude) {
        if (treata == 'L-Gratitude') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }

    if (intention) {
        if (treata == 'L-Intentions') {
            radius = Number(radiusInput)
            colorFill = 'orange'
            return [radius, colorFill, 0.1]
        }
    } else if (!intention) {
        if (treata == 'L-Intentions') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }

    if (pressure) {
        if (treata == 'L-Pressure') {
            radius = Number(radiusInput)
            colorFill = 'red'
            return [radius, colorFill, 0.1]
        }
    } else if (!pressure) {
        if (treata == 'L-Pressure') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }

    if (other) {
        if (treata == 'L-TBD') {
            radius = Number(radiusInput)
            colorFill = 'blue'
            return [radius, colorFill, 0.1]
        }
    } else if (!other) {
        if (treata == 'L-TBD') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }
}

function allocatePointsReturn(gratitude, intention, pressure, other, treata, radiusInput,retourValue) {
    //console.log(gratitude,intention ,pressure,other,treata,radiusInput);
    var radius, colorFill, weight = 0.1
    if (gratitude && parseInt(retourValue)!=0) {
        if (treata == 'L-Gratitude') {
            radius = Number(radiusInput)
            colorFill = 'green'
            return [radius, colorFill, 0.1]
        }
    } else if (!gratitude&&parseInt(retourValue)==0) {
        if (treata == 'L-Gratitude') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }

    if (intention && parseInt(retourValue)!=0) {
        if (treata == 'L-Intentions') {
            radius = Number(radiusInput)
            colorFill = 'orange'
            return [radius, colorFill, 0.1]
        }
    } else if (!intention&&parseInt(retourValue)==0) {
        if (treata == 'L-Intentions') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }

    if (pressure  && parseInt(retourValue)!=0) {
        if (treata == 'L-Pressure') {
            radius = Number(radiusInput)
            colorFill = 'red'
            return [radius, colorFill, 0.1]
        }
    } else if (!pressure&&parseInt(retourValue)==0) {
        if (treata == 'L-Pressure') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }

    if (other && parseInt(retourValue)!=0) {
        if (treata == 'L-TBD') {
            radius = Number(radiusInput)
            colorFill = 'blue'
            return [radius, colorFill, 0.1]
        }
    } else if (!other&&parseInt(retourValue)==0) {
        if (treata == 'L-TBD') {
            radius = 0
            colorFill = 'green'
            weight = 0
            return [null, null, 0, 0]
        }
    }
}