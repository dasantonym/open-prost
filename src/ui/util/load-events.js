import Vue from 'vue';
import {Loading} from 'element-ui';

const _instances = new WeakMap();

class LoadEvents extends Vue {
  constructor(appRef) {
    super();

    if (_instances.has(appRef)) {
      return _instances.get(appRef);
    }

    this._appRef = appRef;

    this.items = [];

    _instances.set(appRef, this);
  }

  loadEvents(forceUpdate) {
    if (!forceUpdate && this.items.length > 0) {
      return Promise.resolve(this);
    }

    const _this = this,
      _loader = Loading.service({fullscreen: true});

    return this._appRef.service('events').find({paginate: false})
      .then(res => {
        _this.items = res.data;
        _loader.close();

        return _this;
      })
      .catch(err => {
        _this.$message.error(`Error loading events: ${err.message}`);
        _loader.close();

        return _this;
      });
  }
}

export default LoadEvents;
