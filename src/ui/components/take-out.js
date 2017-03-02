import Vue from 'vue';
import { Loading } from 'element-ui';

class TakeOut extends Vue {
  constructor(appRef) {
    super();

    const defaultTakeOut = {
      title: undefined,
      quantity_amount: undefined,
      quantity: undefined,
      quantity_price: undefined,
      size: undefined,
      unit: undefined
    };

    const _opts = {
      _appRef: appRef,
      activeForm: 'additem',
      itemData: [],
      itemToAdd: undefined,
      takeOut: Object.assign({}, defaultTakeOut),
      takeOutList: []
    };

    const sortOnTitle = (a, b) => {
      if (a.value > b.value) {
        return 1;
      } else if (a.value < b.value) {
        return -1;
      }
      return 0;
    };

    this.methods = {
      addTakeOut() {
        if (!_opts.takeOut) {
          return;
        }

        let exists = false;
        _opts.takeOutList.map(takeOut => {
          if (!exists && takeOut.title === _opts.takeOut.title &&
            takeOut.size === _opts.takeOut.size &&
            takeOut.unit === _opts.takeOut.unit &&
            takeOut.quantity === _opts.takeOut.quantity) {

            takeOut.quantity_amount += _opts.takeOut.quantity_amount;
            exists = true;
          }
        });
        if (!exists) {
          _opts.takeOutList.push(_opts.takeOut);
        }
        _opts.takeOut = Object.assign({}, defaultTakeOut);
        _opts.takeOutList = _opts.takeOutList.sort(sortOnTitle);
      },
      removeTakeOut(takeOut) {
        _opts.takeOutList.splice(_opts.takeOutList.indexOf(takeOut), 1);
      },
      submitTakeOut() {
        const _this = this;
        Loading.service({fullscreen: true});
        _opts._appRef.service('takeouts')
          .create({ user: 'anonymous', created: new Date(), list: _opts.takeOutList })
          .then(() => {
            _opts.takeOutList = [];
            Loading.service({fullscreen: true}).close();
            _this.$message.success('Entnahme hinzugefügt');
          })
          .catch(err => {
            _this.$message.error(err.message);
            Loading.service({fullscreen: true}).close();
          });
      },
      resetTakeOut() {
        _opts.takeOutList = [];
      },
      queryItems(query, cb) {
        if (!_opts.itemData || !Array.isArray(_opts.itemData.items)) {
          return cb([]);
        }

        const results = [],
          queryRegex = new RegExp(`${query}`, 'gi'),
          showAll = typeof query !== 'string' || query.length === 0;

        _opts.itemData.items.map(item => {
          const entry = {value: item.title, data: item};
          if (showAll || (typeof item.title === 'string' && item.title.search(queryRegex) !== -1) ||
            (Array.isArray(item.tags) && item.tags.join(' ').search(queryRegex) != -1)) {

            if (results.join(' ').search(queryRegex) === -1) {
              results.push(entry);
            }
          }
        });

        cb(results.sort(sortOnTitle));
      },
      handleItemSelect(item) {
        _opts.itemToAdd = item.data;
        _opts.takeOut = Object.assign({}, defaultTakeOut);
        _opts.takeOut.title = _opts.itemToAdd.title;
        _opts.takeOut.quantity_amount = 1;
        _opts.takeOut.quantity_price = 0.0;
        if (Array.isArray(_opts.itemToAdd.quantities)) {
          _opts.takeOut.quantity = _opts.itemToAdd.quantities[0];
        }
        if (Array.isArray(_opts.itemToAdd.quantity_prices)) {
          _opts.takeOut.quantity_price = _opts.itemToAdd.quantity_prices[0];
        }
        if (Array.isArray(_opts.itemToAdd.sizes)) {
          _opts.takeOut.size = _opts.itemToAdd.sizes[0];
        }
        if (Array.isArray(_opts.itemToAdd.units)) {
          _opts.takeOut.unit = _opts.itemToAdd.units[0];
        }
      }
    };

    this.data = function () {
      return _opts;
    };

    this.computed = {
      tableHeight: function () {
        if (window.matchMedia && window.matchMedia("(-webkit-device-pixel-ratio: 2)").matches) {
          return window.innerHeight - 400;
        } else {
          return window.innerHeight - 200;
        }
      }
    };

    this.template = '#op-take-out-tpl';

    this.mounted = function () {
      _opts._appRef.get('loadItems').loadItems()
        .then(data => _opts.itemData = data);

    };
  }
}

export default TakeOut;
