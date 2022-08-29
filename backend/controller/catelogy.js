const asyncHandler = require("express-async-handler");
const Catelogy = require("../model/catelogy");


// @desc    Get all catelogies
// @route   GET /api/catelogies/
// @access  Public (any one can hit this route)
const getCatelogies = asyncHandler(async (req, res) => {
    const catelogies = await Catelogy.find({});
    res.json(catelogies);
});

// @desc    Fetch catelogy by ID
// @route   GET /api/catelogies/:id
// @access  Private/Admin
const getCatelogyById = asyncHandler(async (req, res) => {
    const catelogy = await Catelogy.findById(req.params.id);
    if (catelogy) {
      res.json(catelogy);
    } else {
      res.status(404);
      throw new Error("Catelogy not found");
    }
  });

// @desc    Create a catelogy
// @route   POST /api/catelogies/
// @access  Private/Seller and Admin
const createCatelogy = asyncHandler(async (req, res) => {
    const { name, image, description } =
      req.body;
  
    const catelogy = new Catelogy({
      name,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
      description,
    });
    const createdCatelogy = await catelogy.save();
    res.status(201).json(createdCatelogy);
});

// @desc    Update a catelogy
// @route   PUT /api/catelogies/:id
// @access  Private/ Seller and Admin
const updatedCatelogy = asyncHandler(async (req, res) => {
    const { name, image, description } =
      req.body;
  
    const catelogy = await Catelogy.findById(req.params.id);
  
    if (catelogy) {
      catelogy.name = name;
      catelogy.image.public_id = image.public_id;
      catelogy.image.url = image.url;
      catelogy.description = description;
  
      const updatedCatelogy = await catelogy.save();
      res.json(updatedCatelogy);
    } else {
      res.status(404);
      throw new Error("Catelogy not found");
    }
});

// @desc    Delete a catelogy
// @route   DELETE /api/catelogies/:id
// @access  Prive/Admin
const deleteCatelogy = asyncHandler(async (req, res) => {
    const catelogy = await Catelogy.findById(req.params.id);
  
    if (catelogy && (catelogy.products.length === 0)) {
      await catelogy.remove();
      res.json({ message: "Catelogy Remove!" });
    } else {
      res.status(404);
      throw new Error("Catelogy not found");
    }
});

const controller = {
    getCatelogies,
    getCatelogyById,
    createCatelogy,
    updatedCatelogy,
    deleteCatelogy,
};
  
module.exports = controller;
