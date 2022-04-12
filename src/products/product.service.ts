import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'

import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, description: string, price: number) {
        const prodId = Date.now().toString();
        const newProduct = new this.productModel({title, description, price});
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async fetchAllProducts() {
        const products = await this.productModel.find().exec();
        return products as Product[];
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