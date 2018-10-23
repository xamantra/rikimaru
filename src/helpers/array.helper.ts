declare global {
  interface Array<T> {
    remove(value: any): [];
  }
}
Array.prototype.remove = function(value: any): [] {
  const idx = this.indexOf(value);
  if (idx !== -1) {
    return this.splice(idx, 1); // The second parameter is the number of elements to remove.
  }
  return this;
};
export {};
