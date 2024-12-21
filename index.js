console.clear();

// Import Redux and Redux Thunk
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// 1. Initial States
const initialTodoState = { todos: [] };
const initialUserState = { user: null, loading: false, error: null };

// 2. Action Types
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

// 3. Action Creators
// For Todos
const addTodo = (todo) => ({ type: ADD_TODO, payload: todo }); // type property mandatory; payload is optional
const removeTodo = (id) => ({ type: REMOVE_TODO, payload: id });

// For User (with Thunk for async actions)
const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
const fetchUserSuccess = (user) => ({ type: FETCH_USER_SUCCESS, payload: user });
const fetchUserFailure = (error) => ({ type: FETCH_USER_FAILURE, payload: error });

const fetchUser = (userId) => { // special type of action creater; returns a function ("thunk") instead of an object
  return async (dispatch) => { // inside the function (`dispatch` and `getState` as arguments), we can dispatch multiple actions
    dispatch(fetchUserRequest());
    try {
      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ id: userId, name: 'John Doe' }), 1000)
      );
      dispatch(fetchUserSuccess(response));
    } catch (error) {
      dispatch(fetchUserFailure('Failed to fetch user'));
    }
  };
};

// 4. Reducers
const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


// 5. Combine Reducers
const rootReducer = combineReducers({
  todos: todoReducer,
  user: userReducer,
});

// 6. Create Store with Thunk Middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

// 7. Subscribe to Store
const unsubscribe = store.subscribe(() => {
  console.log('Subscriber1: State updated:', store.getState().todos);
});

// can subscribe multiple times also
// const unsubscribe2 = store.subscribe(() => {
//   console.log('Subscriber2: State updated:', store.getState());
// });

// 8. Dispatch Actions
store.dispatch(addTodo({ id: 1, text: 'Learn Redux' }));
store.dispatch(addTodo({ id: 2, text: 'Build a project' }));
store.dispatch(removeTodo(1));

// Dispatch async action using Redux Thunk; 
// It even takes care to return the thunk’s return value
// from the dispatch, so I can chain Promises as long as I return them.

store.dispatch(fetchUser(101)).then(() => { // Fetch user with ID 101
  // 9. Unsubscribe the listener
  unsubscribe();
  console.log('Unsubscribed!')
});