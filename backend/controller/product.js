const asyncHandler = require("express-async-handler");
const Product = require("../model/product");
const Brand = require("../model/brand");
const Category = require("../model/category");


const getProductsForSeller = asyncHandler(async (req, res) => {
  const user = req.user;
  const products = await Product.find({ seller: user.id });
  if (products) {
    res.json(products);
  } else {
    res.status(400);
    throw new Error("Cant get product lists");
  }
});

// @desc    Fetch all products (according to pagination and sorting)
// @route   GET /api/products
// @access  Public (any one can hit this route)
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  let pageProducts = products;
  if (products) {
    if (req.query.search !== "") {
      pageProducts = await Product.find({
        $name: { $search: `${req.query.search}` },
      });
    }
    if (
      req.query.categoryFilter !== "" &&
      req.query.colorFilter !== "" &&
      req.query.priceFilter !== ""
    ) {
      products = fil
      pageProducts = filterProducts(
        products,
        "category",
        req.query.categoryFilter
      )
        .concat(filterProducts(products, "color", req.query.colorFilter))
        .concat(filterPrice(products, req.query.priceFilter));
    } else if (
      req.query.categoryFilter !== "" &&
      req.query.colorFilter !== "" &&
      req.query.priceFilter === ""
    ) {
      pageProducts = filterProducts(
        products,
        "category",
        req.query.categoryFilter
      ).concat(filterProducts(products, "color", req.query.colorFilter));
    } else if (
      req.query.categoryFilter !== "" &&
      req.query.colorFilter === "" &&
      req.query.priceFilter !== ""
    ) {
      pageProducts = filterProducts(
        products,
        "category",
        req.query.categoryFilter
      ).concat(filterPrice(products, req.query.priceFilter));
    } else if (
      req.query.categoryFilter !== "" &&
      req.query.colorFilter === "" &&
      req.query.priceFilter === ""
    ) {
      pageProducts = filterProducts(
        products,
        "category",
        req.query.categoryFilter
      );
    } else if (
      req.query.categoryFilter === "" &&
      req.query.colorFilter !== "" &&
      req.query.priceFilter !== ""
    ) {
      pageProducts = filterProducts(
        products,
        "color",
        req.query.colorFilter
      ).concat(filterPrice(products, req.query.priceFilter));
    } else if (
      req.query.categoryFilter === "" &&
      req.query.colorFilter !== "" &&
      req.query.priceFilter === ""
    ) {
      pageProducts = filterProducts(products, "color", req.query.colorFilter);
    } else if (
      req.query.categoryFilter === "" &&
      req.query.colorFilter === "" &&
      req.query.priceFilter !== ""
    ) {
      pageProducts = filterPrice(products, req.query.priceFilter);
    } else {
      pageProducts = products;
    }

    if (req.query.sortBy != "") {
      pageProducts = sortProducts(pageProducts, req.query.sortBy);
    }

    if (req.query.pageNum != "") {
      pageProducts = pageProducts.slice(
        (req.query.pageNum - 1) * 16,
        req.query.pageNum * 16
      );
    }

    res.json({
      pageProducts,
      pageCount: Math.ceil(products.length / 16),
      tankTopCount: count(products, "category", "Tank Top"),
      shirtsCount: count(products, "category", "Shirts"),
      polosCount: count(products, "category", "Polos"),
      tshirtsCount: count(products, "category", "T-Shirts"),
      shortsCount: count(products, "category", "Shorts"),
      jeansCount: count(products, "category", "Jeans"),
      kakiCount: count(products, "category", "Kaki"),
      sportsCount: count(products, "category", "Sport"),
      blackCount: count(products, "color", "Black"),
      blueCount: count(products, "color", "Blue"),
      redCount: count(products, "color", "Red"),
      greenCount: count(products, "color", "Green"),
      brownCount: count(products, "color", "Brown"),
      hundreadCount: priceCount(products, "0", "999"),
      okCount: priceCount(products, "1000", "2499"),
      tkCount: priceCount(products, "2500", "4499"),
      thkCount: priceCount(products, "4500", "6499"),
      fkCount: priceCount(products, "6500", "9999"),
      fikCount: priceCount(products, "10000", "-1"),
    });
  } else {
    throw new Error("Products not found");
  }
});

