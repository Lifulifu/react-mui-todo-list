# Todo List
Live demo: https://lifu-todo-list.netlify.app/

Simple todo list with the following features:
- Add tasks with a short description
- Show a list of all tasks (completed/uncompleted)
- Can set a task as completed or uncompleted
- Can delete a task
- Can update the task description (Click on a todo item's text)
- Can sort tasks by time the tasks are created
- Can filter or search tasks
- Responsive UI

## How to run
### Start dev server
```
yarn start
```
### Deploy
```
yarn build
```
and serve the static files in `./build`
### Test
```
yarn test
```

## Implementation
### Tech Stack
- typescript
- react (create-react-app)
- material UI
- react-testing-library

### Code Structure
Components overview:
```html
<App>
  <TodoList>
    <AddNewTodoItem/>
    <TodoItem/>
    <TodoItem/>
    ...
  </TodoList>
  <Footer/>
</App>
```
- The `<TodoList>` component owns a reactive state variable `todoItems` that controls the states of all `<TodoItem>`s ('completed' state, description), and each `<TodoItem>` can change its state by calling the `onStatusChange`, `onTextChange` and `onDelete` callbacks (One-way data flow).
- All completed and uncompleted items are in a single array, they are sorted so that all uncompleted items are on top of completed ones, a `<Divider/>` is conditionally rendered to seperate the 2 groups visually.

### Testing
Testings are in the `src/testing/` folder.
- `ut.test.tsx` tests `<TodoItem/>` and `<AddNewTodoItem/>` functions correctly.
- `ut.test.tsx` tests the main features of `<TodoList/>`, including:
  - Add todo item
  - Remove todo item
  - Sorting of todo items
