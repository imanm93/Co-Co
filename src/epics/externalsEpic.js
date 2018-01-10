import Rx from 'rxjs';

// import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
// import { FETCH_EXTERNAL_COMPANY, FETCH_EXTERNAL_VERIFIED } from '../constants/external/externalFetchTypes';
// import { GET_EXTERNAL_COMPANY_URL, GET_EXTERNAL_VERIFY_URL } from '../constants/external/externalEndpoints';
// import { IS_LOADING_EXTERNAL, IS_GETTING_VERIFICATION } from '../constants/external/externalLoaderTypes';
// import { SET_COMPANY_DETAILS, SET_IS_VERIFIED, SET_COMPANY_ERROR } from '../constants/external/externalReducerTypes';
//
// export const getExternalVerification = (action$, store) =>
//   action$.ofType(FETCH_EXTERNAL_VERIFIED)
//     .switchMap(action =>
//       Rx.Observable.concat(
//         Rx.Observable.of({
//           type: IS_GETTING_VERIFICATION,
//           data: true
//         }),
//         Rx.Observable.ajax({
//           method: 'GET',
//           url: GET_EXTERNAL_VERIFY_URL,
//           data: {
//             uniqueId: action.uniqueId
//           }
//         })
//         .map(res => {
//           console.log(res);
//         })
//         .then(err => {
//           console.log(err);
//         }),
//         Rx.Observable.of({
//           type: IS_GETTING_VERIFICATION,
//           data: false
//         })
//       )
//     )
