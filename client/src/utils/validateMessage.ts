/* eslint-disable no-template-curly-in-string */
const typeTemplate = "Введите правильно ${type}";

export const defaultValidateMessages = {
  default: "Ошибка валидации поля '${name}'",
  required: "'${name}' является обязательным",
  enum: "'${name}' должен быть одним из [${enum}]",
  whitespace: "'${name}' не может быть пустым",
  date: {
    format: "'${name}' недопустимо для формата даты",
    parse: "'${name}' не может быть разобрано как дата",
    invalid: "'${name}' - недействительная дата",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "'${name}' должен/но быть длиной ровно ${len}",
    min: "'${name}' должен состоять как минимум из ${min} символов",
    max: "'${name}' не может быть длиннее, чем ${max} символов",
    range: "'${name}' должно быть между ${min} и ${max} символами",
  },
  number: {
    len: "'${name}' должен быть равен ${len}",
    min: "'${name}' не может быть меньше, чем ${min}",
    max: "'${name}' не может быть больше, чем ${max}",
    range: "'${name}' должно быть между ${min} and ${max}",
  },
  array: {
    len: "'${name}' должен/но быть длиной ровно ${len}",
    min: "'${name}' не может быть меньше ${min} по длине",
    max: "'${name}' не может быть больше ${max} по длине",
    range: "'${name}' должно быть длиной от ${min} до ${max}",
  },
  pattern: {
    mismatch: "'${name}' пароль не соответствует шаблону",
  },
};

/* eslint-enable no-template-curly-in-string */
