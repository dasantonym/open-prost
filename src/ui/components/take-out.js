import Vue from 'vue';
import { Loading } from 'element-ui';
import Promise from 'bluebird';
import moment from 'moment';

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
      unit: undefined,
      mergedSize: undefined
    };

    const defaultTakeOutMeta = {
      person: undefined,
      location: undefined,
      event: undefined,
      date: new Date()
    };

    const datePickerOpts = { shortcuts: [
      {
        text: 'Heute',
        onClick(picker) {
          picker.$emit('pick', new Date());
        }
      },
      {
        text: 'Gestern',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      }
    ]};

    const _opts = {
      _appRef: appRef,
      activeForm: 'additem',
      activeStep: 0,
      itemData: [],
      personData: [],
      locationData: [],
      eventData: [],
      itemMergedSizes: [],
      itemToAdd: undefined,
      takeOut: Object.assign({}, defaultTakeOut),
      takeOutMeta: Object.assign({}, defaultTakeOutMeta),
      person: undefined,
      event: undefined,
      location: undefined,
      takeOutList: [],
      pickerOptions: datePickerOpts
    };

    const loadData = (force) => {
      return Promise.map([
          { res: 'loadItems', val: 'itemData' },
          { res: 'loadEvents', val: 'eventData' },
          { res: 'loadLocations', val: 'locationData' },
          { res: 'loadPersons', val: 'personData' }
        ], obj => {
          return _opts._appRef.get(obj.res).load(force)
            .then(data => _opts[obj.val] = data);
        })
        .then(() => {
          _opts.itemMergedSizes = [];
          if (_opts.itemData && Array.isArray(_opts.itemData.sizes) && Array.isArray(_opts.itemData.units)) {
            _opts.itemData.sizes.forEach(size => {
              _opts.itemData.units.forEach(unit => {
                const mergedTitle = `${size} ${unit}`;
                _opts.itemMergedSizes.push(mergedTitle);
              });
            });
          }
        });
    };

    this.methods = {
      addTakeOut() {
        if (!_opts.takeOut) {
          return;
        }

        const splitSize = _opts.takeOut.mergedSize.split(' ');
        let exists = false;

        _opts.takeOut.size = parseFloat(splitSize.shift());
        _opts.takeOut.unit = splitSize.join(' ');

        _opts.takeOutList.map(takeOut => {
          if (!exists &&
            takeOut.title === _opts.takeOut.title &&
            takeOut.size === _opts.takeOut.size  &&
            takeOut.unit === _opts.takeOut.unit  &&
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
        const _this = this,
          _loader = Loading.service({fullscreen: true});

        const assignOrCreate = (source, target, resource, createObj, errorMsg) => {
          if (target.title === createObj.title && target.name === createObj.name) {
            return Promise.resolve();
          }
          if (typeof source !== 'string') {
            throw new Error(errorMsg);
          }
          return _opts._appRef.service(resource).create(createObj)
            .then((data) => {
              target = data;
            });
        };

        Promise.resolve()
          .then(() => {
            return assignOrCreate(
              _opts.person,
              _opts.takeOutMeta.person,
              'persons',
              { name: _opts.person },
              'Du musst Deinen Namen eintragen.'
            );
          })
          .then(() => {
            return assignOrCreate(
              _opts.location,
              _opts.takeOutMeta.location,
              'locations',
              { title: _opts.location },
              'Du musst eine Location eintragen.'
            );
          })
          .then(() => {
            return assignOrCreate(
              _opts.event,
              _opts.takeOutMeta.event,
              'events',
              { title: _opts.event },
              'Du musst ein Event eintragen.'
            );
          })
          .then(() => {
            return loadData(true);
          })
          .then(() => {
            _opts.takeOutMeta.sum = _this.totalSum;
            return _opts._appRef.service('takeouts')
              .create({
                user: 'anonymous',
                created: new Date(),
                list: _opts.takeOutList,
                meta: _opts.takeOutMeta
              })
              .then(() => {
                _opts.takeOutList = [];
                _opts.takeOut = Object.assign({}, defaultTakeOut);
                _opts.takeOutMeta = Object.assign({}, defaultTakeOutMeta);
                _opts.takeOutList = [];
                _opts.activeStep = 0;

                _opts.person = undefined;
                _opts.location = undefined;
                _opts.event = undefined;

                _loader.close();
                _this.$message.success('Entnahme hinzugefügt');
              });
          })
          .catch(err => {
            _this.$message.error(err.message);
            _loader.close();
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
        if (Array.isArray(_opts.itemMergedSizes)) {
          _opts.takeOut.mergedSize = _opts.itemMergedSizes[0];
        }
        /*
        if (Array.isArray(_opts.itemToAdd.sizes)) {
          _opts.takeOut.size = _opts.itemToAdd.sizes[0];
        }
        if (Array.isArray(_opts.itemToAdd.units)) {
          _opts.takeOut.unit = _opts.itemToAdd.units[0];
        }
        */
      },

      // Persons

      queryPersons(query, cb) {
        const results = Helpers.queryData(_opts.personData.items, query, ['name'], 'name');
        cb(results.sort(Helpers.sortOn('value')));
      },
      handlePersonSelect(item) {
        _opts.takeOutMeta.person = item.data;
      },

      // Locations

      queryLocations(query, cb) {
        const results = Helpers.queryData(_opts.locationData.items, query);
        cb(results.sort(Helpers.sortOn('value')));
      },
      handleLocationSelect(item) {
        _opts.takeOutMeta.location = item.data;
      },

      // Events

      queryEvents(query, cb) {
        const results = Helpers.queryData(_opts.eventData.items, query);
        cb(results.sort(Helpers.sortOn('value')));
      },
      handleEventSelect(item) {
        _opts.takeOutMeta.event = item.data;
      }
    };

    this.data = function () {
      return _opts;
    };

    this.computed = {
      tableHeight: function () {
        if (window.matchMedia && window.matchMedia('(-webkit-device-pixel-ratio: 2)').matches) {
          return window.innerHeight - 800;
        } else {
          return window.innerHeight - 400;
        }
      },
      totalSum: function () {
        return _opts.takeOutList.reduce((sum, takeOut) => {
          return sum + takeOut.quantity_price * takeOut.quantity_amount;
        }, 0.0);
      },
      formattedDate: function () {
        return moment(_opts.takeOutMeta.date).format('DD. MM. YYYY');
      }
    };

    this.template = '#op-take-out-tpl';

    this.mounted = function () {
      return loadData(true);
    };
  }
}

export default TakeOut;
