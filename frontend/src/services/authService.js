// src/services/authService.js

const API_URL = 'http://localhost:3000'; // Sua URL do backend

class AuthService {
  // Faz login e salva o token
  async login(email, senha) {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Credenciais inválidas');
      }

      const data = await response.json();
      
      // Salva o token no localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        
        // Salva dados do usuário se vier na resposta
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Faz logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // Pega o token atual
  getToken() {
    return localStorage.getItem('token');
  }

  // Verifica se está autenticado
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    // Verifica se o token expirou
    try {
      const payload = this.decodeToken(token);
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch (error) {
      return false;
    }
  }

  // Decodifica o token JWT (sem validar a assinatura)
  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Pega dados do usuário
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();