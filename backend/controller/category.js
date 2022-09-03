const asyncHandler = require("express-async-handler");
const Category = require("../model/category");


// @desc    Get all categories
// @route   GET /api/categories/
// @access  Public (any one can hit this route)
const getCategories = asyncHandler(async (req, res) => {
    const catetegories = await Category.find({});
    res.json(catetegories);
});

// @desc    Fetch category by ID
// @route   GET /api/catetegories/:id
// @access  Private/Admin
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  });

// @desc    Create a category
// @route   POST /api/catetegories/
// @access  Private/Seller and Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name, image, description } =
      req.body;
  
    const category = new Category({
      name,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
      description,
    });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
});

// @desc    Update a category
// @route   PUT /api/catetegories/:id
// @access  Private/ Seller and Admin
const updatedCategory = asyncHandler(async (req, res) => {
    const { name, image, description } =
      req.body;
  
    const category = await Category.findById(req.params.id);
  
    if (category) {
      category.name = name;
      category.image.public_id = image.public_id;
      category.image.url = image.url;
      category.description = description;
  
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
});

// @desc    Delete a category
// @route   DELETE /api/catetegories/:id
// @access  Prive/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
  
    if (category && (category.products.length === 0)) {
      await category.remove();
      res.json({ message: "Category Remove!" });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
});

const controller = {
    getCategories,
    getCategoryById,
    createCategory,
    updatedCategory,
    deleteCategory,
};
  
module.exports = controller;
