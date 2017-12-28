import * as DashboardTabs from '../constants/dashboard/dashboardTypes';
import { SET_DASH_QUERY, SET_DASH_TAB, SET_DASH_FILTER, RESET_DASH } from '../constants/dashboard/dashboardReducerTypes';

const initialState = {
  filters: {},
  query: '',
  tab: DashboardTabs.ALL_RESULTS
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_DASH_FILTER:
      return { ...state, ...{
          filters: Object.assign({}, state.filters, action.filter)
        }
      };
    case SET_DASH_QUERY:
      return { ...state, ...{
          query: action.query
        }
      };
    case SET_DASH_TAB:
      return { ...state, ...{
          tab: action.tab
        }
      };
    case RESET_DASH:
      return { ...state, ...{ initialState } }
    default:
      return state;
  }
}
