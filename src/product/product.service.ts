import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>
    ){}

    async all(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async create(data: any): Promise<Product> {
        return await new this.productModel(data).save()
    }

    async getOne(id: number): Promise<Product> {
        const product =await this.productModel.findOne({id})
        return product
    }

    async update(id: number, data: any): Promise<Product> {
        return this.productModel.findOneAndUpdate({id}, data)
    }

    async delete(id: number):Promise<void> {
        return this.productModel.findOneAndDelete({id})
    }
}
