import {
  SET_CONNECTIONS, SET_CONNECTION_REQUESTS,
  SET_CONNECTION_REQUEST_STATUS, SET_CONNECTION_NOTIFICATION
} from '../constants/connections/connectionReducerTypes';

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
    case SET_CONNECTION_REQUEST_STATUS:
      let requestStatus = [].concat(state.requests);
      const newConnectionsStatus = requestStatus.map(request => {
        if (request.userId === action.userId) return Object.assign({}, request, { status: action.status, error: action.error });
        return request;
      });
      return { ...state, ...{ requests: newConnectionsStatus } };
    default:
      return state;
  }
}
