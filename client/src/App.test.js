import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test('mock test', () => {
  render(<App />);
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  expect(mockCallback.mock.calls.length).toBe(2);
});
