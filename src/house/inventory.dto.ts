import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInventoryCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

  
  export class UpdateInventoryCategoryDto {
    readonly oldName: string;
    readonly newName: string;
  }
  