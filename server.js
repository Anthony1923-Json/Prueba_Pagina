const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

// ─── CONFIGURA AQUÍ TU BASE DE DATOS ───────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
// ───────────────────────────────────────────────────────────────────────────

// ── GET todos los jugadores ──────────────────────────────────────────────────
app.get('/api/jugadores', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT j.*, a.nombre AS nombre_agencia
      FROM jugadores_new j
      LEFT JOIN agencias_new a ON j.agenciaid = a.agenciaid
      ORDER BY j.idjugador
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET todas las agencias (para el select del formulario) ───────────────────
app.get('/api/agencias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agencias_new ORDER BY agenciaid');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET un jugador por ID ────────────────────────────────────────────────────
app.get('/api/jugadores/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jugadores_new WHERE idjugador = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST crear jugador ───────────────────────────────────────────────────────
app.post('/api/jugadores', async (req, res) => {
  const {
    nombre, apellidos, fecha_nacimiento, edad,
    posiciondetallada, rol, clubactual, anos_contrato,
    dorsal, pierna_habil, estadisticas, trayectoria,
    agenciaid, contrato_agencia
  } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO jugadores_new
        (nombre, apellidos, fecha_nacimiento, edad, posiciondetallada, rol,
        clubactual, anos_contrato, dorsal, pierna_habil, estadisticas,
        trayectoria, agenciaid, contrato_agencia)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *
    `, [nombre, apellidos, fecha_nacimiento, edad, posiciondetallada, rol,
        clubactual, anos_contrato, dorsal, pierna_habil, estadisticas,
        trayectoria, agenciaid, contrato_agencia || null]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT editar jugador ───────────────────────────────────────────────────────
app.put('/api/jugadores/:id', async (req, res) => {
  const {
    nombre, apellidos, fecha_nacimiento, edad,
    posiciondetallada, rol, clubactual, anos_contrato,
    dorsal, pierna_habil, estadisticas, trayectoria,
    agenciaid, contrato_agencia
  } = req.body;
  try {
    const result = await pool.query(`
      UPDATE jugadores_new SET
        nombre=$1, apellidos=$2, fecha_nacimiento=$3, edad=$4,
        posiciondetallada=$5, rol=$6, clubactual=$7, anos_contrato=$8,
        dorsal=$9, pierna_habil=$10, estadisticas=$11, trayectoria=$12,
        agenciaid=$13, contrato_agencia=$14
      WHERE idjugador=$15
      RETURNING *
    `, [nombre, apellidos, fecha_nacimiento, edad, posiciondetallada, rol,
        clubactual, anos_contrato, dorsal, pierna_habil, estadisticas,
        trayectoria, agenciaid, contrato_agencia || null, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE jugador ───────────────────────────────────────────────────────────
app.delete('/api/jugadores/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM jugadores_new WHERE idjugador = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
