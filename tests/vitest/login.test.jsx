import '@testing-library/jest-dom/vitest';
import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Login } from '../../src/pages/Login.jsx';
import { MemoryRouter } from 'react-router';

test('正しくレンダリングされているか' ,() => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(screen.getByText('メールアドレス')).toBeInTheDocument();
  expect(screen.getByText('パスワード')).toBeInTheDocument();
  expect(screen.getByRole('textbox', )).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});