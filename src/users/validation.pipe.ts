import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      // Create custom msg from Joi object
      const errorMessage = this.formatError(error);
      throw new BadRequestException(errorMessage);
    }
    return value;
  }

  private formatError(error: Joi.ValidationError): string {
    // Joi send a list of error details. We can format them.
    return error.details.map(detail => detail.message).join('. ');
  }
}