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

    /* global window:false */
    /* jshint node:true */
    const gui = window.require('nw.gui'),
      fs = window.require('fs'),
      configPath = window.require('path').join(gui.App.dataPath, 'config.json');
    /* jshint node:false */

    this.methods = {
      submit() {
        const _self = this;
        fs.writeFile(configPath, JSON.stringify(_opts.configuration), (err) => {
          if (err) {
            return _self.$message({
              message: err.message,
              type: 'error'
            });
          }
          _self.$message({
            message: 'Configuration successfully updated',
            type: 'success'
          });
        });
      },
      load() {
        if (fs.existsSync(configPath)) {
          _opts.configuration = JSON.parse(fs.readFileSync(configPath));
        }
      }
    };

    this.data = function () {
      return _opts;
    };

    this.template = '#op-configure-tpl';

    this.load();
  }
}

export default Configure;
