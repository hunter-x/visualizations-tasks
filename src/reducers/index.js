import { combineReducers } from 'redux';
import borderSelectionCheckbox from './leaflet-dist-final/reducer_borderSelectionCheckbox' ;
import treatmentSelectionCheckbox from './leaflet-dist-final/reducer_treatmentSelectionCheckbox' ;
import dateSelectionMenu from './leaflet-dist-final/reducer_dateSelectionMenu' ;

const rootReducer = combineReducers({

  borderSelectionCheckbox,
  treatmentSelectionCheckbox,
  dateSelectionMenu
});

export default rootReducer;
