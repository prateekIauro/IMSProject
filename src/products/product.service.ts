import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number): string {
        const prodId = Date.now().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    fetchAllProducts() {
        return [...this.products];
    }

    fetchProductById(productId: string): Product {
        const {product, productIndex} = this.findProduct(productId);
        return product;
    }

    updateProduct(productId: string, title: string, desc: string, price: number): string {
        const {product, productIndex} = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title) {
            updatedProduct.title = title;
        }
        if(desc) {
            updatedProduct.description = desc;
        }
        if(price) {
            updatedProduct.price = price;
        }
        this.products[productIndex] = updatedProduct;
        return product.id;
    }

    removeProduct(productId: string): string {
        const {product, productIndex} = this.findProduct(productId);
        this.products.splice(productIndex, 1);
        return productId;
    } 

    private findProduct(id: string): {product: Product, productIndex: number} {
        const productIndex = this.products.findIndex(product => product.id === id);
        const product = this.products[productIndex];
        if(!product) throw new NotFoundException('Could not find product');
        return {product: {...product}, productIndex: productIndex};
    }
}