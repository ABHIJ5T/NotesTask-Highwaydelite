import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';

dotenv.config();
const app = express();
// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors()); // to accept request from other sites
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) { console.error("FATAL ERROR: MONGO_URI is not defined."); process.exit(1); }

mongoose.connect(mongoUri).then(() => console.log('? MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.get('/api/health', (_req, res) => res.json({ ok: true, message: 'Server is healthy' }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`?? Server listening on http://localhost:${port}`));
