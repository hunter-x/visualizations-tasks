import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip } from 'react-leaflet';
import Control from 'react-leaflet-control';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import MapKey from './MapKey';
import axios from 'axios';
import config from '../../config'
import ReactLoading from 'react-loading';
import SideMenu from '../cso/SideMenu';

export default class SelectionMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      COLOR_SET: ["#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c"], GRADES: [500, 900, 1200], COLOR_FUNC: this.getColor,
      NGO_TYPE_FILTER: 'sum', ALL_NGO_NUM: 20954,shapeIsLoaded: false, shape: config.initShape, key: 1,
    }
  }

  componentWillMount() {
    let qString = `${config.apiUrl}/api/shape/gov_cso_number_26-05`;
    console.log(qString);
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
        console.log(response.data);
        this.setState({ shape: JSON.parse(response.data.data), shapeIsLoaded: true });
      })
      .catch(function (error) {
        console.log(error);
      });
    //defining the name of the map key from the Language file en
    this.setState({ keyTitle: counterpart.translate('csoMap.MapTitle') });
  }

  getColor(d, c1, grades) {
    if (d > grades[2]) { return (c1[3]); }
    else if (d > grades[1]) { return (c1[2]); }
    else if (d > grades[0]) { return (c1[1]); }
    else { return (c1[0]); }
  }

  style(feature) {
    //check for what we have checked as filter subject : Population || state ||
    let NGO_TYPE = this.state.NGO_TYPE_FILTER
    console.log('style', NGO_TYPE);
    let NGO_NUMBER = parseInt(feature.properties[NGO_TYPE]);
    return {
      fillColor: this.getColor(NGO_NUMBER, this.state.COLOR_SET, this.state.GRADES),
      weight: 1,
      color: 'black',
      dashArray: '4',
      fillOpacity: 0.8
    };
  }

  highlightFeature(e) {
    const layer = e.target;
    const property = layer.feature.properties;
    //this if is to load name accordiing to chosen language
    if (counterpart.getLocale() == 'ar') {
      var GOV_NAME = property.NAME_AR;
    } else {
      var GOV_NAME = property.NAME_EN;
    }
    let NGO_TYPE = this.state.NGO_TYPE_FILTER
    let NGO_NUMBER = parseInt(property[NGO_TYPE]);
    let ALL_NGO_NUM = parseInt(this.state.ALL_NGO_NUM);
    let NGO_PERCENTAGE_PER_GOV = ((NGO_NUMBER * 100) / ALL_NGO_NUM).toFixed(2);
    this.setState({
      NGO_NUMBER, NGO_PERCENTAGE_PER_GOV, GOV_NAME
    });
    return layer.setStyle({
      weight: 6,
      color: '#666',
      dashArray: '',
      fillOpacity: 1
    });
  }
  resetFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 1,
      color: 'black',
      dashArray: '4',
      fillOpacity: 0.8
    });
  }
  //handle the change in the filter
  getMapType(type) {

    let NGO_TYPE_FILTER = type.substr(0, type.indexOf('-'))//scientific from scientific-[10,15]/5
    let GRADES = JSON.parse(type.substring(type.lastIndexOf("-") + 1, type.lastIndexOf("/")))//[10,15] from scientific-[10,15]/5
    let ALL_NGO_NUM = parseInt(type.substr(type.indexOf('/') + 1))//5 from scientific-[10,15]/5
    this.setState({ key: type, NGO_TYPE_FILTER, GRADES, ALL_NGO_NUM });
  }
  redirectMap(e){
    console.log(e.target.feature.properties);
    //this.setState({redirect:e.target.feature.properties.gouv_name});
    this.props.handleMapClickFather(e.target.feature.properties.NAME_EN)
  }

  render() {
    const position = [35.2, 9.0];
    const tooltipNumber = <Translate type="text" content="csoMap.tooltipNumber" />// NGO
    const tooltipPercentage = <Translate type="text" content="csoMap.tooltipPercentage" />//of NGOs
    const mapKeySubtitle = <Translate type="text" content="csoMap.mapTime" />//'data collected 28-11-18',
    const MapTitle = <Translate type="text" content="csoMap.MapTitle" />//'data collected 28-11-18',

    const HOVER = <Translate type='text' content='map.hover' />//Hover Over the map for more info
    const LOADING = <Translate type='text' content='map.loading' />//Loading Map

    return (
      <div style={{marginTop:'3vh'}}>
       
        {this.state.shapeIsLoaded ?<Map maxZoom={9} center={[34.79, 9.0]} scrollWheelZoom={false} zoom={7} minZoom={5} style={{ height: "95vh", width: "90vw", position: "relative", backgroundColor: "white" }}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
        />

            <GeoJSON
              key={"a" + this.state.key}
              data={this.state.shape}
              style={this.style.bind(this)}
              onEachFeature={
                (feature, layer) => {
                  layer.on({ mouseover: this.highlightFeature.bind(this) });
                  layer.on({ mouseout: this.resetFeature.bind(this) });
                  layer.on({ click : this.redirectMap.bind(this)});

                }
              }
            >
              <Tooltip direction="right" className="leafletTooltip" >
                <div>
                  <h3>{this.state.GOV_NAME}</h3>
                  {
                    <div>
                      <h4><b>{this.state.NGO_NUMBER}</b>  {tooltipNumber} </h4>
                      <h4><b>{this.state.NGO_PERCENTAGE_PER_GOV} % </b>{tooltipPercentage}</h4>
                    </div>
                  }
                </div>
              </Tooltip>
            </GeoJSON>

            <Control position="topright" >
            <h5>{HOVER}</h5>
          </Control>
            {/*Map Keys coropleth*/}
            <Control position="bottomright" >
              <MapKey colorSet={this.state.COLOR_SET} grades={this.state.GRADES} getColor={this.state.COLOR_FUNC} keyTitle={this.state.keyTitle} keySubtitle={mapKeySubtitle} />
            </Control>

             <Control position="topright" >
            <SideMenu getMapType={this.getMapType.bind(this)} />

            </Control> 
          </Map>:
          <div>
            <div className="col-md-5"></div>
            <div className="col-md-5" style={{ marginTop: "20vh" }}>
              <h2>{LOADING}</h2>
              <div style={{ marginLeft: "70px" }}>
                <ReactLoading type="bars" color="#444" className="react-Loader" delay={0} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
