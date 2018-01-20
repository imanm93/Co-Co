import axios from '../utils/axios';
import { reset } from 'redux-form';
import * as ItemTypes from '../constants/items/itemTypes';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { IS_POSTING_ITEM } from '../constants/items/itemLoaderTypes';
import { SET_NEW_COMMENT_ERROR } from '../constants/items/itemErrorTypes';
import { SET_POST_ITEM_STATUS } from '../constants/postForm/postFormReducerTypes';
import { GET_CONNECTION_REQUESTS_URL } from '../constants/connections/connectionEndpoints';
import { SET_CONNECTION_REQUEST_STATUS } from '../constants/connections/connectionReducerTypes';
import { SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS } from '../constants/items/peopleitems/peopleitemReducerTypes';
import { SET_REQUESTED_CONNECTION, UNSET_REQUESTED_CONNECTION } from '../constants/connections/connectionReducerTypes';
import { INCREMENT_LIKES, DECREMENT_LIKES, INCREMENT_INTERESTED, DECREMENT_INTERESTED, SET_NEW_COMMENT, SET_SHRINK_ITEM } from '../constants/items/itemReducerTypes';
import { GET_ITEM_LIKES_URL, GET_ITEM_INTERESTED_URL, GET_ITEM_NOT_INTERESTED_URL, GET_ITEM_COMMENT_URL,
         GET_FILTERED_EVENT_ITEMS_URL, GET_FILTERED_OPP_ITEMS_URL, GET_FILTERED_STATUS_ITEMS_URL,
         POST_OPPS_EXTERNAL_URL, POST_EVENTS_EXTERNAL_URL } from '../constants/items/itemEndpoints';

export function resetPostItemForm(formName, ctx) {
  return function (dispatch) {
    dispatch(reset(formName));
    dispatch({
      type: SET_POST_ITEM_STATUS,
      data: ''
    });
    ctx.push('/external/verify');
  }
}

export function shrinkItem(token, type, itemId, userId) {
  return function (dispatch) {
    dispatch({
      type: SET_SHRINK_ITEM,
      id: itemId,
      data: false
    });
  }
}

