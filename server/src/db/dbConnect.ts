import mongoose from "mongoose";

export async function dbConnect() {
    try {
        // Check if MONGODB_URI is provided
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("✅ Database connected successfully");
        console.log(`📊 Connected to: ${mongoose.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ Database connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  Database disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 Database reconnected');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('📴 Database connection closed due to app termination');
            process.exit(0);
        });
        
    } catch (error: any) {
        console.error(`❌ Database connection error: ${error.message}`);
        console.error('🔧 Please check your MongoDB connection string and ensure the database is running');
        
        // Exit process with failure code in production
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
}