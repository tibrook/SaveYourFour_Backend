// src/users/dtos/user-settings.dto.ts
import { House } from '../../house/schemas/house.schema';

export class UserSettingsDto {
    email: string;
    firstName: string;
    lastName: string;
    type: string;
    verified: boolean;
    houses: House[]; // Assuming House is a defined type or interface
  
    constructor(user: any) {
      this.email = user.email;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.type = user.type;
      this.verified = user.verified;
      this.houses = user.houses;
    }
  }
  