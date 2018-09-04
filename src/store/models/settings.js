import SchemaObject from 'schema-object'

const Settings = new SchemaObject(
  {
    access_token: String
  },
  {
    methods: {
      isValidToken (token) {
        return this.access_token === token
      }
    }
  }
)

export default Settings
