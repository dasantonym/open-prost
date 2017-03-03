import Vue from 'vue';
import {Loading} from 'element-ui';

import Confirm from '../util/confirm';

class ManageCommonResource extends Vue {
  constructor(appRef, defaultObject, resource) {
    super();

    const _opts = {
      _appRef: appRef,
      activeForm: undefined,
      data: [],
      dataToAdd: defaultObject,
      confirm: Confirm
    };

    this.methods = {
      add() {
        const _this = this,
          _loader = Loading.service({fullscreen: true});
        return _opts._appRef.service(resource)
          .create(_this.dataToAdd)
          .then(res => {
            _this.dataToAdd = Object.assign({}, defaultObject);
            _loader.close();
            _this.update();
            _this.$message.success(`"${res.title}" hinzugefügt`);
          })
          .catch(err => {
            _loader.close();
            _this.$message.error(err.message);
          });
      },
      update() {
        const _this = this,
          _loader = Loading.service({fullscreen: true});
        return _opts._appRef.service(resource)
          .find({paginate: false})
          .then(res => {
            _this.data = res.data;
            _loader.close();
          })
          .catch(err => {
            _loader.close();
            _this.$message.error(err.message);
          });
      },
      remove(item) {
        const _this = this;
        _opts.confirm.title = item.title;
        _opts.confirm.body = 'Wirklich löschen?';
        _opts.confirm.fn = function () {
          return _opts._appRef.service(resource)
            .remove(item._id)
            .then(_this.update())
            .catch(err => _this.handleError(err));
        };
        _opts.confirm.visible = true;
      },
    };

    this.data = function () {
      return _opts;
    };

    this.template = `#op-manage-${resource}-tpl`;

    this.mounted = function () {
      return this.update();
    };
  }
}

export default ManageCommonResource;
