import * as types from 'constants/ActionTypes'
import createReducer from 'utils/createReducer'

export const testersInitialState = {list: []}

export default createReducer(testersInitialState)({
  [types.FETCH_TESTERS_REQUEST]: (state) => ({
    ...state,
    isFetching: true
  }),
  [types.FETCH_TESTERS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    list: action.payload,
    error: false,
    notFound: false
  }),
  [types.FETCH_TESTERS_NOT_FOUND]: (state) => ({
    ...state,
    isFetching: false,
    list: [],
    error: false,
    notFound: true
  }),
  [types.FETCH_TESTERS_FAILED]: (state) => ({
    ...state,
    isFetching: false,
    notFound: false,
    error: true,
    list: [],
  })
})
