<template lang="pug">
  .q-ma-lg
    q-table.full-width(:loading="loading", :title="resource", :data="items", :filter="filter", :columns="tableColumns", row-key="uuid")
      template(slot="top-left", slot-scope="props")
        slot(name="buttons-left")
          h3.caption.q-ma-md {{ capitalize(resource) }}
          q-btn(v-if="!noCreate", size="sm", color="primary", icon="add", @click="$router.push({ name: `${resource}.create` })")
      template(slot="top-right", slot-scope="props")
        q-search(v-model="filter")
      q-td(slot="body-cell-actions", slot-scope="props", :props="props")
        q-btn(size="md", flat, icon="delete", @click="removeItem(props.row.uuid)")
        q-btn(size="md", flat, icon="edit", @click="$router.push({ name: `${resource}.edit`, params: { uuid: props.row.uuid } })")
</template>

<script>
  export default {
    name: 'GenericList',
    props: {
      resource: String,
      columns: Array,
      noCreate: Boolean
    },
    data () {
      return {
        filter: undefined,
        items: [],
        loading: false
      }
    },
    async mounted () {
      await this.updateData()
    },
    watch: {
      async resource () {
        await this.updateData()
      }
    },
    computed: {
      tableColumns () {
        return (this.columns || []).concat([{
          name: 'actions',
          align: 'right'
        }])
      }
    },
    methods: {
      async updateData () {
        if (!this.resource) return
        this.loading = true
        this.items = await this.$store.dispatch(`${this.resource}/find`, {})
        this.loading = false
        console.debug(`updated ${this.resource}`, this.items)
      },
      async removeItem (uuid) {
        this.loading = true
        await this.$store.dispatch(`${this.resource}/remove`, { uuid })
        this.loading = false
        await this.updateData()
      },
      capitalize (str) {
        return str[0].toUpperCase() + str.substr(1)
      }
    }
  }
</script>
