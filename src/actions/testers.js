import * as types from 'constants/ActionTypes'
import { createAction } from 'redux-actions'
import axios from 'axios'

export const fetchTestersRequest = createAction(types.FETCH_TESTERS_REQUEST)
export const fetchTestersSuccess = createAction(types.FETCH_TESTERS_SUCCESS)
export const fetchTestersNotFound = createAction(types.FETCH_TESTERS_NOT_FOUND)
export const fetchTestersFailed = createAction(types.FETCH_TESTERS_FAILED)

export const fetchTesters = (testerName) => async dispatch => {
  dispatch(fetchTestersRequest())

  try {
    const resp = await axios.get(`ex/${testerName}`);

    console.log(resp.data);

    if(!resp.data) {
      return dispatch(fetchTestersNotFound())
    }

    const data = Array.isArray(resp.data) ? resp.data : [resp.data]

    return dispatch(fetchTestersSuccess(data))
  } catch (e) {
    return dispatch(fetchTestersFailed(e))
  }
}
