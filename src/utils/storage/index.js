import Storage from './storage'
export const localStorage = new Storage(window.localStorage)
export const sessionStorage = new Storage(window.sessionStorage)
