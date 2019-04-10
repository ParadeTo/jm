const emptyTarget = val => Array.isArray(val) ? [] : {}

const getType = a => Object.prototype.toString.call(a).slice(8, -1)

const isMergeableObject = a => {
  const cls = getType(a)
  return cls === 'Array' || cls === 'Object'
}

const clone = value => isMergeableObject(value)
  ? deepmerge(emptyTarget(value), value)
  : value

const mergeArray = (target, source) => target.concat(source).map(element => clone(element))

const mergeObject = (target, source) => {
  const dest = {}
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(key => { dest[key] = clone(target[key]) })
  }
  Object.keys(source).forEach(key => {
    if (!isMergeableObject(source[key]) || !target[key]) dest[key] = clone(source[key])
    else dest[key] = deepmerge(target[key], source[key])
  })
  return dest
}

const deepmerge = (target, source) => {
  const sourceType = getType(source)
  const targetType = getType(target)
  if (sourceType !== targetType) return clone(source)
  else {
    if (sourceType === 'Array') return mergeArray(target, source)
    else return mergeObject(target, source)
  }
}

export default deepmerge
