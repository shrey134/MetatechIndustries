import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['inquiry', 'brochure', 'rfq'], default: 'inquiry' },
    fullName: { type: String }, // Required for inquiry, optional for brochure
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    category: { type: String }, // Required for inquiry
    productInterest: { type: String }, // Captured for both (e.g., brochure context)
    message: { type: String },
    status: { type: String, default: 'new' }, // e.g. new, viewed, responded
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
