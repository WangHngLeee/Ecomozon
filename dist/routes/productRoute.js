"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var category, searchKeyword, sortOrder, products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            category = req.query.category ? {
              category: req.query.category
            } : {};
            searchKeyword = req.query.searchKeyword ? {
              name: {
                $regex: req.query.searchKeyword,
                $options: 'i'
              }
            } : {};
            sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
              price: -1
            } : {
              price: 1
            } : {
              _id: -1
            };
            _context.next = 5;
            return _productModel["default"].find(_objectSpread(_objectSpread({}, category), searchKeyword)).sort(sortOrder);

          case 5:
            products = _context.sent;
            res.send(products);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var product, newProduct;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            product = new _productModel["default"]({
              name: req.body.name,
              image: req.body.image,
              price: req.body.price,
              brand: req.body.brand,
              description: req.body.description,
              countInStock: req.body.countInStock,
              numReviews: req.body.numReviews,
              category: req.body.category,
              rating: req.body.rating
            });
            _context2.next = 3;
            return product.save();

          case 3:
            newProduct = _context2.sent;

            if (!newProduct) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(201).send({
              message: "New product created",
              data: newProduct
            }));

          case 6:
            return _context2.abrupt("return", res.status(500).send({
              message: "Error in creating new product"
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.put("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var productId, product, updatedProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            productId = req.params.id;
            _context3.next = 3;
            return _productModel["default"].findById({
              _id: productId
            });

          case 3:
            product = _context3.sent;

            if (!product) {
              _context3.next = 17;
              break;
            }

            product.name = req.body.name;
            product.image = req.body.image;
            product.price = req.body.price;
            product.brand = req.body.brand;
            product.description = req.body.description;
            product.countInStock = req.body.countInStock;
            product.category = req.body.category;
            _context3.next = 14;
            return product.save();

          case 14:
            updatedProduct = _context3.sent;

            if (!updatedProduct) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", res.status(200).send({
              message: "Product updated",
              data: updatedProduct
            }));

          case 17:
            return _context3.abrupt("return", res.status(500).send({
              message: "Error in updating new product"
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]("/:id", _util.isAdmin, _util.isAuth, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var deletedProduct;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _productModel["default"].findById(req.params.id);

          case 2:
            deletedProduct = _context4.sent;

            if (!deletedProduct) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return deletedProduct.remove();

          case 6:
            res.send({
              message: "Product Deleted"
            });

          case 7:
            res.send("Error in deleting product");

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;