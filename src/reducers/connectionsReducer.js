import { SET_CONNECTIONS,
         SET_CONNECTION_REQUESTS } from '../constants/connections/connectionReducerTypes';

const initialState = {
  connections: {},
  requests: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_CONNECTIONS:
      return { ...state, ...{ connections: action.data } };
    case SET_CONNECTION_REQUESTS:
      return { ...state, ...{ requests: action.data } };
    default:
      return state;
  }
}
