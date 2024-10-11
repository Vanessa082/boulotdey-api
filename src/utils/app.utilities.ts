class AppUtilities {
  constructor() {
    //
  }

  removeObjKeys<T extends object>(obj: T, keysToRemove: (keyof T)[]) {
    const results = {} as T;

    for (let key in obj) {
      if (keysToRemove.includes(key) || key == "password") continue;

      results[key] = obj[key];
    }

    return results;
  }
}

export { AppUtilities };

// avenue germaine
