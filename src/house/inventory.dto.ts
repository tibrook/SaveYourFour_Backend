export class CreateInventoryCategoryDto {
    readonly name: string;
    readonly description?: string;
  }
  
  export class UpdateInventoryCategoryDto {
    readonly name?: string;
    readonly description?: string;
  }
  