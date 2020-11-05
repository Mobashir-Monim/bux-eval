function deepCopy(inObject) {
    let outObject, value, key;
    if (typeof inObject !== "object" || inObject === null) { return inObject; }
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) { value = inObject[key]; outObject[key] = deepCopy(value); }
    return outObject;
}

Object.filter = (obj, key, value) => {
    let result = {}, k;

    for (k in obj) {
        if (obj[k].hasOwnProperty(key)) {
            if (obj[k][key].includes(value)) {
                result[k] = obj[k];
            }
        }
    }

    return result;
}