import * as DashboardTabs from '../constants/dashboard/dashboardTypes';
import { SET_DASH_QUERY,
         SET_DASH_TAB,
         SET_DASH_FILTER,
         RESET_DASH,
         SET_PAGE } from '../constants/dashboard/dashboardReducerTypes';

const initialState = {
  page: 1,
  query: '',
  filters: {},
  tab: DashboardTabs.OPPORTUNITIES
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_DASH_FILTER:
      if (action.filter.myConnections) {
        return { ...state, ...{
            filters: Object.assign({}, action.filter),
            page: 1
          }
        };
      }
      else
      {
        return { ...state, ...{
            filters: Object.assign({}, state.filters, action.filter),
            page: 1
          }
        };
      }
    case SET_DASH_QUERY:
      return { ...state, ...{
          query: action.query,
          page: 1
        }
      };
    case SET_DASH_TAB:
      return { ...state, ...{
          tab: action.tab,
          filters: Object.assign({}, { myConnections: false }),
          page: 1
        }
      };
    case RESET_DASH:
      const initial = Object.assign({}, initialState);
      return { ...state, ...initial };
    case SET_PAGE:
      return { ...state, ...{ page: action.page } };
    default:
      return state;
  }
}
