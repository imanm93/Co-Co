import Rx from 'rxjs/Rx';
import jwt_decode from 'jwt-decode';
import { push } from 'react-router-redux';

//import { FETCH_AUTH_USER } from '../constants/account/accountFetchTypes';
import { GET_AUTH_USER } from '../constants/account/accountEndpoints';
import { SET_AUTH_USER } from '../constants/account/accountReducerTypes';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

// export const signInEpic = (action$, store) =>
//   action$.ofType(FETCH_AUTH_USER)
//     .debounceTime(100)
//     .map(action => {
//         return {
//             username: action.credentials.email,
//             password: action.credentials.password,
//             "grant_type": "password",
//             scope: "openid"
//         };
//     })
//     .switchMap(payload =>
//       Rx.Observable.ajax.post(GET_AUTH_USER, payload)
//         .map(res => {
//           let token = res.access_token;
//           let decoded = jwt_decode(res.id_token);
//           let userId = decoded.sub;
//           return Rx.Observable.of({
//             type: SET_AUTH_USER,
//             data: {
//               token: token,
//               userId: userId,
//               authenticated: true
//             }
//           });
//         })
//         .catch(err =>
//           Rx.Observable.of({
//             type: SET_API_ERROR,
//             data: err
//           })
//         )
//     )