// @desc    Fetch trending products
// @route   GET /api/products/trending
// @access  Public (any one can hit this route)
const getTrendingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 });

  if (products.length > 0) {
    res.json(products.slice(0, 8));
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

// @desc    Fetch top seller products
// @route   GET /api/products/top
// @access  Public (any one can hit this route)
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 });

  if (products.length > 0) {
    res.json(products.slice(0, 4));
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

// @desc    Fetch product by ID
// @route   GET /api/products/:id
// @access  Public (any one can hit this route)
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Sorting Products
function sortProducts(products, sortType) {
  if (sortType === "new") {
    return products.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortType === "old") {
    return products.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return 1;
      } else if (a.createdAt < b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortType === "popular") {
    return products.sort(function (a, b) {
      if (a.rating > b.rating) {
        return -1;
      } else if (a.rating < b.rating) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortType === "low") {
    return products.sort(function (a, b) {
      if (a.price > b.price) {
        return 1;
      } else if (a.price < b.price) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortType === "high") {
    return products.sort(function (a, b) {
      if (a.price > b.price) {
        return -1;
      } else if (a.price < b.price) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return products;
  }
}

function filterProducts(products, filterType, filter) {
  let pageProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i][`${filterType}`] === filter) {
      pageProducts.push(products[i]);
    }
  }
  return pageProducts;
}

function filterPrice(products, range) {
  let pageProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (range === "price1") {
      if (products[i].price >= 0 && products[i].price <= 999) {
        pageProducts.push(products[i]);
      }
    } else if (range === "price2") {
      if (products[i].price >= 1000 && products[i].price <= 2499) {
        pageProducts.push(products[i]);
      }
    } else if (range === "price3") {
      if (products[i].price >= 2500 && products[i].price <= 4999) {
        pageProducts.push(products[i]);
      }
    } else if (range === "price4") {
      if (products[i].price >= 5000 && products[i].price <= 7999) {
        pageProducts.push(products[i]);
      }
    } else if (range === "price5") {
      if (products[i].price >= 8000 && products[i].price <= 9999) {
        pageProducts.push(products[i]);
      }
    } else {
      if (products[i].price >= 10000) {
        pageProducts.push(products[i]);
      }
    }
  }
  return pageProducts;
}

function count(products, type, value) {
  let count = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i][`${type}`] === value) {
      count++;
    }
  }
  return count;
}

function priceCount(products, min, max) {
  let count = 0;
  for (let i = 0; i < products.length; i++) {
    if (
      parseInt(products[i].price) >= parseInt(min) &&
      parseInt(products[i].price) <= parseInt(max)
    ) {
      count++;
    }
  }
  return count;
}

// @desc    Create new review
// @route   POST /api/products/:id/review
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Prive/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const brand = product.brand;
  const category = product.category;
  if (product) {
    const newBrand = await Brand.findOne({"name" : brand});
    const newProducts =  newBrand.products.filter((x) => x._id != req.params.id);
    newBrand.products = newProducts;
    await newBrand.save();
    
    const newCategory = await Category.findOne({"name" : category});
    const newProducts1 =  newCategory.products.filter((x) => x._id != req.params.id);
    newCategory.products = newProducts1;
    await newCategory.save();

    await product.remove();
    res.json({ message: "Product Remove!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatedProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category } =
    req.body;
  const product = await Product.findById(req.params.id);
  const temp  = product.brand;
  const temp2 = product.category;
  if (product) {
    if (product.brand !== brand) {
      const oldBrand = await Brand.findOne({"name" :temp});
      const newProducts =  oldBrand.products.filter((x) => x._id != req.params.id);
      oldBrand.products = newProducts;
      await oldBrand.save();

      const newBrand = await Brand.findOne({ "name" :brand });
      newBrand.products.push(product._id);
      await newBrand.save();
    }

    if (product.category !== category) {
      const oldCategory = await Category.findOne({"name" :temp2});
      const newProducts1 =  oldCategory.products.filter((x) => x._id != req.params.id);
      oldCategory.products = newProducts1;
      await oldCategory.save();

      const newCategory = await Category.findOne({ "name" :category });
      newCategory.products.push(product._id);
      await newCategory.save();
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image
    // product.image.public_id = image.public_id;
    // product.image.url = image.url;
    product.brand = brand;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category } =
    req.body;
  const product = new Product({
    name,
    price,
    seller: req.user._id,
    image: image,
    // image: {
    //   public_id: image.public_id,
    //   url: image.url,
    // },
    brand,
    category,
    description,
  });

  const tempBrand = await Brand.findOne({ "name" : brand });
  tempBrand.products.push(product._id);
  await tempBrand.save();

  const tempCategory = await Category.findOne({ "name" : category });
  tempCategory.products.push(product._id);
  await tempCategory.save();

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const controller = {
  getTrendingProducts,
  getTopProducts,
  getProductById,
  getProducts,
  createProductReview,
  deleteProduct,
  updatedProduct,
  createProduct,
  getProductsForSeller,
};

module.exports = controller;
