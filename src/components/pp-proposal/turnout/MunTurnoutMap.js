import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl } from 'react-leaflet';
import ReactLoading from 'react-loading';
import axios from 'axios';
import config from '../../config'
import Control from 'react-leaflet-control';
import MapKey from './MapKey';

import './MunTurnoutMap.css'
import Translate from 'react-translate-component';

export default class MunTurnoutMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeIsLoaded: false, shape: config.initShape, key: 1,
      filter: 'citizen', checked: [true, false, false, false, false],
      grades: [0,30000, 45000], keyTitle: 'Number of citizens',
      nom:'',population_number:'',field:'',salle:'',atheletic:'',complex:''
    }
  }

  componentWillMount() {
    let qString = config.apiUrl + "/api/shape/Tunis_arrondissements";
    axios({
      method: 'get',
      url: qString,
      headers: {
        'name': 'Isie',
        'password': 'Isie@ndDi'
      }
    })
      .then(response => {
        //console.log(response);
        this.setState({
          shape: JSON.parse(response.data.data), key: 2, shapeIsLoaded: true
        });
      }
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRadioFilter(filter, e) {
    let checked = [false, false, false, false, false];
    checked[parseInt(e.target.value)] = true;
    let GRADES, keyTitle;
    if (filter == 'citizen') {
      GRADES = [0,30000, 45000];
      keyTitle = <Translate type='text' content='mapKey.citizen' />
    } else if (filter == 'complex') {
      GRADES = [0, 1, 2];
      keyTitle =<Translate type='text' content='mapKey.complex' />
    } else if (filter == 'field') {
      GRADES = [0, 5, 9];
      keyTitle = <Translate type='text' content='mapKey.field' />
    } else if (filter == 'hall') {
      GRADES = [0, 1, 2];
      keyTitle = <Translate type='text' content='mapKey.hall' />
    } else if (filter == 'athletic') {
      GRADES = [0, 2, 4];
      keyTitle = <Translate type='text' content='mapKey.athletic' />
    }
    this.setState({grades: GRADES, keyTitle, filter, checked });
  }

  getColorRegElg(d, c1, grades) {
    //console.log(d, c1, grades);
    if (d > grades[2]) { return (c1[3]); }
    else if (d > grades[1]) { return (c1[2]); }
    /* else if (d > grades[0]) { return (c1[1]); } */
    else { return (c1[0]); }
  }
  style(feature) {
    //console.log(feature.properties);
    let PROPERTY, GRADES;
    if (this.state.filter == 'citizen') {
      PROPERTY = parseInt(feature.properties.population_number);
      GRADES = [0,30000, 45000];
    } else if (this.state.filter == 'complex') {
      PROPERTY = parseInt(feature.properties.complex);
      GRADES = [0, 1, 2];
    } else if (this.state.filter == 'field') {
      PROPERTY = parseInt(feature.properties.field);
      GRADES = [0, 5, 9];
    } else if (this.state.filter == 'hall') {
      PROPERTY = parseInt(feature.properties.salle);
      GRADES = [0, 1, 2];
    } else if (this.state.filter == 'athletic') {
      PROPERTY = parseInt(feature.properties.atheletic);
      GRADES = [0, 2, 4];
    }

    return {
      fillColor: this.getColorRegElg(PROPERTY, ["#ffffcc", "#c2e699", "#78c679", "#238443"], GRADES),
      weight: 2.5,
      opacity: 2,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  highlightFeature(e) {
    const layer = e.target;
    const property = e.target.feature.properties;
    console.log(property);
    this.setState({
      destroy: false, nom: property.nom,population_number:property.population_number, field: property.field,salle: property.salle, atheletic: property.atheletic, complex: property.complex
    });
    return layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 1
    });
  }
  resetFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5
    });
    this.setState({ destroy: true });
  }

  render() {
    // console.log(dataSport);
    const GOV = <Translate type='text' content='box.gov' />//Governorate level
    const MUN = <Translate type='text' content='box.mun' />//Municipality level
    const FIELD = <Translate type='text' content='box.field' />//Sports fields
    const SALLE = <Translate type='text' content='box.salle' />//sports Hall
    const ATHLETISM = <Translate type='text' content='box.athletism' />//Athletics Track

    const HOVER = <Translate type='text' content='map.hover' />//Hover Over the map for more info
    const LOADING = <Translate type='text' content='map.loading' />//Loading Map
    return (
      <div className='container'>
        <section className='row col-md-12' >
          <div className="md-radio md-radio-inline">
            <input id="3" type="radio" name="g2" value={0} onClick={this.handleRadioFilter.bind(this, 'citizen')} checked={this.state.checked[0]} />
            <label htmlFor="3">{GOV}</label>
          </div>
          <div className="md-radio md-radio-inline">
            <input id="4" type="radio" name="g2" value={1} onClick={this.handleRadioFilter.bind(this, 'complex')} checked={this.state.checked[1]} />
            <label htmlFor="4">{MUN}</label>
          </div>
        </section>
        {this.state.shapeIsLoaded ? <Map maxZoom={9} center={[34.79, 10.18]} scrollWheelZoom={false} zoom={7} minZoom={5} style={{ height: "95vh", width: "81vw", position: "relative", zIndex: this.props.mapZIndex, backgroundColor: "white" }}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
          />

          <GeoJSON
            key={"a" + this.state.filter}
            data={this.state.shape}
            style={this.style.bind(this)}
          onEachFeature={
            (feature, layer) => {
              //sending shapes center to marker component
              //layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:"tooltipnamear",direction:"right" })
              layer.on({ mouseover: this.highlightFeature.bind(this) });
              layer.on({ mouseout: this.resetFeature.bind(this) });
            }
          }
          >
            <Tooltip direction="bottom" className="leafletTooltip" sticky={true} >
              <div>
                <h3>{this.state.nom}</h3>
                {this.state.filter=='citizen'?
                  <h4>{this.state.population_number} {GOV}</h4>
                  :(this.state.filter=='field'?<h4>{this.state.field} {MUN}</h4>:
                  (this.state.filter=='hall'?<h4>{this.state.salle} {SALLE}</h4>:
                  (this.state.filter=='athletic'?<h4>{this.state.atheletic} {ATHLETISM}</h4>:
                  (this.state.filter=='complex'?<h4>{this.state.complex} {COMPLEX}</h4>:null)
                )))
                }
              </div>
            </Tooltip>

          </GeoJSON>

          <Control position="topright" >
            <p>{HOVER}</p>
          </Control>
          <Control position="bottomright" >
            <MapKey grades={this.state.grades} colorSet={["#ffffcc", "#c2e699", "#78c679", "#238443"]} keyTitle={this.state.keyTitle} key={this.state.filter} />
          </Control>

        </Map> :
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
      </div>);
  }
}


