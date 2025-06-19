import mongoose, { Document, Schema } from "mongoose";

// Interface for Todo document
export interface ITodo extends Document {
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for creating a new Todo (without MongoDB-specific fields)
export interface ITodoInput {
    title: string;
    completed?: boolean;
}

// Schema definition
const todoSchema = new Schema<ITodo>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [1, 'Title cannot be empty'],
        maxlength: [500, 'Title cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for better query performance
todoSchema.index({ createdAt: -1 });
todoSchema.index({ completed: 1 });

// Virtual for todo status text
todoSchema.virtual('status').get(function() {
    return this.completed ? 'completed' : 'pending';
});

// Pre-save middleware to ensure title is properly formatted
todoSchema.pre('save', function(next) {
    if (this.title) {
        this.title = this.title.trim();
    }
    next();
});

// Model creation with proper TypeScript typing
export const TodoModel = mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);