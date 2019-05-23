export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: [...action.payload]
      }

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      }
    case 'UPDATE':
      return {
        ...state,
        tasks: state.tasks
      }

    default:
      return state
  }
}
