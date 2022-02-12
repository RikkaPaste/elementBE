export function valiName(rule, value, callback) {
  if (!value) {
    return callback(new Error("用户名不能为空"));
  } else if (!/^[\d\w]{4,20}$/.test(value)) {
    return callback(new Error("用户名只能是4-20个字母数字"));
  } else {
    callback();
  }
};

export function valiPass(rule, value, callback) {
  if (!value) {
    return callback(new Error("密码不能为空"));
  } else if (!/^[\d\w]{6,20}$/.test(value)) {
    return callback(new Error("密码只能是6-20个字母数字"));
  } else {
    callback();
  }
};
export function valiUserName(rule, value, callback) {
  if (!value) {
    return callback(new Error("用户名必填"));
  } else if (!/^[\d\w]{3,20}$/.test(value)) {
    return callback(new Error("长度是3-20个字符"));
  } else {
    callback();
  }
};
export function valiUserPhone(rule, value, callback) {
  if (!/^1[3-9][0-9]{9}$/.test(value)) {
    return callback(new Error("请正确输入手机格式"));
  } else {
    callback();
  }
};
export function valiGoodsName(rule, value, callback) {
  if (!value) {
    return callback(new Error("商品必填"));
  }else if (value.length<3) {
    return callback(new Error("长度是3-50字符"));
  } else {
    callback();
  }
};
export function valiGoodsPrice(rule, value, callback) {
  if (!value) {
    return callback(new Error("价格必填"));
  }
  else if (!/^\d+$|^\d+[.]?\d+$/.test(value)) {
    return callback(new Error("请正确填写价格"));
  } else {
    callback();
  }
};
export function valiGoodsNumber(rule, value, callback) {
  if (!value) {
    return callback(new Error("库存必填"));
  }else if (!/^[\d]+$/.test(value)) {
    return callback(new Error("请正确填写库存"));
  } else {
    callback();
  }
};
export function valiGoodsWeight(rule, value, callback) {
  if (!value) {
    return callback(new Error("重量必填"));
  }else if (!/^[\d]+$/.test(value)) {
    return callback(new Error("请正确填写重量"));
  } else {
    callback();
  }
};
export function valiCateName(rule, value, callback) {
  if (!value) {
    return callback(new Error("分类名必填"));
  }else if (!/^([\u4E00-\u9FA5]|[\d\w]){2,20}$/.test(value)) {
    return callback(new Error("长度是2-20个字符,一个汉字占两个字符"));
  } else {
    callback();
  }
};
export function valiGoodsAttr(rule, value, callback) {
  if (!value) {
    return callback(new Error("属性名必填"));
  }else if (!/^([\u4E00-\u9FA5]|[\d\w]){2,20}$/.test(value)) {
    return callback(new Error("长度是2-20个字符,一个汉字占两个字符"));
  } else {
    callback();
  }
};
export function valiAttrName(rule, value, callback) {
  if (!value) {
    return callback(new Error("参数名必填"));
  }else if (!/^([\u4E00-\u9FA5]|[\d\w]){2,20}$/.test(value)) {
    return callback(new Error("长度是2-20个字符,一个汉字占两个字符"));
  } else {
    callback();
  }
};
export function valiRoleName(rule, value, callback) {
  if (!value) {
    return callback(new Error("角色名必填"));
  }else if (!/^([\u4E00-\u9FA5]|[\d\w]){2,20}$/.test(value)) {
    return callback(new Error("长度是2-20个字符,一个汉字占两个字符"));
  } else {
    callback();
  }
};
export function valiMenuName(rule, value, callback) {
  if (!value) {
    return callback(new Error("权限名必填"));
  }else if (!/^([\u4E00-\u9FA5]|[\d\w]){2,20}$/.test(value)) {
    return callback(new Error("长度是2-20个字符,一个汉字占两个字符"));
  } else {
    callback();
  }
};
export function valiMenuPath(rule, value, callback) {
  if (!value) {
    return callback(new Error("路径必填"));
  }else {
    callback();
  }
};