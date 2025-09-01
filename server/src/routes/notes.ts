import { Router } from 'express';
import auth, { AuthedRequest } from '../middlewares/auth';
import Note from '../models/Note';
const router = Router();
router.get('/', auth, async (req: AuthedRequest, res) => 
    { const notes = await Note.find({ userId: req.user!.userId }).sort({ createdAt: -1 }); res.json(notes); });
router.post('/', auth, async (req: AuthedRequest, res) => 
    { const { title, body } = req.body; if (!title) return res.status(400).json({ message: 'Title is required' });
     const note = await Note.create({ userId: req.user!.userId, title, body }); res.status(201).json(note); });
router.delete('/:id', auth, async (req: AuthedRequest, res) => 
    { const { id } = req.params; 
     const note = await Note.findOneAndDelete({ _id: id, userId: req.user!.userId }); 
     if (!note) return res.status(404).json({ message: 'Note not found' }); 
     res.json({ ok: true }); });
export default router;
