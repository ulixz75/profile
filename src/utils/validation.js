// Utilidades para validación de formularios
class Validator {
  constructor() {
    this.validators = {
      required: (value) => value.trim() !== '',
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      minLength: (length) => (value) => value.length >= length,
      maxLength: (length) => (value) => value.length <= length,
      numeric: (value) => /^\d+$/.test(value),
      min: (min) => (value) => parseFloat(value) >= min,
      max: (max) => (value) => parseFloat(value) <= max,
      date: (value) => !isNaN(Date.parse(value)),
    };
  }

  validate(value, rules) {
    for (const rule of rules) {
      if (typeof rule === 'string') {
        if (!this.validators[rule](value)) {
          return false;
        }
      } else if (typeof rule === 'object') {
        const [ruleName, ruleParam] = Object.entries(rule)[0];
        if (!this.validators[ruleName](ruleParam)(value)) {
          return false;
        }
      }
    }
    return true;
  }

  getErrorMessage(fieldName, rules) {
    for (const rule of rules) {
      if (typeof rule === 'string') {
        switch (rule) {
          case 'required':
            return `El campo ${fieldName} es requerido`;
          case 'email':
            return `El campo ${fieldName} debe ser un email válido`;
          case 'date':
            return `El campo ${fieldName} debe ser una fecha válida`;
          default:
            return `El campo ${fieldName} no es válido`;
        }
      } else if (typeof rule === 'object') {
        const [ruleName, ruleParam] = Object.entries(rule)[0];
        switch (ruleName) {
          case 'minLength':
            return `El campo ${fieldName} debe tener al menos ${ruleParam} caracteres`;
          case 'maxLength':
            return `El campo ${fieldName} debe tener como máximo ${ruleParam} caracteres`;
          case 'min':
            return `El campo ${fieldName} debe ser al menos ${ruleParam}`;
          case 'max':
            return `El campo ${fieldName} debe ser como máximo ${ruleParam}`;
          case 'numeric':
            return `El campo ${fieldName} debe ser un número`;
          default:
            return `El campo ${fieldName} no es válido`;
        }
      }
    }
    return `El campo ${fieldName} no es válido`;
  }

  validateForm(form, fieldRules) {
    const formData = new FormData(form);
    const fieldValues = Object.fromEntries(formData.entries());
    const errors = {};

    for (const [fieldName, rules] of Object.entries(fieldRules)) {
      const value = fieldValues[fieldName];
      if (!this.validate(value, rules)) {
        errors[fieldName] = this.getErrorMessage(fieldName, rules);
      }
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

// Crear una instancia del validador
const validator = new Validator();

// Exportar el validador para que pueda ser usado en otros archivos
window.Validator = Validator;
window.validator = validator;