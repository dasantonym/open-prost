import SchemaObject from 'schema-object'
import { defaultConstructor, touch } from '../lib/model-helpers'

const Item = new SchemaObject(
  {
    uuid: String,
    name: String,
    category: String,
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

export default Item
