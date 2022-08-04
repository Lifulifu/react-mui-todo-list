import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoItem from '../TodoItem';
import AddNewTodoItem from '../AddNewTodoItem';

describe('TodoItem', () => {

  test("todo item's text prop is set to input's value.", () => {
    const text = 'Never gonna give u up';
    render(<TodoItem
      id=''
      done={true}
      text={text}
      onDelete={jest.fn}
      onStatusChange={jest.fn}
      onTextChange={jest.fn}
    />)
    const textField = screen.getByRole('textbox');
    expect(textField).toHaveValue(text);
  })

  test("todo item's done state can change checkbox", () => {
    render(
      <TodoItem
        id=''
        done={true}
        text={''}
        onDelete={jest.fn}
        onStatusChange={jest.fn}
        onTextChange={jest.fn}
      />
    )
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  })

});

describe('AddNewTodoItem', () => {

  test("text will be cleared after 'add' button is pressed", () => {
    render(
      <AddNewTodoItem onFinish={jest.fn} />
    )

    const textField = screen.getByPlaceholderText('Add new todo ...');
    fireEvent.change(textField, { target: { value: 'asdf' } });
    expect(textField).toHaveValue('asdf');

    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);
    expect(textField).toHaveValue('');
  })

})
