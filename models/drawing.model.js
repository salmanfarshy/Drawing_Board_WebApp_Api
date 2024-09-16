import mongoose from "mongoose";
const Schema = mongoose.Schema;

const drawingSchema = new Schema({
  title: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  elements: {
    lines: [
      {
        tool_type: String,
        start: { x: Number, y: Number },
        end: { x: Number, y: Number },
        control_point: { x: Number, y: Number },
        path: [{ x: Number, y: Number }],
        color: String,
        thickness: Number,
        dash_length: Number,
        gap_length: Number,
      },
    ],

    shapes: [
      {
        tool_type: String,
        position: { x: Number, y: Number },
        vertices: [{ x: Number, y: Number }],
        dimensions: {
          width: Number,
          height: Number,
          radius: Number,
        },
        color: String,
      },
    ],

    texts: [
      {
        tool_type: String,
        position: { x: Number, y: Number },
        content: String,
        font_size: Number,
        color: String,
      },
    ],
  },
});

export const Drawing = mongoose.model("Drawing", drawingSchema);
