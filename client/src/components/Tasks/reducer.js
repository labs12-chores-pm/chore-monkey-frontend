export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload]
      }

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    default:
      return state
  }
}
