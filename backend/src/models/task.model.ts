import { Schema, model, models, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  isDone: boolean;
  user: Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Task = models.Task || model<ITask>('Task', taskSchema);

export default Task;
