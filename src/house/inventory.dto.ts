export class CreateInventoryCategoryDto {
    readonly name: string;
  }
  
  export class UpdateInventoryCategoryDto {
    readonly oldName: string;
    readonly newName: string;
  }
  