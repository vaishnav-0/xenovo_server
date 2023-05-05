const objectMap = function (obj: object, func: (key: string | number, value: any) => [string | number, any], nest: boolean | undefined = false, level: number | undefined = 0): object {
    const ret: {
        [i: string | number]: any
    } = {};
    Object.entries(obj).forEach(([k, v]: [string | number, any]) => {
        if (nest && typeof v === 'object') {
            let obj_: any;
            if (typeof level !== 'number')
                throw new Error("Level should be a number")
            if (level < 0)
                throw new Error("Level should be greater than or equal to 0")
            if (level === 0) {
                obj_ = objectMap(v, func);
            }
            else
                obj_ = objectMap(v, func, true, --level);
            ret[k] = obj_;
        }
        else {
            const [k_, v_] = func(k, v);
            ret[k_] = v_;
        }
    });
    return ret;
}
module.exports.objectMap = objectMap;