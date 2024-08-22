const ActivityLog = require('../model/activityLog');

const logActivity = async (user, action, ipAddress, additionalInfo = {}) => {

  console.log(user)
  try {
    const activityLog = new ActivityLog({
      user: user._id,
      action,
      ipAddress,
      additionalInfo,
    });
    await activityLog.save();
    console.log(`Activity logged: ${action} by ${user.email}`);
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

module.exports = logActivity;
