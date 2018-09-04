import SchemaObject from 'schema-object'
import { defaultConstructor, touch } from '../lib/model-helpers'

const TakeoutEntry = new SchemaObject({
  item: String,
  quantity: Number,
  cost: Number
})

const Takeout = new SchemaObject(
  {
    uuid: String,
    entries: [TakeoutEntry],
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

export default Takeout
