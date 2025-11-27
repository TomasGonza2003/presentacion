// src/pages/Login.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { useAuth } from '../context/AuthContext';

// Mock del hook useAuth
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock del hook useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Componente Login', () => {
  let mockLogin;

  beforeEach(() => {
    // Reseteamos los mocks antes de cada prueba
    mockLogin = jest.fn();
    useAuth.mockReturnValue({
      login: mockLogin,
    });
    mockNavigate.mockClear();
    // NO usamos jest.useFakeTimers()
  });

  afterEach(() => {
    // NO necesitamos jest.runOnlyPendingTimers() ni jest.useRealTimers()
  });

  test('debe renderizar el formulario de login correctamente', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verificamos que los elementos principales estén en el documento
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes una cuenta?/i)).toBeInTheDocument();
  });

  test('debe llamar a login y navegar al perfil en un inicio de sesión exitoso', async () => {
    // Configuramos el mock para que devuelva éxito
    mockLogin.mockReturnValue({ success: true });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Llenamos el formulario
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'test@test.com');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'pass123');

    // Enviamos el formulario
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    // Verificamos que el botón cambie a "Ingresando..."
    expect(screen.getByRole('button', { name: /ingresando\.\.\./i })).toBeDisabled();

    // Verificamos que la función login fue llamada con los datos correctos
    expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'pass123');

    // Verificamos que aparezca el mensaje de éxito (usamos findByText para esperar)
    const successDiv = await screen.findByText(
      '¡Inicio de sesión exitoso! Redireccionando a tu perfil...'
    );
    expect(successDiv).toBeInTheDocument();
    expect(successDiv.className).toContain('alert-success');

    // Esperamos a que la navegación ocurra (después del setTimeout de 2 seg)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/perfil');
    }, { timeout: 3000 }); // Damos un margen de 3 seg
  });

  test('debe mostrar un mensaje de error con credenciales incorrectas', async () => {
    // Configuramos el mock para que devuelva error
    mockLogin.mockReturnValue({
      success: false,
      message: 'Correo o contraseña incorrectos.',
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Llenamos el formulario
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'test@test.com');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'pass-incorrecta');

    // Enviamos el formulario
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    // Verificamos que aparezca el mensaje de error (usamos findByText para esperar)
    const errorDiv = await screen.findByText('Correo o contraseña incorrectos.');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv.className).toContain('alert-danger');

    // Verificamos que el botón vuelva a estar habilitado
    expect(screen.getByRole('button', { name: /ingresar/i })).not.toBeDisabled();

    // Verificamos que NO se haya navegado
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});