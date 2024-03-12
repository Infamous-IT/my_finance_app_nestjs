import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './controller/transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/service/category.service';

@Module({
	imports: [TypeOrmModule.forFeature([Transaction, Category])],
	controllers: [TransactionController],
	providers: [TransactionService, CategoryService],
})
export class TransactionModule {}
