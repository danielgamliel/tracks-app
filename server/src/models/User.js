import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define a user schema with two fields: email and password 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// pre-save hook - runs before saving a user for increpting the password
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {return next()}
    // Generate salt with bcrypt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err); 
        // Hash the password using the generated salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err); 
            user.password = hash; // Replace the original password with the hashed password
            next(); 
        });
    });
});

// Add a method to the user schema to compare passwords
userSchema.methods.comparePassword = function(attemptPassword) {
    //we are using a function() syntex becouse we need to use 'this'
    return new Promise((resolve, reject) => { // need to generate new promise
        // Compare the given password with the hashed password
        bcrypt.compare(attemptPassword, this.password, (err, isMatch) => { 
            if (err) return reject(err); 
            if (!isMatch) return reject(false); 
            resolve(true); 
        });
    });
}

// Create a user model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
