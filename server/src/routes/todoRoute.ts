import { Router, Request, Response } from "express";
import { TodoModel } from "../models/TodoModel";

const router = Router();

//POST /
router.post("/", async (req: Request, res: Response) => {
  try {
    const { body } = req;
    
    if (!body.title || body.title.trim() === "") {
      return res.status(400).json({ 
        success: false, 
        error: "Title is required and cannot be empty" 
      });
    }

    console.log({body})
    const newTodo = await TodoModel.create(body);
    return res.status(201).json({ success: true, data: newTodo });
  } catch (error: any) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Failed to create todo",
      message: error.message 
    });
  }
});

//GET /
router.get("/", async (req: Request, res: Response) => {
  try {
    const fetchedTodos = await TodoModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: fetchedTodos });
  } catch (error: any) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Failed to fetch todos",
      message: error.message 
    });
  }
});

//GET /:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const fetchedTodo = await TodoModel.findById(req.params.id);
    if (!fetchedTodo) {
      return res.status(404).json({ 
        success: false, 
        error: "Todo not found",
        message: `Todo with id ${req.params.id} does not exist`
      });
    }
    return res.status(200).json({ success: true, data: fetchedTodo });
  } catch (error: any) {
    console.error("Error fetching todo:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid todo ID format" 
      });
    }
    return res.status(500).json({ 
      success: false, 
      error: "Failed to fetch todo",
      message: error.message 
    });
  }
});

//PUT /:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ 
        success: false, 
        error: "Todo not found",
        message: `Todo with id ${req.params.id} does not exist`
      });
    }
    return res.status(200).json({ success: true, data: updatedTodo });
  } catch (error: any) {
    console.error("Error updating todo:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid todo ID format" 
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        error: "Validation error",
        message: error.message 
      });
    }
    return res.status(500).json({ 
      success: false, 
      error: "Failed to update todo",
      message: error.message 
    });
  }
});

// DELETE /:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ 
        success: false, 
        error: "Todo not found",
        message: `Todo with id ${req.params.id} does not exist`
      });
    }
    return res.status(200).json({ 
      success: true, 
      data: deletedTodo,
      message: "Todo deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting todo:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid todo ID format" 
      });
    }
    return res.status(500).json({ 
      success: false, 
      error: "Failed to delete todo",
      message: error.message 
    });
  }
});

export { router as todoRouter };
