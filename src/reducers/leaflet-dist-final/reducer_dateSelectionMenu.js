import { DATESELECTIONMENU } from "../../actions/index";

export default function (state = 'G_L_23' , action) {
  switch (action.type) {
    case DATESELECTIONMENU:
      return action.payload;
  }
  return state;
}
