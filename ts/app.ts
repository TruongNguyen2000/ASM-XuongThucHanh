class Product {
    constructor(
        public productId: number,
        public name: string,
        public price: number,
        public image: string,
        public description: string,
        public images: Array<{ imageId: number; imageUrl: string }>
    ) {}
}

class ProductService {
    private hotApiUrl: string = 'http://localhost:8080/api/products?size=12&page=1';
    private newApiUrl: string = 'http://localhost:8080/api/products?size=6&page=2';

    async fetchHotProducts(): Promise<Product[]> {
        const response = await fetch(this.hotApiUrl);
        const data = await response.json();
        return data.result.data.map((item: any) => new Product(
            item.productId,
            item.name,
            item.price,
            item.image,
            item.description,
            item.images
        ));
    }

    async fetchNewProducts(): Promise<Product[]> {
        const response = await fetch(this.newApiUrl);
        const data = await response.json();
        return data.result.data.map((item: any) => new Product(
            item.productId,
            item.name,
            item.price,
            item.image,
            item.description,
            item.images
        ));
    }
}

class ProductView {
    private hotProductGrid: HTMLElement;
    private newProductGrid: HTMLElement;

    constructor() {
        this.hotProductGrid = document.getElementById('hot-product-grid')!;
        this.newProductGrid = document.getElementById('new-product-grid')!;
    }

    displayProducts(products: Product[], grid: HTMLElement): void {
        grid.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img alt="${product.name}" src="${product.image}" />
                <p>${product.name}</p>
                <p>${product.price.toLocaleString()}₫</p>
            `;
            grid.appendChild(productItem);
        });
    }
}

interface Category {
    categoryId: number;
    name: string;
    slug: string;
}


function generateSlug(text: string): string {
    const slug = text
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
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8080/api/categories?page=1');
        const data = await response.json();
        
        if (data.code === 1000) {
            const categories: Category[] = data.result.data;
            createCategoryButtons(categories);
        } else {
            console.error('Lỗi khi lấy danh mục:', data.message);
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

// Hàm để tạo các nút cho các danh mục
function createCategoryButtons(categories: Category[]) {
    const categoryButtonsDiv = document.getElementById('category-buttons');
    
    if (categoryButtonsDiv) {
        categories.forEach(category => {
            const button = document.createElement('button');
            button.innerText = category.name;
            button.onclick = () => {
                fetchProductsByCategory(category.slug);
            };
            categoryButtonsDiv.appendChild(button);
        });
    }
}

// Hàm để lấy sản phẩm theo danh mục
async function fetchProductsByCategory(slug: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/categories/${slug}`);
        const data = await response.json();
        
        if (data.code === 1000) {
            const category = data.result[0]; // Lấy danh mục đầu tiên
            if (category && category.subCategories) {
                displaySubCategories(category.subCategories); // Hiển thị các danh mục con
            }
        } else {
            console.error('Lỗi khi lấy sản phẩm:', data.message);
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

// Hàm để hiển thị danh mục con và thêm sự kiện click
function displaySubCategories(subCategories: { name: string; slug: string }[]) {
    const productDiv = document.getElementById('category-products');
    
    if (productDiv) {
        productDiv.innerHTML = ''; // Xóa nội dung cũ

        subCategories.forEach(subCategory => {
            const subCategoryCard = document.createElement('div');
            subCategoryCard.className = 'sub-category-card'; // Thêm class cho các danh mục con
            
            subCategoryCard.innerHTML = `
            <h3>${subCategory.name}</h3>
            <button onclick="fetchProductsBySubCategory('${generateSlug(subCategory.name)}')">Xem sản phẩm</button>
        `;
            console.log('Generated slug for subCategory:', generateSlug(subCategory.name));
            productDiv.appendChild(subCategoryCard);
        });
    }
}


async function fetchProductsBySubCategory(slug: string) {
    console.log('Fetching products for slug:', slug);
    try {
        const response = await fetch(`http://localhost:8080/api/products/${slug}`);
        const data = await response.json();
        
        if (data.code === 1000) {
            displayProducts(data.result);
        } else {
            console.error('Lỗi khi lấy sản phẩm:', data.message);
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

// Hàm để hiển thị sản phẩm trong div
function displayProducts(products: any[]) {
    const productDetailsDiv = document.getElementById('product-details');
    
    if (productDetailsDiv) {
        productDetailsDiv.innerHTML = ''; // Xóa nội dung cũ

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card'; // Thêm class cho sản phẩm
            
            productCard.innerHTML = `
                <img alt="${product.name}" src="${product.image}" />
                <p>Giá: ${product.price}</p>
                <p>Mô tả: ${product.description || 'Không có mô tả'}</p>
                <p>ID Sản Phẩm: ${product.productId}</p>
            `;

            productDetailsDiv.appendChild(productCard);
        });
    }
}




async function init() {
    const productService = new ProductService();
    const hotProducts = await productService.fetchHotProducts();
    const newProducts = await productService.fetchNewProducts();
    
    const productView = new ProductView();
    productView.displayProducts(hotProducts, productView['hotProductGrid']);  
    productView.displayProducts(newProducts, productView['newProductGrid']); 
}

init();
fetchCategories();
