import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ValidationPipe,
	UsePipes,
	UseGuards,
	Req,
	Query,
} from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { JwtAuthGuard } from '../../auth/guards/JwtAuthGuard';

@Controller('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Req() req,
		@Query('page') page: number,
		@Query('limit') limit: number,
	) {
		return this.transactionService.findAllWithPagination(
			+req.user.id,
			+page,
			+limit,
		);
	}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
		const userId = +req.user.id;
		return this.transactionService.create(createTransactionDto, userId);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.transactionService.findAll(+req.user.id);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.transactionService.findOne(+id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	update(
		@Param('id') id: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionService.update(+id, updateTransactionDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.transactionService.remove(+id);
	}
}
