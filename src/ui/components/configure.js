import Vue from 'vue';

class Configure extends Vue {
  constructor() {
    super();

    const _opts = {
      configuration: {
        master_url: undefined,
        storage_location: undefined
      }
    };

    this.methods = {
      submit() {

      }
    };

    this.data = function () {
      return _opts;
    };

    this.template = '#op-configure-tpl';
  }
}

export default Configure;
