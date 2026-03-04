import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { MemoryRouter } from 'react-router';

jest.mock('./components/Header', () => () => <div data-testid="header">Header Content</div>);
jest.mock('./components/Navbar', () => () => <div data-testid="navbar">Navbar Content</div>);

describe('App Component', () => {
  it('renders Header and Outlet on all routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders h1 "Kihoot" and Navbar only on home route (/)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Kihoot')).toBeInTheDocument();

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('does not render h1 "Kihoot" and Navbar on non-home routes', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText('Kihoot')).not.toBeInTheDocument();

    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
  });

  it('does not render h1 "Kihoot" and Navbar on home with query params', () => {
    render(
      <MemoryRouter initialEntries={['/?query=test']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Kihoot')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});