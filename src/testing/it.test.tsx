import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoList from '../TodoList';

describe('TodoList main functions', () => {

  const addTodoItem = (textValue: string) => {
    const textField = screen.getByPlaceholderText('Add new todo ...');
    fireEvent.change(textField, { target: { value: textValue } });
    const addButton = screen.getByTestId('add-todo-button');
    fireEvent.click(addButton);
  }

  test('TodoItem can be added', () => {
    render(
      <TodoList initialData={[]} />
    )
    const list = screen.getByRole('list');
    let items = screen.queryAllByTestId('todo-item')
    expect(items.length).toBe(0);

    // add 2 items
    addTodoItem("Standing here I realize");
    addTodoItem("You are just like me");
    items = screen.queryAllByTestId('todo-item')
    expect(items.length).toBe(2);
  })

  test('TodoItem can be removed', () => {
    render(
      <TodoList initialData={[]} />
    )
    // add 2 items
    addTodoItem("Standing here I realize");
    addTodoItem("You are just like me");
    let items = screen.queryAllByTestId('todo-item');
    // remove an item
    const removeBtn = within(items[0]).getByRole('button');
    fireEvent.click(removeBtn);
    items = screen.queryAllByTestId('todo-item');
    expect(items.length).toBe(1);
  })

  test('TodoItems are sorted by added time and done state', async () => {
    render(
      <TodoList initialData={[]} />
    )
    addTodoItem("first added");
    addTodoItem("Gonna make u cry");
    addTodoItem("last added");
    let items = screen.queryAllByTestId('todo-item');
    // last added item should be on top
    const firstItemTextbox = within(items[0]).getByRole('textbox');
    expect(firstItemTextbox).toHaveValue("last added");
    // check the top item
    const firstItemCheckbox = within(items[0]).getByRole('checkbox');
    fireEvent.click(firstItemCheckbox);
    // check top item is now sorted to the bottom
    items = screen.queryAllByTestId('todo-item');
    const lastItemTextbox = within(items[items.length - 1]).getByRole('textbox');
    expect(lastItemTextbox).toHaveValue('last added');
  })

});
