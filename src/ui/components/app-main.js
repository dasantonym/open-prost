import Vue from 'vue';

class AppMain extends Vue {
  constructor() {
    super();

    const _opts = {
      activeName: 'output'
    };

    this.template = '#op-app-main-tpl';
    this.methods = {
      handleTabs(/* tab, event */) {
        /* ignored */
      }
    };
    this.data = function () {
      return _opts;
    };
  }
}

export default AppMain;
