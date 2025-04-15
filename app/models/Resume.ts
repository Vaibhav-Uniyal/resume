import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  originalResume: {
    type: String,
    required: true
  },
  optimizedResume: {
    type: String,
    required: true
  },
  atsScore: {
    type: Number,
    required: true
  },
  suggestions: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema); 