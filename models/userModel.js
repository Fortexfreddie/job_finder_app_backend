// Import mongoose for MongoDB object modeling
import mongoose from 'mongoose';

// Import bcryptjs for hashing passwords
import bcrypt from 'bcryptjs';

// Define schema (structure) for User collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },                // User's full name
  email: { type: String, required: true, unique: true }, // Unique email
  phonenumber: { type: String, required: true },         // Phone number
  password: { type: String, required: true }             // Hashed password
});

// Pre-save hook: runs before saving user to DB
userSchema.pre('save', async function (next) {
  // If password field wasn’t modified, skip hashing
  if (!this.isModified('password')) return next();

  // Hash the password with salt rounds = 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Custom method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export model to use in controllers (ESM syntax)
const User = mongoose.model('User', userSchema);
export default User;
