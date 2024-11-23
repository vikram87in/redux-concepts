# Redux Example

Here’s a simple example demonstrating how Redux works in a JavaScript file. This example assumes you already have the Redux package installed in your project. We'll create a Redux store, define some actions, and demonstrate how state is managed. You can run this script in a Node.js environment to see Redux in action!

# How to run:

Run command "node index.js" to execute the index.js file

## How it works:

1. **Initial State**: `initialTodoState` & `initialUserState` define the starting state of the application.
2. **Actions**: These are plain objects that describe "what happened" (e.g., `addTodo`, `removeTodo`, `fetchUser`).
3. **Reducer**: A function (`todoReducer`) that determines how the state should change in response to an action.
4. **Store**: The store manages the state of the application.
5. **Dispatch**: Dispatching actions updates the state through the reducer.
6. **Subscribe**: You can listen for state changes using `store.subscribe()`.

## Detailed Explanation of `store.subscribe`

### Listening for State Changes:

- When you dispatch an action (using `store.dispatch`), the reducer processes the action and updates the state.
- After the state is updated, all functions registered with `store.subscribe` are called.

### Why Use It?

- If your application relies on knowing when the state changes (e.g., to re-render parts of the UI), `store.subscribe` provides a way to react to those changes.
- In modern applications (e.g., with React), this behavior is often abstracted away by libraries like `react-redux`, which re-renders components automatically when the state changes.

### Behavior of `store.subscribe`:

- It doesn't receive the updated state directly as an argument. Instead, the listener function can call `store.getState()` to retrieve the latest state.