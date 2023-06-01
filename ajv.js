const Ajv = require("ajv")
const ajv = new Ajv({ coerceTypes: true }); // options can be passed, e.g. {allErrors: true}

// interface createAccountServiceInterface {
//   foo: number;
//   bar: string;
// }

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" }
  },
  required: ["foo", "bar"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

const data = {
  foo: '1',
  bar: null,
}

const valid = validate(data)
console.log(valid);
if (!valid) console.log(validate.errors)
console.log(data);