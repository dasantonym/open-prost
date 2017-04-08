import Vue from 'vue';
import { Loading } from 'element-ui';

import Helpers from '../util/helpers';

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
      activeStep: 0,
      itemData: [],
      personData: [],
      locationData: [],
      eventData: [],
      itemToAdd: undefined,
      takeOut: Object.assign({}, defaultTakeOut),
      person: undefined,
      event: undefined,
      location: undefined,
      takeOutList: []
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
        _opts.takeOutList = _opts.takeOutList.sort(Helpers.sortOn('value'));
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
            _opts.takeOut = Object.assign({}, defaultTakeOut);
            _opts.takeOutList = [];
            _opts.activeStep = 0;
          })
          .catch(err => {
            _this.$message.error(err.message);
            Loading.service({fullscreen: true}).close();
          });
      },
      resetTakeOut() {
        _opts.takeOutList = [];
      },
      prevStep() {
        _opts.activeStep -= 1;
      },
      nextStep() {
        _opts.activeStep += 1;
      },

      // Items

      queryItems(query, cb) {
        const results = Helpers.queryData(_opts.itemData.items, query, ['title', 'tags']);
        cb(results.sort(Helpers.sortOn('value')));
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
      },

      // Persons

      queryPersons(query, cb) {
        const results = Helpers.queryData(_opts.personData.items, query, ['name'], 'name');
        cb(results.sort(Helpers.sortOn('value')));
      },
      handlePersonSelect(item) {
        // _opts.takeOut.person = item.data.name;
      },

      // Locations

      queryLocations(query, cb) {
        const results = Helpers.queryData(_opts.locationData.items, query);
        cb(results.sort(Helpers.sortOn('value')));
      },
      handleLocationSelect(item) {
        // _opts.takeOut.location = item.data;
      },

      // Events

      queryEvents(query, cb) {
        const results = Helpers.queryData(_opts.eventData.items, query);
        cb(results.sort(Helpers.sortOn('value')));
      },
      handleEventSelect(item) {
        //_opts.takeOut.event = item.data.title;
      }
    };

    this.data = function () {
      return _opts;
    };

    this.computed = {
      tableHeight: function () {
        if (window.matchMedia && window.matchMedia('(-webkit-device-pixel-ratio: 2)').matches) {
          return window.innerHeight - 400;
        } else {
          return window.innerHeight - 200;
        }
      },
      totalSum: function () {
        return _opts.takeOutList.reduce((sum, takeOut) => {
          return sum + takeOut.quantity_price * takeOut.quantity_amount;
        }, 0.0);
      }
    };

    this.template = '#op-take-out-tpl';

    this.mounted = function () {
      _opts._appRef.get('loadItems').loadItems()
        .then(data => _opts.itemData = data);
      _opts._appRef.get('loadEvents').loadEvents()
        .then(data => _opts.eventData = data);
      _opts._appRef.get('loadLocations').loadLocations()
        .then(data => _opts.locationData = data);
      _opts._appRef.get('loadPersons').loadPersons()
        .then(data => _opts.personData = data);
    };
  }
}

export default TakeOut;
