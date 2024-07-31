import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { title } from 'process';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        private httpService: HttpService,
        private readonly configService: ConfigService
    ){}

    @Get()
    async all() {
        return await this.productService.all()
    }

    @Post(':id/like')
    async like(@Param('id', ParseIntPipe)id: number) {
        const product = await this.productService.getOne(id)
        this.httpService.post(`http://localhost:6000/api/products/${id}/like`, {}).subscribe(
            res => {
                console.log(res);
            }
        )
        return this.productService.update(id, {likes: product.likes + 1})
    }

    @EventPattern('product_created')
    async create(product: any) {
        await this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        })
    }

    @EventPattern('product_updated')
    async update(product: any) {
        await this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        })
    }

    @EventPattern('product_deleted')
    async delete(id: number) {
        await this.productService.delete(id)
    }

    async 
}
