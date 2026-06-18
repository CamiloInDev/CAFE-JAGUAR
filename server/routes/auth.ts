import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { dbService, hashPassword } from '../db';
import { env } from '../config/env';
import { authenticateToken, requireAdmin, AuthenticatedRequest } from '../middleware/auth';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

const COOKIE_OPTIONS: import('express').CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

router.post('/registro', authRateLimiter, (req, res) => {
  try {
    const { email, password, nombre, apellido, telefono } = req.body;
    if (!email || !password || !nombre || !apellido) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser diligenciados.' });
    }

    const existingUser = dbService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya se encuentra registrado.' });
    }

    const passHash = hashPassword(password);
    const user = dbService.createUser({
      email,
      password_hash: passHash,
      nombre,
      apellido,
      telefono,
      rol: 'cliente'
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.cookie('token', token, COOKIE_OPTIONS);

    return res.status(201).json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/login', authRateLimiter, (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Diligencie el correo y la contraseña.' });
    }

    const lockStatus = dbService.checkLoginAttempt(email);
    if (lockStatus.blocked) {
      console.log(`[SECURITY] Blocked login attempt for ${email} - locked for ${lockStatus.lockoutRemaining} more minutes`);
      return res.status(429).json({
        error: `Demasiados intentos fallidos. Cuenta bloqueada por ${lockStatus.lockoutRemaining} minutos.`
      });
    }

    const user = dbService.getUserByEmail(email);
    if (!user) {
      const remaining = dbService.recordFailedLogin(email);
      console.log(`[SECURITY] Failed login attempt for ${email} - ${remaining} attempts remaining`);
      return res.status(400).json({
        error: 'Credenciales inválidas. Verifique sus datos.',
        remainingAttempts: remaining
      });
    }

    const inputHash = hashPassword(password);
    if (user.password_hash !== inputHash) {
      const remaining = dbService.recordFailedLogin(email);
      console.log(`[SECURITY] Failed login for ${email} - ${remaining} attempts remaining`);
      return res.status(400).json({
        error: 'Credenciales inválidas. Verifique sus datos.',
        remainingAttempts: remaining
      });
    }

    dbService.clearLoginAttempts(email);
    console.log(`[SECURITY] Successful login for ${email}`);

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.cookie('token', token, COOKIE_OPTIONS);

    const { password_hash, ...safeUser } = user;
    return res.json({ user: safeUser });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Sesión cerrada exitosamente.' });
});

router.get('/me', authenticateToken, (req: AuthenticatedRequest, res) => {
  try {
    const safeUser = dbService.getUserById(req.user!.id);
    if (!safeUser) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    return res.json({ user: safeUser });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.put('/perfil', authenticateToken, (req: AuthenticatedRequest, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Nombre y apellido son requeridos.' });
    }
    const updated = dbService.updateUserProfile(req.user!.id, { nombre, apellido, telefono });
    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    return res.json({ user: updated });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/recuperar', authRateLimiter, (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Ingrese un correo electrónico.' });
  }
  const user = dbService.getUserByEmail(email);
  if (!user) {
    // Avoid user enumeration
    return res.json({ success: true, message: 'Si el correo existe, recibirá instrucciones para restablecer su clave.' });
  }
  console.log(`[PASS_RESET] Mock password recovery link sent for ${email}. Reset code: RST-${Date.now()}`);
  return res.json({
    success: true,
    message: 'Correo enviado. (Consulte los logs de la consola o use clave de prueba; este paso se ha simulado exitosamente en este ambiente).'
  });
});

export default router;
