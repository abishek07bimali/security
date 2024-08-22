const ActivityLog = require('../model/activityLog');
const User = require("../model/user_model");


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

const getAllUserLogsByAdmin=async(req,res)=>{
  try {
    const activityLogs = await ActivityLog.find()
      .populate('user', '-password') 
      .sort({ timestamp: -1 }); 

    res.status(200).json({
      success: true,
      activityLogs,
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
module.exports = {logActivity,getAllUserLogsByAdmin};
