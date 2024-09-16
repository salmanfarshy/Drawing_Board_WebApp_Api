import { Drawing } from "../models/drawing.model.js";

export const createDrawing = async (req, res) => {
  try {
    const { elements, title } = req.body;

    const newElements = {
      lines: elements[0].lines,
      shapes: elements[1].shapes,
      texts: elements[2].texts,
    };

    const newDrawing = await Drawing.create({
      title,
      updated_at: new Date(),
      elements: newElements,
    });
    return res.send(newDrawing._id);
  } catch (err) {
    return res.send(false);
  }
};

export const getAllDrawings = async (req, res) => {
  try {
    const Drawings = await Drawing.find({});
    const allDrawings = [];

    Drawings.map((drawing) => {
      // covering all data in a format of single draw
      const newDrawings = {
        id: drawing?._id,
        title: drawing?.title,
        created_at: drawing?.created_at,
        updated_at: drawing?.updated_at,
        elements: [
          { lines: drawing?.elements?.lines },
          { shapes: drawing?.elements?.shapes },
          { texts: drawing?.elements?.texts },
        ],
      };
      allDrawings.push(newDrawings);
    });
    // console.log(allDrawings[0].elements);
    return res.send(allDrawings);
  } catch (err) {
    return res.send(false);
  }
};

export const getDrawing = async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.body.id);
    return res.send(drawing);
  } catch (err) {
    return res.send(false);
  }
};

export const updateDrawing = async (req, res) => {
  try {
    const { elements, title, id } = req.body;

    const newElements = {
      lines: elements[0].lines,
      shapes: elements[1].shapes,
      texts: elements[2].texts,
    };
    const updateDrawing = await Drawing.findByIdAndUpdate(
      id,
      { title, updated_at: new Date(), elements: newElements },
      { new: true }
    );

    console.log(updateDrawing);
    return res.send(id);
  } catch (err) {
    return res.send(false);
  }
};

export const deleteDrawing = async (req, res) => {
  try {
    await Drawing.findByIdAndDelete(req.body?.id);
    return res.send(true);
  } catch (err) {
    return res.send(false);
  }
};
