const asyncHandler = require("express-async-handler");
const Brand = require("../model/brand");
const Product = require("../model/product");

// @desc    Get all brands
// @route   GET /api/brands/
// @access  Public (any one can hit this route)
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.json(brands,);
});
  
// @desc    Fetch brand by ID
// @route   GET /api/brands/:id
// @access  Private/Admin
const getBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404);
      throw new Error("Brand not found");
    }
  });

// @desc    Create a brand
// @route   POST /api/brands/
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
    const { name, image, description } =
      req.body;
    const brand = new Brand({
      name,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
      description,
    });
    const createdBrand = await brand.save();
    res.status(201).json(createdBrand);
});

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updatedBrand = asyncHandler(async (req, res) => {
    const { name, image, description } =
      req.body;
  
    const brand = await Brand.findById(req.params.id);
  
    if (brand) {
      if(brand.name !== name) {
        let queryObject= {brand: brand.name};
        let newName = {$set: {brand: name} };
        await Product.updateMany(queryObject, newName);
      }

      brand.name = name;
      brand.image.public_id = image.public_id;
      brand.image.url = image.url;
      brand.description = description;
  
      const updatedBrand = await brand.save();
      res.json(updatedBrand);
    } else {
      res.status(404);
      throw new Error("Brand not found");
    }
});

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Prive/admin
const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    
    if (brand && (brand.products.length === 0)) {
      await brand.remove();
      res.json({ message: "Brand Remove!" });
    } else {
      res.status(404);
      throw new Error("Brand not found");
    }
});

const controller = {
    getBrands,
    getBrandById,
    createBrand,
    updatedBrand,
    deleteBrand,
};
  
module.exports = controller;
