exports.isEmpty = object => !Object.keys(object).filter(k => object[k]).length;
