import {Error} from 'mongoose';

export default function errorHandler (err: Error.ValidationError) {
  const errors: Partial<Record<string|number, {}>> = {};

  if (err.message.includes('todo validation failed')) {
    Object.values(err.errors).forEach((error) => {
      if('properties' in error && error.properties.path) {
        errors[error.properties.path] = error.message
      }
    })
  }

  return errors;
}