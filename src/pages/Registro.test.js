// src/pages/Registro.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Registro from './Registro';
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

describe('Componente Registro', () => {
  let mockRegister;

  beforeEach(() => {
    // Reseteamos los mocks antes de cada prueba
    mockRegister = jest.fn();
    useAuth.mockReturnValue({
      register: mockRegister,
    });
    mockNavigate.mockClear();
    // NO usamos jest.useFakeTimers()
  });

  afterEach(() => {
    // NO necesitamos jest.runOnlyPendingTimers() ni jest.useRealTimers()
  });

  test('debe renderizar el formulario de registro correctamente', () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Verificamos que los elementos principales estén en el documento
    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
    expect(screen.getByText(/¿ya tienes una cuenta?/i)).toBeInTheDocument();
  });

  test('debe mostrar un error si las contraseñas no coinciden', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Llenamos el formulario
    await userEvent.type(screen.getByLabelText(/nombre de usuario/i), 'UsuarioTest');
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'test@test.com');
    await userEvent.type(screen.getByLabelText(/^contraseña$/i), 'pass123');
    await userEvent.type(screen.getByLabelText(/confirmar contraseña/i), 'pass456');

    // Enviamos el formulario
    await userEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    // Verificamos que aparezca el error (usamos findByText)
    const errorDiv = await screen.findByText('Las contraseñas no coinciden.');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv.className).toContain('alert-danger');

    // Verificamos que la función de registro NO haya sido llamada
    expect(mockRegister).not.toHaveBeenCalled();
  });

  test('debe llamar a register y navegar al login en un registro exitoso', async () => {
    // Configuramos el mock para que devuelva éxito
    mockRegister.mockReturnValue({ success: true });

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Llenamos el formulario
    await userEvent.type(screen.getByLabelText(/nombre de usuario/i), 'UsuarioTest');
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'test@test.com');
    await userEvent.type(screen.getByLabelText(/^contraseña$/i), 'pass123');
    await userEvent.type(screen.getByLabelText(/confirmar contraseña/i), 'pass123');

    // Enviamos el formulario
    await userEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    // Verificamos que el botón cambie a "Registrando..."
    expect(screen.getByRole('button', { name: /registrando\.\.\./i })).toBeDisabled();

    // Verificamos que la función register fue llamada con los datos correctos
    expect(mockRegister).toHaveBeenCalledWith('UsuarioTest', 'test@test.com', 'pass123');

    // Verificamos que aparezca el mensaje de éxito (usamos findByText)
    const successDiv = await screen.findByText('¡Registro exitoso! Redireccionando...');
    expect(successDiv).toBeInTheDocument();
    expect(successDiv.className).toContain('alert-success');

    // Esperamos a que la navegación ocurra (después del setTimeout de 2 seg)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }, { timeout: 3000 }); // Damos un margen de 3 seg
  });

  test('debe mostrar un mensaje de error si el correo ya existe (registro fallido)', async () => {
    // Configuramos el mock para que devuelva error
    mockRegister.mockReturnValue({
      success: false,
      message: 'Ese correo ya está registrado.',
    });

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Llenamos el formulario
    await userEvent.type(screen.getByLabelText(/nombre de usuario/i), 'UsuarioTest');
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'correo@existente.com');
    await userEvent.type(screen.getByLabelText(/^contraseña$/i), 'pass123');
    await userEvent.type(screen.getByLabelText(/confirmar contraseña/i), 'pass123');

    // Enviamos el formulario
    await userEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    // Verificamos que aparezca el mensaje de error (usamos findByText)
    const errorDiv = await screen.findByText('Ese correo ya está registrado.');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv.className).toContain('alert-danger');
    
    // Verificamos que el botón vuelva a estar habilitado
    expect(screen.getByRole('button', { name: /registrarse/i })).not.toBeDisabled();

    // Verificamos que NO se haya navegado
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});