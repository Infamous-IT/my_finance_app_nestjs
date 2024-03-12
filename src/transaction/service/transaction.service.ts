import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private readonly transactionRepository: Repository<Transaction>,
	) {}

	async create(createTransactionDto: CreateTransactionDto, id: number) {
		const newTransaction = {
			title: createTransactionDto.title,
			type: createTransactionDto.type,
			amount: +createTransactionDto.amount,
			user: { id },
			categories: { id: +createTransactionDto.category },
		};

		console.log(newTransaction);

		if (!newTransaction)
			throw new BadRequestException('Something went wrong...');

		return await this.transactionRepository.save(newTransaction);
	}

	async findAll(id: number) {
		return await this.transactionRepository.find({
			where: {
				user: { id },
			},
			order: {
				createdAt: 'DESC',
			},
		});
	}

	async findOne(id: number) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
			relations: {
				user: true,
				categories: true,
			},
		});

		if (!transaction)
			throw new BadRequestException('Transaction was not found...');
		return transaction;
	}

	async update(id: number, updateTransactionDto: UpdateTransactionDto) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
			relations: {
				user: true,
				categories: true,
			},
		});

		if (!transaction)
			throw new NotFoundException('Transaction was not found...');

		return await this.transactionRepository.update(
			id,
			updateTransactionDto,
		);
	}

	async remove(id: number) {
		const transaction = await this.transactionRepository.findOne({
			where: { id },
		});

		if (!transaction)
			throw new NotFoundException('Transaction was not found');
		return await this.transactionRepository.delete(id);
	}

	async findAllWithPagination(id: number, page: number, limit: number) {
		const transactions = await this.transactionRepository.find({
			where: {
				user: { id },
			},
			relations: {
				categories: true,
				user: true,
			},
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			skip: (page - 1) * limit,
		});

		return transactions;
	}

	async findAllByType(id: number, type: string) {
		const transactions = await this.transactionRepository.find({
			where: {
				user: { id },
				type,
			},
		});

		const total = transactions.reduce((acc, el) => acc + el.amount, 0);

		return total;
	}
}
