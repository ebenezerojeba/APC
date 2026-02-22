import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    adminName: String,
    action: {
      type: String,
      required: true,
      enum: [
        "LOGIN",
        "LOGOUT",
        "VIEW_MEMBERS",
        "VIEW_MEMBER",
        "UPDATE_MEMBER_STATUS",
        "UPDATE_MEMBER_NOTES",
        "DELETE_MEMBER",
        "EXPORT_MEMBERS",
        "CREATE_ADMIN",
        "UPDATE_ADMIN",
        "DELETE_ADMIN",
      ],
    },
    resourceType: { type: String, default: null },
    resourceId: { type: mongoose.Schema.Types.ObjectId, default: null },
    details: { type: Object, default: null },
    ipAddress: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

activityLogSchema.index({ admin: 1, createdAt: -1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ createdAt: -1 });

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
