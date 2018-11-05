export default initialState => reducerMap => (state = initialState, action = { type: '' }) => {
  const reducer = reducerMap[action.type]
  return reducer ? reducer(state, action) : state
}
