import Ajv, { JSONSchemaType } from 'ajv';
const ajv = new Ajv({ coerceTypes: true, }); // options can be passed, e.g. {allErrors: true}

interface createAccountServiceInterface {
  foo: number;
  bar: string;
}

const RESERVATION_ENUM = {
  CAR_PLAN: 1,
  OPTION: 2,
  SEASON: 3,
  SPECIAL_DAY: 4,
  COUPON: 5,
};

const schema: JSONSchemaType<createAccountServiceInterface> = {
  type: "object",
  properties: {
    foo: {
      type: "integer", enum: Object.values(RESERVATION_ENUM),
    },
    bar: { type: "string", minLength: 2 }
  },
  anyOf: [
    {
      type: "object",
      properties: {
        bar: { type: "string" }
      }
    }
  ],
  required: ["foo", "bar"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

const data = {
  foo: 10,
  bar: 'abc'
}

const valid = validate(data)
console.log(valid);
if (!valid) console.log(validate.errors)
console.log(data)