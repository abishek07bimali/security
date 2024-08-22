const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., 'login', 'signup', 'update', 'delete'
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
  additionalInfo: { type: mongoose.Schema.Types.Mixed }, // Store additional data if necessary
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
