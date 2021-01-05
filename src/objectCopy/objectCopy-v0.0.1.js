"use strict";

/**
 * @class 对象扩展
 */
class MoreObject extends Object {
    constructor() {
        super();
    }

    /**
     * @method completeAssign 对象合并
     * @author jeq && 2020-11-20
     * @param {Object} target 目标对象
     * @param  {...any} sources 源对象
     * @returns {Object} 新对象
     */
    completeAssign(target, ...sources) {
        sources.forEach(source => {
            let descriptors = Object.keys(source).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                return descriptors;
            }, {});

            Object.getOwnPropertySymbols(source).forEach(sym => {
                let descriptor = Object.getOwnPropertyDescriptor(source, sym);
                if (descriptor.enumerable) {
                    descriptors[sym] = descriptor;
                }
            });
            Object.defineProperties(target, descriptors);
        });
        return target;
    }

    /**
     * @method objectCopy 对象深拷贝
     * @author jeq && 2020-11-20
     * @param {Object} obj 需要深拷贝的对象 
     * @returns {Object} 拷贝的对象
     */
    objectCopy(obj) {
        return Object.create(
            Object.getPrototypeOf(obj),
            Object.getOwnPropertyDescriptors(obj)
        );
    }
}

// export { MoreObject };