import Vue from 'vue';
import { Loading } from 'element-ui';

class ManageItems extends Vue {
  constructor(appRef) {
    super();

    const defaultItem = {
      title: undefined,
      quantities: undefined,
      units: undefined,
      sizes: undefined,
      tags: undefined
    };

    const _opts = {
      _appRef: appRef,
      activeForm: undefined,
      confirm: {
        visible: false,
        title: null,
        fn: undefined,
        execute: function () {
          _opts.confirm.visible = false;
          if (typeof _opts.confirm.fn === 'function') {
            return _opts.confirm.fn();
          }
        },
        cancel: function () {
          _opts.confirm.visible = false;
        }
      },
      itemToAdd: Object.assign({}, defaultItem),
      itemData: {
        items: [],
        tags: []
      }
    };

    this.methods = {
      //
      //
      // Handlers

      itemsUpdated() {
        _opts._appRef.get('loadItems').loadItems(true)
          .then(data => _opts.itemData = data);
      },
      handleError(err) {
        this.$message.error(err.message);
        Loading.service({ fullscreen: true }).close();
      },

      //
      //
      // Actions

      addItem() {
        const _this = this,
          sizes = [],
          item = Object.assign({}, this.itemToAdd);

        item.quantities = item.quantities.split(',').sort();
        item.units = item.units.split(',').sort();
        item.tags = item.tags.split(',').sort();
        item.sizes.split(',').map(size => {
          const parsed = parseFloat(size);
          if (typeof parsed === 'number') {
            sizes.push(parsed);
          }
        });
        item.sizes = sizes.length > 0 ? sizes.sort() : undefined;

        _opts._appRef.service('items').create(item)
          .then(() => {
            _this.itemToAdd = defaultItem;
            _this.activeForm = undefined;
            return _this.itemsUpdated();
          })
          .then(_this.$message.success(`Artikel "${item.title}" hinzugefügt`))
          .catch(err => _this.handleError(err));
      },
      removeItem(item) {
        const _this = this;
        _opts.confirm.title = item.title;
        _opts.confirm.fn = function () {
          return _opts._appRef.service('items').remove(item._id)
            .then(_this.itemsUpdated())
            .catch(err => _this.handleError(err));
        };
        _opts.confirm.visible = true;
      },

      //
      //
      // Util

      arrayToString(row, column) {
        if (column.property && Array.isArray(row[column.property])) {
          return row[column.property].join(', ');
        }
      },
      formatTags(row) {
        return row.tags.map(tag => {
          return { text: tag, value: tag };
        })
      },
      filterTags(tag, row) {
        return row.tags.indexOf(tag) > -1;
      }
    };

    this.computed = {
      titleWidth: () => {
        return Math.round(window.innerWidth * 0.3);
      }
    };

    this.data = function () {
      return _opts;
    };

    this.template = '#op-manage-items-tpl';

    this.mounted = function () {
      _opts._appRef.get('loadItems').loadItems()
        .then(data => _opts.itemData = data);
    };
  }
}

export default ManageItems;
