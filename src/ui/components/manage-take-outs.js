import Vue from 'vue';

class ManageTakeOuts extends Vue {
  constructor() {
    super();

    const _opts = {
      takeOuts: []
    };

    this.methods = {
      updateTakeOuts() {

      }
    };

    this.data = function () {
      return _opts;
    };

    this.template = '#op-manage-take-outs-tpl';

    this.mounted = function () {
      return this.updateTakeOuts();
    };
  }
}

export default ManageTakeOuts;
