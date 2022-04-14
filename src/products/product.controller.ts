import { Controller, Body, Post, Get, Patch, Delete, Param } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product } from "./interfaces/product.interface";

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Post()
    async addProduct(
        @Body() createProductDto: CreateProductDto,
    ): Promise<{id: string}> {
        const savedProductId = await this.productsService.insertProduct(createProductDto);
        return {id: savedProductId}
    }

    @Get()
    async getAllProducts(): Promise<Product[]>{
        const products = await this.productsService.fetchAllProducts();
        return products;
    }

    @Get(':id')
    async getProductById(@Param('id') prodId: string): Promise<Product> {
        const product = await this.productsService.fetchProductById(prodId);
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string, 
        @Body() updatedProductDto: UpdateProductDto,

    ): Promise<{id: string}>{
        const updatedProductId = await this.productsService.updateProduct(prodId, updatedProductDto);
        return {id: updatedProductId}
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: string): Promise<{id: string}> {
        const deletedProductId = await this.productsService.removeProduct(productId);
        return {id: productId};       
    }
}