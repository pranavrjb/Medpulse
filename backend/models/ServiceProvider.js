const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    serviceCategory: {
      type: String,
      required: true,
      enum: ["Medical Services", "Fitness & Wellness", "Beauty Services", "Consulting Services"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
serviceProviderSchema.index({ email: 1 });
serviceProviderSchema.index({ serviceCategory: 1 });
serviceProviderSchema.index({ status: 1 });

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

module.exports = ServiceProvider;
