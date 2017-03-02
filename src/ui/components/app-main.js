import Vue from 'vue';

class AppMain extends Vue {
  constructor() {
    super();

    const _opts = {
      activeMenu: 'takeout',
      activeTab: 'manage-take-outs'
    };

    this.methods = {
      handleTabs(/* tab, event */) {
        /* ignored */
      },
      handleMenu(key) {
        _opts.activeMenu = key;
      }
    };

    this.data = function () {
      return _opts;
    };

    this.template = '#op-app-main-tpl';
  }
}

export default AppMain;
