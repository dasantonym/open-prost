import Vue from 'vue';

const _instances = new WeakMap();

class LoadItems extends Vue {
  constructor(appRef) {
    super();

    if (_instances.has(appRef)) {
      return _instances.get(appRef);
    }

    this._appRef = appRef;

    this.items = [];
    this.tags = [];
    this.quantities = [];
    this.units = [];
    this.sizes = [];

    _instances.set(appRef, this);
  }

  load(forceUpdate) {
    if (!forceUpdate && this.items.length > 0) {
      return Promise.resolve(this);
    }

    const _this = this;

    return this._appRef.service('items').find({ paginate: false })
      .then(res => {
        const reduceValues = (data, prop) => {
          return data.reduce((entries, entry) => {
            if (Array.isArray(entry[prop])) {
              entry[prop].map(value => {
                if (entries.indexOf(value) === -1) {
                  entries.push(value);
                }
              });
            } else {
              if (entries.indexOf(entry) === -1) {
                entries.push(entry);
              }
            }
            return entries;
          }, []);
        };
        _this.tags = reduceValues(res.data, 'tags')
          .map(tag => {
            return {text: tag, value: tag};
          });
        _this.quantities = reduceValues(res.data, 'quantities');
        _this.units = reduceValues(res.data, 'units');
        _this.sizes = reduceValues(res.data, 'sizes');
        _this.items = res.data;

        return _this;
      })
      .catch(err => {
        _this.$message.error(`Error loading items: ${err.message}`);

        return _this;
      });
  }
}

export default LoadItems;
