import Vue from 'vue';

class TakeOut extends Vue {
  constructor() {
    super();

    const _opts = {

    };

    this.template = '#op-take-out-tpl';
    this.methods = {
      takeOut() {

      }
    };
    this.data = function () {
      return _opts;
    };
  }
}

export default TakeOut;
