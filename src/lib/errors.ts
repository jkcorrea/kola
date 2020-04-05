/* eslint-disable max-classes-per-file */
export class BaseError extends Error {
  name = 'BaseError'

  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export interface ValidationErrorItem {
  type: string
  message: string
}

export class ValidationError extends BaseError {
  errors: ValidationErrorItem[] = []

  constructor(message?: string, errors?: ValidationErrorItem[]) {
    super(message)

    this.errors = errors || []

    if (message) {
      // Use any given message
      this.message = message
    } else if (this.errors.length > 0) {
      // If errors are given we can use them to generate a message
      this.message = this.errors
        .map((err) => `${err.type}: ${err.message}`)
        .join(',\n')
    }
  }
}

export class ColumnExistsError extends BaseError {}

/* eslint-enable max-classes-per-file */
