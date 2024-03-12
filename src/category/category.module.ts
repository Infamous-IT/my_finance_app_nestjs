import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Transaction } from '../transaction/entities/transaction.entity';
import { TransactionService } from '../transaction/service/transaction.service';

@Module({
	imports: [TypeOrmModule.forFeature([Category, Transaction])],
	controllers: [CategoryController],
	providers: [CategoryService, TransactionService],
})
export class CategoryModule {}
