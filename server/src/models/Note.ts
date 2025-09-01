import mongoose, { Schema, Document } from 'mongoose';
export interface INote extends Document { userId: mongoose.Schema.Types.ObjectId; title: string; body: string; }
const NoteSchema = new Schema<INote>({ 
    userId: { type: Schema.Types.ObjectId, 
              ref: 'User', required: true }, 
              title: {   type: String, required: true }, 
              body: { type: String, default: '' } }, 
              { timestamps: true });
export default mongoose.model<INote>('Note', NoteSchema);
