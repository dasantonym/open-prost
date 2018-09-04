import SchemaObject from 'schema-object'
import { defaultConstructor, touch } from '../lib/model-helpers'

const Person = new SchemaObject(
  {
    uuid: String,
    name: String,
    created: String,
    updated: String
  },
  {
    constructors: {
      default: defaultConstructor
    },
    methods: {
      touch
    }
  }
)

export default Person
