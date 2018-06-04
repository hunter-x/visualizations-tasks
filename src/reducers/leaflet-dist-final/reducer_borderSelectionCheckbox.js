import { BORDERSELECTIONCHECCKBOX } from "../../actions/index";

export default function(state = {govBorder: true, munBorder: false}, action) {
  switch (action.type) {
    case BORDERSELECTIONCHECCKBOX:
      return action.payload;
  }
  return state;
}
