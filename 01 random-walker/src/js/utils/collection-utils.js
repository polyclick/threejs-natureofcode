///////////////////////////////////////////////////////////////////////////////
//// COLLECTION UTILS
///////////////////////////////////////////////////////////////////////////////
//
// utils for arrays, lists, object, collections, maps, ...



// check if item is an object
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}



// recursive deep merge of two objects
export function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    })
  }
  return target
}