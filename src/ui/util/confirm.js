const Confirm = {
  title: undefined,
  body: undefined,
  fn: undefined,
  visible: false
};

Confirm.execute = function () {
  if (typeof Confirm.fn === 'function') {
    Confirm.fn();
  }
  Confirm.visible = false;
};

Confirm.cancel = function () {
  Confirm.visible = false;
};

export default Confirm;
