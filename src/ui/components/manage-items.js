import Vue from 'vue';

class ManageItems extends Vue {
  constructor() {
    super();

    const _opts = {
      itemToAdd: {
        title: undefined,
        quantities: undefined,
        units: undefined,
        sizes: undefined,
        tags: undefined
      },
      items: [],
      rules: {
        title: [
          { required: true, message: 'Titel erforderlich', trigger: 'change' }
        ],
        quantities: [
          { required: true, message: 'Mengen erforderlich', trigger: 'change' }
        ],
        sizes: [
          { required: true, message: 'Größen erforderlich', trigger: 'change' }
        ],
        units: [
          { required: true, message: 'Einheiten erforderlich', trigger: 'change' }
        ]
      }
    };

    this.template = '#op-manage-items-tpl';
    this.methods = {
      handleTabs(/* tab, event */) {
        /* ignored */
      },
      addItem() {
        const item = Object.assign({}, this.itemToAdd);
        item.quantities = item.quantities.split(',');
        item.units = item.units.split(',');
        item.tags = item.tags.split(',');
        item.sizes = item.sizes.split(',').map(size => {
          return parseFloat(size);
        });

      }
    };
    this.data = function () {
      return _opts;
    };
  }
}

export default ManageItems;
