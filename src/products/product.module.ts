import { Module } from "@nestjs/common";

import { ProductsController } from "./product.controller";
import { productProviders } from "./product.providers";
import { ProductsService } from "./product.service";


@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ...productProviders
    ]
})
export class ProductModule {}