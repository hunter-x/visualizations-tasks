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
      grades: [0, 34, 38], keyTitle: 'Results per votes percentage',
      nom: '', results_Percentage: '', turnout: '', blank_per: '', deputy: '', seats: ''
    }
  }

  getColorRegElg(d, c1, grades) {
    if (d > grades[2]) { return (c1[3]); }
    else if (d > grades[1]) { return (c1[2]); }
    else if (d > grades[0]) { return (c1[0]); }
    else { return '#F2F2F0' }
  }

  style(feature) {
    let PROPERTY = parseInt(feature.properties.votes_obtenus * 100 / feature.properties.total_votes_valide);
    //console.log(PROPERTY);
    return {
      fillColor: this.getColorRegElg(PROPERTY, ["#ffff9c", "#c2e699", "#78c679", "#238443"], this.props.grades),
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

    const turnout = (property.total_votes * 100 / property.allreg_sum).toFixed(2);
    const blank_per = (property.votes_blancs * 100 / property.total_votes).toFixed(2);
    const results_Percentage = (property.votes_obtenus * 100 / property.total_votes_valide).toFixed(2);
   /*  const seats_per = (property.seats * 100 / property.chair).toFixed(2);
    const seats_num = property.seats */
    this.setState({
      nom: property.NAME_EN, destroy: false, deputy: property.deputy,
      turnout: isNaN(turnout) ? 'None' : turnout+' %',
      blank_per: isNaN(blank_per) ? 'None' : blank_per+' %',
      results_Percentage: isNaN(results_Percentage) ? 'None' : results_Percentage+' %'
      /* ,seats: isNaN(seats_num) ? 'None' : seats_num, */
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
    const VOTES_PER = <Translate type='text' content='partySheet.VOTES_PER' />//votes percentage 
    const TURNOUT = <Translate type='text' content='MunTurnoutMap.TURNOUT' />//Turnout
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
            key={this.props.shapeToSelect}
            data={window[this.props.shapeToSelect]}
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
                <h4>{VOTES_PER} : {this.state.results_Percentage} </h4>
                <h4>{BLANKVOTES} : {(this.state.blank_per)} </h4>
                <h4>{TURNOUT} : {(this.state.turnout)} </h4>
              </div>
            </Tooltip>
          </GeoJSON>

          <GeoJSON
          key={'b'+this.props.shapeToSelect}
            data={G_munElec_gov}
            style={this.styleGovLimiter.bind(this)}
          />

          <Control position="topright" >
            <h5>{HOVER}</h5>
          </Control>
          <Control position="bottomright" >
            <MapKey grades={this.props.grades} colorSet={["#ffffcc", "#c2e699", "#78c679", "#238443"]} keyTitle={this.state.keyTitle} key={this.state.filter} />
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

