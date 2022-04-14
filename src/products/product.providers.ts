import { Connection } from 'mongoose';
import { databaseProviders } from 'src/database/database.provider';
import { ProductSchema } from './schemas/product.schema';

export const productProviders = [
    {
        provide: 'PRODUCT_MODEL',
        useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
        inject: ['DATABASE_CONNECTION']
    }
]