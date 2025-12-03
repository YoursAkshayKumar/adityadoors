// external
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middleware/global-error-handler");
// internal
const ConnectDb = require("./config/db");
const { secret } = require("./config/secret");
const categoryRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productRoute");
const couponRoutes = require("./routes/couponRoute");
const userRoute = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const userOrderRoute = require("./routes/userOrderRoute");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const brandRoutes = require("./routes/brandRoutes");
const blogRoutes = require("./routes/blogRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const faqRoutes = require("./routes/faqRoutes");
const measurementRoutes = require("./routes/measurementRoutes");
const contactRoutes = require("./routes/contactRoutes");

// app init
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// run db
ConnectDb();

// routes
app.use("/api/products", productsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/user', userRoute);
app.use('/api/order', orderRouter);
app.use('/api/user-order', userOrderRoute);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/measurements", measurementRoutes);
app.use("/api/contacts", contactRoutes);

// root route
app.get("/", (req, res) => res.send("Apps worked successfully"));

const PORT = secret.port || 5000;

// global error handler
app.use(globalErrorHandler);
//* handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// Export for Vercel serverless functions
// Vercel will use this as the serverless function handler
module.exports = app;

// Only listen when running locally (not in Vercel serverless environment)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}
