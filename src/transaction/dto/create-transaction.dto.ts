import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTransactionDto {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@IsString()
	@MinLength(5)
	@IsNotEmpty()
	type: 'expense' | 'income';

	@IsNotEmpty()
	category: Category;

	@IsOptional()
	user?: User;
}
