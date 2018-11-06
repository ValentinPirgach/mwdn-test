import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import * as types from 'constants/ActionTypes'
import * as testersActions from './testers'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore()
const axiosBackend = new MockAdapter(axios)

describe('Testers Actions', () => {
  describe('fetchTesters', () => {
    const testerName = 'octocat'
    const singleTester = { firstName: 'OctoCat' }
    const arrayOfTesters = [{ firstName: 'OctoCat' }, {firstName: 'QA'}]

    beforeEach(() => {
      store.clearActions()
      axiosBackend.reset()
    })

    test('should dispatch correct actionsfor success response with single user object', async done => {
      axiosBackend.onGet(`ex/${testerName}`).reply(200, singleTester)

      const expectedActions = [
        {
          type: types.FETCH_TESTERS_REQUEST,
        },
        {
          type: types.FETCH_TESTERS_SUCCESS,
          payload: [ singleTester ]
        }
      ]

      await store.dispatch(testersActions.fetchTesters(testerName));
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })

    test('should dispatch correct actions for success response with array of users', async done => {
      axiosBackend.onGet(`ex/${testerName}`).reply(200, arrayOfTesters)

      const expectedActions = [
        {
          type: types.FETCH_TESTERS_REQUEST,
        },
        {
          type: types.FETCH_TESTERS_SUCCESS,
          payload: arrayOfTesters
        }
      ]

      await store.dispatch(testersActions.fetchTesters(testerName));
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })

    test('should dispatch correct actions for success empty response', async done => {
      axiosBackend.onGet(`ex/${testerName}`).reply(200)

      const expectedActions = [
        {
          type: types.FETCH_TESTERS_REQUEST,
        },
        {
          type: types.FETCH_TESTERS_NOT_FOUND
        }
      ]

      await store.dispatch(testersActions.fetchTesters(testerName));
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })

    test('should dispatch correct actions for fetchTesters failed response', async done => {
      axiosBackend.onGet(`ex/${testerName}`).reply(500)

      const expectedActions = [
        {
          type: types.FETCH_TESTERS_REQUEST,
        },
        {
          error: true,
          payload: expect.any(Object),
          type: types.FETCH_TESTERS_FAILED,
        }
      ]

      await store.dispatch(testersActions.fetchTesters(testerName));

      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
  })
})
