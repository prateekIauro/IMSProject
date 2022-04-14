import { Injectable, NotFoundException, ConflictException, InternalServerErrorException,Inject } from "@nestjs/common";
import { Model, Types } from 'mongoose'
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";

import { Product } from "./interfaces/product.interface";

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>) {}

    async insertProduct(createProductDto: CreateProductDto): Promise<string> {
        const newProduct = new this.productModel(createProductDto);
        let result;
        try {
            result = await newProduct.save();
        } catch(err) {
            console.log(err.code)
            if(err.code === 11000) {
                throw new ConflictException('Product with this title already exists')
            }
            throw new InternalServerErrorException();
        }
        return result.id as string;
    }

    async fetchAllProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        })) as Product[];
    }

    async fetchProductById(productId: string): Promise<Product> {
        const product = await this.findProduct(productId)
        return product as Product;
    }

    async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<string> {
        try {
            await this.productModel.updateOne({_id: productId}, updateProductDto)
        } catch(err) {
            throw new NotFoundException('Could not find product');
        }
        return productId;
    }

    async removeProduct(productId: string): Promise<string> {
        try {
            await this.productModel.deleteOne({_id:productId})
        }catch(err) {
            throw new NotFoundException('Could not find product');
        }
        return productId;
    }

    async findProduct(id: string): Promise<Product> {
        let product
        try {
            product = await this.productModel.findById(id);
        } catch(err) {
            throw new NotFoundException('Could not find product');
        }
        if(!product) {
            throw new NotFoundException('Could not find product');
        }
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        }
    }
}