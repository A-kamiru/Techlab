/** True if `val` has (at least) the shape of `def`. Guards the UI against broken admin edits. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCompatible(def: any, val: any): boolean {
  if (Array.isArray(def)) {
    if (!Array.isArray(val)) return false;
    return def.length === 0 || val.every((v) => isCompatible(def[0], v));
  }
  if (def && typeof def === 'object') {
    if (!val || typeof val !== 'object' || Array.isArray(val)) return false;
    return Object.keys(def).every((k) => k in val && isCompatible(def[k], val[k]));
  }
  return typeof def === typeof val;
}
