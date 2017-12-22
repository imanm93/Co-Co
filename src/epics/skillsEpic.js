import Rx from 'rxjs';

import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { GET_SKILLS_URL } from '../constants/skills/skillsEndpoints';
import { FETCH_SKILLS } from '../constants/skills/skillsFetchTypes';
import { SET_SKILLS } from '../constants/skills/skillsReducerTypes';

export const getSkills = (action$, store) =>
  action$.ofType(FETCH_SKILLS)
      .switchMap(action =>
        Rx.Observable.ajax(GET_SKILLS_URL)
        .map(data => {
          return ({
            type: SET_SKILLS,
            data: data.response
          })
        })
        .catch(err => Rx.Observable.of({
          type: SET_API_ERROR,
          data: err
        }))
      )
