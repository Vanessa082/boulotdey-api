"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUtilities = void 0;
class AppUtilities {
    constructor() {
        //
    }
    removeObjKeys(obj, keysToRemove) {
        const results = {};
        for (let key in obj) {
            if (keysToRemove.includes(key) || key == "password")
                continue;
            results[key] = obj[key];
        }
        ;
        return results;
    }
}
exports.AppUtilities = AppUtilities;
// avenue germaine