export function postConnect(token, userId) {
  return function (dispatch) {
    dispatch({
      type: SET_REQUESTED_CONNECTION,
      id: userId
    });
    axios({
      method: 'POST',
      url: GET_CONNECTION_REQUESTS_URL + '/' + userId,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(res => {
      console.log(res);
      /* Do nothing */
    })
    .catch(err => {
      dispatch({
        type: UNSET_REQUESTED_CONNECTION,
        id: userId
      });
      dispatch({
        type: SET_API_ERROR,
        error: err.response ? err.response.data : 'Network error, please try again!'
      });
    })
  }
}

export function postExternalItem(type, values) {
  return function (dispatch) {
    dispatch({
      type: IS_POSTING_ITEM,
      data: true
    });
    let endpoint = '';
    switch(type) {
      case ItemTypes.OPP_ITEM:
        endpoint = POST_OPPS_EXTERNAL_URL;
        break;
      case ItemTypes.EVENT_ITEM:
        endpoint = POST_EVENTS_EXTERNAL_URL;
        break;
      default:
        endpoint = '';
        break;
    }
    axios({
      method: 'post',
      url: endpoint,
      data: values,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      dispatch({
        type: SET_POST_ITEM_STATUS,
        data: 'You post was submitted successfully!'
      });
      dispatch({
        type: IS_POSTING_ITEM,
        data: false
      });
    })
    .catch(err => {
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
      dispatch({
        type: IS_POSTING_ITEM,
        data: false
      });
    })
  }
}

export function postItem(token, type, values) {
  return function (dispatch) {
    dispatch({
      type: IS_POSTING_ITEM,
      data: true
    });
    let endpoint = '';
    switch(type) {
      case ItemTypes.OPP_ITEM:
          endpoint = GET_FILTERED_OPP_ITEMS_URL;
          break;
      case ItemTypes.EVENT_ITEM:
          endpoint = GET_FILTERED_EVENT_ITEMS_URL;
          break;
      case ItemTypes.STATUS_ITEM:
          endpoint = GET_FILTERED_STATUS_ITEMS_URL;
          break;
      default:
          endpoint = GET_FILTERED_OPP_ITEMS_URL;
          break;
    }
    axios({
      method: 'post',
      url: endpoint,
      data: values,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      dispatch({
        type: SET_POST_ITEM_STATUS,
        data: 'You post was submitted successfully!'
      });
      dispatch({
        type: IS_POSTING_ITEM,
        data: false
      });
    })
    .catch(err => {
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
      dispatch({
        type: IS_POSTING_ITEM,
        data: false
      });
    });
  }
}

export function postLike(token, itemId) {
  return function (dispatch) {
    dispatch({
      type: INCREMENT_LIKES,
      id: itemId
    });
    axios({
      method: 'post',
      url: GET_ITEM_LIKES_URL,
      data: {
        itemId: itemId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status === 200) { /*Do nothing*/ }
      else {
        dispatch({
          type: DECREMENT_LIKES,
          id: itemId
        });
      }
    })
    .catch(err => {
      dispatch({
        type: DECREMENT_LIKES,
        id: itemId
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}

export function postInterested(token, userId, itemId) {
  return function (dispatch) {
    dispatch({
      type: INCREMENT_INTERESTED,
      id: itemId
    });
    axios({
      method: 'post',
      url: GET_ITEM_INTERESTED_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        userId: userId,
        eventId: itemId
      }
    })
    .then(res => {
      if (res.status === 200) { /*Do nothing*/ }
      else {
        dispatch({
          type: DECREMENT_INTERESTED,
          id: itemId
        });
      }
    })
    .catch(err => {
      dispatch({
        type: DECREMENT_INTERESTED,
        id: itemId
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}

export function postNotInterested(token, userId, itemId) {
  return function (dispatch) {
    dispatch({
      type: DECREMENT_INTERESTED,
      id: itemId
    });
    axios({
      method: 'post',
      url: GET_ITEM_NOT_INTERESTED_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        userId: userId,
        eventId: itemId
      }
    })
    .then(res => {
      if (res.status === 200) { /*Do nothing*/ }
      else {
        dispatch({
          type: INCREMENT_INTERESTED,
          id: itemId
        });
      }
    })
    .catch(err => {
      dispatch({
        type: INCREMENT_INTERESTED,
        id: itemId
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}

export function postComment(token, userId, name, profilePhotoUrl, itemId, comment) {
  return function (dispatch) {
    const time = new Date().getTime();
    const newComment = {
      lastEdited: time,
      text: comment.text,
      timestamp: time,
      user: {
        id: userId,
        name: name,
        profilePhotoUrl: profilePhotoUrl
      }
    };
    dispatch({
      type: SET_NEW_COMMENT,
      id: itemId,
      comment: newComment
    });
    axios({
      method: 'post',
      url: GET_ITEM_COMMENT_URL,
      data: {
        text: comment.text,
        itemId: itemId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status === 200) { /*Do nothing*/ }
      else {
        dispatch({
          type: SET_NEW_COMMENT_ERROR,
          id: itemId,
          comment: newComment
        });
      }
    })
    .catch(err => {
      dispatch({
        type: SET_NEW_COMMENT_ERROR,
        id: itemId,
        comment: newComment
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      })
    })
  }
}

export function postDelete(token, type, itemId) {
  return function (dispatch) {
    console.log(type, itemId);
  }
}

export function postFromItemAcceptConnection(token, userId) {
  return function(dispatch) {
    dispatch({
      type: SET_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'connected',
      error: ''
    });
    dispatch({
      type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'connected',
      error: ''
    });
    axios({
      method: 'PUT',
      url: GET_CONNECTION_REQUESTS_URL + '/' + userId + '/accept',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      console.log(res.response);
      /* Do Nothing */
    })
    .catch(err => {
      dispatch({
        type: SET_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'default',
        error: ''
      });
      dispatch({
        type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'initial',
        error: 'There was a network issue, please try again!'
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}

export function postFromItemRejectConnection(token, userId) {
  return function(dispatch) {
    dispatch({
      type: SET_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'initial',
      error: ''
    });
    dispatch({
      type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'initial',
      error: ''
    });
    axios({
      method: 'PUT',
      url: GET_CONNECTION_REQUESTS_URL + '/' + userId + '/decline',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      console.log(res.response);
      /* Do nothing */
    })
    .catch(err => {
      dispatch({
        type: SET_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'default',
        error: ''
      });
      dispatch({
        type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'initial',
        error: 'There was a network issue, please try again!'
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}
