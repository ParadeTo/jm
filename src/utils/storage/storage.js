export default class Storage {
  constructor (storage) {
    // set default storage to localStorage
    storage = storage || (typeof window.localStorage !== 'undefined' ? window.localStorage : null)

    // set storage class
    this._storage = storage
    this._expiration_key_prefix = '__expired_storage_ts__'
  }

  getTimestamp () {
    return Math.floor(((new Date()).getTime()) / 1000)
  }

  /**
   * Set item.
   * @param key: Item key to set (string).
   * @param value: Value to store (string).
   * @param expiration: Expiration time, in seconds. If not provided, will not set expiration time.
   * @param return: Storage.setItem() return code.
   **/
  setItem (key, value, expiration) {
    // set item
    var ret = this._storage.setItem(key, value)

    // set expiration timestamp (only if defined)
    if (expiration) {
      this.updateExpiration(key, expiration)
    }

    // return set value return value
    return ret
  }

  getItem (key) {
    // if expired remove item and return null
    if (this.isExpired(key)) {
      this.removeItem(key)
      return null
    }

    // try to fetch and return item value
    return this._storage.getItem(key)
  }

  /**
  * Get item + metadata such as time left and if expired.
  * Even if item expired, will not remove it.
  */
  peek (key) {
    // get value and time left
    var ret = {
      value: this._storage.getItem(key),
      timeLeft: this.getTimeLeft(key)
    }

    // set if expired
    ret.isExpired = ret.timeLeft !== null && ret.timeLeft <= 0

    // return data
    return ret
  }

  getTimeLeft (key) {
    // try to fetch expiration time for key
    var expireTime = parseInt(this._storage.getItem(this._expiration_key_prefix + key), 10)

    // if got expiration time return how much left to live
    if (expireTime && !isNaN(expireTime)) {
      return expireTime - this.getTimestamp()
    }

    // if don't have expiration time return null
    return null
  }

  isExpired (key) {
    // get time left for item
    var timeLeft = this.getTimeLeft(key)

    // return if expired
    return timeLeft !== null && timeLeft <= 0
  }

  removeItem (key) {
    // remove the item itself and its expiration time
    var ret = this._storage.removeItem(key)
    this._storage.removeItem(this._expiration_key_prefix + key)

    // return optional return code
    return ret
  }

  setJson (key, val, expiration) {
    // special case - make sure not undefined, because it would just write 'undefined' and crash on reading.
    if (val === undefined) {
      throw new Error('Cannot set undefined value as JSON!')
    }

    // set stringified value
    return this.setItem(key, JSON.stringify(val), expiration)
  }

  getJson (key) {
    // get value
    var val = this.getItem(key)

    // if null, return null
    if (val === null) {
      return null
    }

    // parse and return value
    return JSON.parse(val)
  }

  updateExpiration (key, expiration) {
    return this._storage.setItem(this._expiration_key_prefix + key, this.getTimestamp() + expiration)
  }

  // Get all keys in storage, not including internal keys used to store expiration.
  keys (includeExpired) {
    // create list to return
    var ret = []

    // iterate over storage keys to find all non-expiration keys
    var that = this
    this._iterKeys(function (storageKey) {
      // if its not a timestamp key, skip it
      if (storageKey.indexOf(that._expiration_key_prefix) !== 0) {
        // add to return list, but only if including expired keys or if not expired yet
        if (includeExpired || !that.isExpired(storageKey)) {
          ret.push(storageKey)
        }
      }
    })

    // return keys
    return ret
  }

  /**
   * Iterate all keys in storage class.
   */
  _iterKeys (callback) {
    // first check if storage define a 'keys()' function. if it does, use it
    if (typeof this._storage.keys === 'function') {
      let keys = this._storage.keys()
      for (let i = 0; i < keys.length; ++i) {
        callback(keys[i])
      }
    } else if (typeof Object === 'function' && Object.keys) { // if not supported try to use object.keys
      let keys = Object.keys(this._storage)
      for (let i = 0; i < keys.length; ++i) {
        callback(keys[i])
      }
    } else if (this._storage.length !== undefined && typeof this._storage.key === 'function') { // if not supported try to use iteration via length
      // first build keys array, so this function will be delete-safe (eg if callback remove keys it won't cause problems due to index change)
      var keys = []
      for (let i = 0, len = this._storage.length; i < len; ++i) {
        keys.push(this._storage.key(i))
      }
      // now actually iterate keys
      for (let i = 0; i < keys.length; ++i) {
        callback(keys[i])
      }
    } else { // if both methods above didn't work, iterate on all keys in storage class hoping for the best..
      for (let storageKey in this._storage) {
        callback(storageKey)
      }
    }
  }

  clear () {
    this._storage.clear()
  }

  /**
   * Clear expired keys.
   * If you never call this function, expired keys will remain until you try to get them / reset a new value.
   * **/
  clearExpired () {
    // return list
    const ret = []

    // iterate over storage keys to find all counters
    const that = this
    this._iterKeys(function (storageKey) {
      // if its not a timestamp key, skip it
      if (storageKey.indexOf(that._expiration_key_prefix) === 0) {
        // get item key
        const itemKey = storageKey.substr(that._expiration_key_prefix.length)
        // if expired remove it + the item
        if (that.isExpired(itemKey)) {
          that.removeItem(itemKey)
          ret.push(itemKey)
        }
      }
    })

    // return list with removed keys
    return ret
  }
}
