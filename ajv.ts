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

// it is imperative that the reference to the errors is copied 
// the next time ajv runs the errors object could be overridden 
// because under the hood it is just a pointer, \
// that's why the reference needs to be copied in the same executiono block. 
// Note that Node is single-threaded and you do not have concurrency

export type AttrFields = Partial<Record<`attr${number}`, any>>;

const abc: AttrFields = {
  attr1: 'abc',
  attr2: 123,
  attr3: true,
  attrsdf: 'sdf',
}