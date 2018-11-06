import * as types from 'constants/ActionTypes'
import * as testersActions from 'actions/testers'
import reducer, { testersInitialState } from './testers'

describe('Testers Reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(testersInitialState);
  });

  test(`should handle '${types.FETCH_USER_REQUEST}'`, () => {
    const requestAction = testersActions.fetchTestersRequest()
    expect(reducer({}, requestAction)).toEqual({ isFetching: true });
  })

  test(`should handle '${types.FETCH_USER_SUCCESS}'`, () => {
    const payload = [{name: 'OctoCat'}]
    const successAction = testersActions.fetchTestersSuccess(payload)

    expect(reducer({}, successAction)).toEqual({ error: false, notFound: false, isFetching: false, list: payload });
  });

  test(`should handle '${types.FETCH_TESTERS_NOT_FOUND}'`, () => {
    const successAction = testersActions.fetchTestersNotFound()

    expect(reducer({}, successAction)).toEqual({ error: false, notFound: true, isFetching: false, list: [] });
  });

  test(`should handle '${types.FETCH_USER_FAILED}'`, () => {
    const payload = new Error()
    const failedAction = testersActions.fetchTestersFailed(payload)

    expect(reducer({}, failedAction)).toEqual({ error: true, notFound: false, isFetching: false, list: [] });
  });
});
