import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './controller/transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
