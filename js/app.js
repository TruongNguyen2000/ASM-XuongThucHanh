var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Product = /** @class */ (function () {
    function Product(productId, name, price, image, description, images) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.images = images;
    }
    return Product;
}());
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.hotApiUrl = 'http://localhost:8080/api/products?size=12&page=1';
        this.newApiUrl = 'http://localhost:8080/api/products?size=6&page=2';
    }
    ProductService.prototype.fetchHotProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.hotApiUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.result.data.map(function (item) { return new Product(item.productId, item.name, item.price, item.image, item.description, item.images); })];
                }
            });
        });
    };
    ProductService.prototype.fetchNewProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.newApiUrl)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.result.data.map(function (item) { return new Product(item.productId, item.name, item.price, item.image, item.description, item.images); })];
                }
            });
        });
    };
    return ProductService;
}());
var ProductView = /** @class */ (function () {
    function ProductView() {
        this.hotProductGrid = document.getElementById('hot-product-grid');
        this.newProductGrid = document.getElementById('new-product-grid');
    }
    ProductView.prototype.displayProducts = function (products, grid) {
        grid.innerHTML = '';
        products.forEach(function (product) {
            var productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = "\n                <img alt=\"".concat(product.name, "\" src=\"").concat(product.image, "\" />\n                <p>").concat(product.name, "</p>\n                <p>").concat(product.price.toLocaleString(), "\u20AB</p>\n            ");
            grid.appendChild(productItem);
        });
    };
    return ProductView;
}());
function generateSlug(text) {
    var slug = text
        .normalize('NFD') // Chuyển đổi ký tự có dấu thành ký tự không dấu
        .replace(/[\u0300-\u036f]/g, '') // Xóa các ký tự dấu
        .toLowerCase() // Chuyển thành chữ thường
        .trim() // Xóa khoảng trắng ở đầu và cuối
        .replace(/[^a-z0-9\s-]/g, '') // Xóa ký tự không phải chữ cái, số, khoảng trắng hoặc dấu gạch ngang
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/-+/g, '-') // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
    ;
    return slug;
}
// Hàm để lấy danh sách các danh mục từ API
function fetchCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, categories, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:8080/api/categories?page=1')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.code === 1000) {
                        categories = data.result.data;
                        createCategoryButtons(categories);
                    }
                    else {
                        console.error('Lỗi khi lấy danh mục:', data.message);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Có lỗi xảy ra:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Hàm để tạo các nút cho các danh mục
function createCategoryButtons(categories) {
    var categoryButtonsDiv = document.getElementById('category-buttons');
    if (categoryButtonsDiv) {
        categories.forEach(function (category) {
            var button = document.createElement('button');
            button.innerText = category.name;
            button.onclick = function () {
                fetchProductsByCategory(category.slug);
            };
            categoryButtonsDiv.appendChild(button);
        });
    }
}
// Hàm để lấy sản phẩm theo danh mục
function fetchProductsByCategory(slug) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, category, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:8080/api/categories/".concat(slug))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.code === 1000) {
                        category = data.result[0];
                        if (category && category.subCategories) {
                            displaySubCategories(category.subCategories); // Hiển thị các danh mục con
                        }
                    }
                    else {
                        console.error('Lỗi khi lấy sản phẩm:', data.message);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Có lỗi xảy ra:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Hàm để hiển thị danh mục con và thêm sự kiện click
function displaySubCategories(subCategories) {
    var productDiv = document.getElementById('category-products');
    if (productDiv) {
        productDiv.innerHTML = ''; // Xóa nội dung cũ
        subCategories.forEach(function (subCategory) {
            var subCategoryCard = document.createElement('div');
            subCategoryCard.className = 'sub-category-card'; // Thêm class cho các danh mục con
            subCategoryCard.innerHTML = "\n            <h3>".concat(subCategory.name, "</h3>\n            <button onclick=\"fetchProductsBySubCategory('").concat(generateSlug(subCategory.name), "')\">Xem s\u1EA3n ph\u1EA9m</button>\n        ");
            console.log('Generated slug for subCategory:', generateSlug(subCategory.name));
            productDiv.appendChild(subCategoryCard);
        });
    }
}
function fetchProductsBySubCategory(slug) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Fetching products for slug:', slug);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:8080/api/products/".concat(slug))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.code === 1000) {
                        displayProducts(data.result);
                    }
                    else {
                        console.error('Lỗi khi lấy sản phẩm:', data.message);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Có lỗi xảy ra:', error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Hàm để hiển thị sản phẩm trong div
function displayProducts(products) {
    var productDetailsDiv = document.getElementById('product-details');
    if (productDetailsDiv) {
        productDetailsDiv.innerHTML = ''; // Xóa nội dung cũ
        products.forEach(function (product) {
            var productCard = document.createElement('div');
            productCard.className = 'product-card'; // Thêm class cho sản phẩm
            productCard.innerHTML = "\n                <img alt=\"".concat(product.name, "\" src=\"").concat(product.image, "\" />\n                <p>Gi\u00E1: ").concat(product.price, "</p>\n                <p>M\u00F4 t\u1EA3: ").concat(product.description || 'Không có mô tả', "</p>\n                <p>ID S\u1EA3n Ph\u1EA9m: ").concat(product.productId, "</p>\n            ");
            productDetailsDiv.appendChild(productCard);
        });
    }
}

// Đảm bảo rằng fetchProductsBySubCategory có thể được truy cập
window.fetchProductsBySubCategory = fetchProductsBySubCategory;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var productService, hotProducts, newProducts, productView;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productService = new ProductService();
                    return [4 /*yield*/, productService.fetchHotProducts()];
                case 1:
                    hotProducts = _a.sent();
                    return [4 /*yield*/, productService.fetchNewProducts()];
                case 2:
                    newProducts = _a.sent();
                    productView = new ProductView();
                    productView.displayProducts(hotProducts, productView['hotProductGrid']);
                    productView.displayProducts(newProducts, productView['newProductGrid']);
                    return [2 /*return*/];
            }
        });
    });
}
        // Gọi hàm init() và fetchCategories() khi trang được tải
        window.onload = function() {
            init();
            fetchCategories();
        };
