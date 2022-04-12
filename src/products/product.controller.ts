import { Controller, Body, Post, Get, Patch, Delete, Param } from "@nestjs/common";
import { ProductsService } from "./product.service";

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Post()
    async addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDescription: string, 
        @Body('price') prodPrice: number) {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return {id: generatedId}
    }

    @Get()
    async getAllProducts(){
        const products = await this.productsService.fetchAllProducts();
        return products;
    }

    @Get(':id')
    getProductById(@Param('id') prodId: string): any {
        const product = this.productsService.fetchProductById(prodId);
        return product;
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('description') prodDescription: string, 
        @Body('price') prodPrice: number
    ): {id: string}{
        const updatedProductId = this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
        return {id: updatedProductId}
    }

    @Delete(':id')
    deleteProduct(@Param('id') productId: string): {id: string} {
        const deletedProductId = this.productsService.removeProduct(productId);
        return {id: productId};       
    }
}