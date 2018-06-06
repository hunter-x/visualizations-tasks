import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl } from 'react-leaflet';
import ReactLoading from 'react-loading';
import axios from 'axios';
import config from '../../config'
import Control from 'react-leaflet-control';
import MapKey from './MapKey';

import Translate from 'react-translate-component';
import { transparent } from 'material-ui/styles/colors';

export default class PartyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeIsLoaded: true, shape: config.initShape, key: 1,
      filter: 'govLevel', checked: [true, false],
      grades: [0, 34, 38], keyTitle: 'Turnout Percentage',
      nom: '', blank: '', nulled: '', turnout: '',
    }
  }

  getColorRegElg(d, c1) {
    //console.log(d, c1, grades);
    if (d == 'yes') { return (c1[0]); }
    else { return (c1[1]); }
  }

  style(feature) {
    return {
      fillColor: this.getColorRegElg(feature.properties.tadeem, ['#6BD6C5', '#FFD8BB']),
      weight: 1.2,
      opacity: 0.9,
      color: 'grey',
      dashArray: '1',
      fillOpacity: 0.9
    }
  }
  styleGovLimiter(feature) {
    return {
      fillColor: 'none',
      weight: 2.5,
      opacity: 2,
      color: 'black',
      dashArray: '3',
      fillOpacity: 1
    };
  }

  highlightFeature(e) {
    const layer = e.target;
    const property = e.target.feature.properties;
    console.log(property);
    this.setState({
      nom: property.NAME_EN, destroy: false, blank: property.blank_votes_per  , nulled: property.null_votes_per , turnout: (property.turnout).toFixed(2)
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
    const TURNOUT = <Translate type='text' content='MunTurnoutMap.TURNOUT' />//TURNOUT
    const BLANKVOTES = <Translate type='text' content='tadeemMap.BLANKVOTES' />//Blank Votes
    const NULLVOTES = <Translate type='text' content='tadeemMap.NULLVOTES' />//Null votes

    const HOVER = <Translate type='text' content='map.hover' />//Hover Over the map for more info
    const LOADING = <Translate type='text' content='map.loading' />//Loading Map
    return (
      <div className="topMap">
      {this.state.shapeIsLoaded ? <Map maxZoom={9} center={[34.79, 10.18]} scrollWheelZoom={false} zoom={7} minZoom={5} style={{ height: "95vh", width: "100%", position: "relative" }}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
          />

          <GeoJSON
            key={"a" + this.state.filter}
            data={G_Tadeem}
            style={this.style.bind(this)}
            onEachFeature={
              (feature, layer) => {
                layer.on({ mouseover: this.highlightFeature.bind(this) });
                layer.on({ mouseout: this.resetFeature.bind(this) });
              }
            }
          >
            <Tooltip direction="bottom" className="leafletTooltip" sticky={true} >
              <div>
                <h3 style={{ textAlign: 'center' }}>{this.state.nom}</h3>
                <h4>{TURNOUT} : {this.state.turnout} %</h4>
                <h4>{BLANKVOTES} : {(this.state.blank)} %</h4>
                <h4>{NULLVOTES} : {(this.state.nulled)} %</h4>
              </div> 
            </Tooltip>
          </GeoJSON>

          <GeoJSON
            key={"b" + this.state.filter}
            data={G_munElec_gov}
            style={this.styleGovLimiter.bind(this)}

          />

          <Control position="topright" >
            <h5>{HOVER}</h5>
          </Control>
          <Control position="bottomright" >
            <MapKey grades={this.state.grades} colorSet={["#ffffcc", "#c2e699", "#78c679", "#238443"]} keyTitle={this.state.keyTitle} key={this.state.filter} />
          </Control>
          <Control position="topleft"  >
          <div className="col-lg-12 col-sm-2 col-sm-offset-2 col-lg-offset-1">
          <div className="well MenuShadow SideMenuePosition info-card-font">
             <h6 className='center'>Control the map</h6>
          </div>
          </div>
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
        </div>
    
    );
  }
}

