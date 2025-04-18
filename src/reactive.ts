
let activeEffect: Function | null = null;

export function reactive(target: any) {
  const depsMap = new Map();

  return new Proxy(target, {
    get(obj, key) {
      if (activeEffect) {
        let deps = depsMap.get(key) || new Set();
        deps.add(activeEffect);
        depsMap.set(key, deps);
      }
      return obj[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      const deps = depsMap.get(key);
      if (deps) deps.forEach((fn:Function) => fn());
      return true;
    }
  });
}

export function effect(fn:Function) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}