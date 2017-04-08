import Vue from 'vue';
import {Loading} from 'element-ui';

class ManageTakeOuts extends Vue {
  constructor(appRef) {
    super();

    this._appRef = appRef;

    const _this = this,
      _opts = {
        takeOuts: []
      };

    const loadTakeOuts = (forceUpdate) => {
      if (!forceUpdate && _opts.takeOuts.length > 0) {
        return Promise.resolve(_this);
      }

      const _loader = Loading.service({fullscreen: true});

      return _this._appRef.service('takeouts').find({paginate: false})
        .then(res => {
          _opts.takeOuts = res.data;
          _loader.close();

          return _this;
        })
        .catch(err => {
          _this.$message.error(`Error loading takeouts: ${err.message}`);
          _loader.close();

          return _this;
        });
    };

    this.methods = {

    };

    this.data = function () {
      return _opts;
    };

    this.template = '#op-manage-take-outs-tpl';

    this.mounted = function () {
      return loadTakeOuts();
    };
  }
}

export default ManageTakeOuts;
