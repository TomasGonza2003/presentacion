import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders PC Builder brand name in the navbar', () => {
  render(
    <MemoryRouter> 
      <App />
    </MemoryRouter>);
  
  const linkElement = screen.getByRole('link', { name: /PC Builder/i });
  
  expect(linkElement).toBeInTheDocument();
});