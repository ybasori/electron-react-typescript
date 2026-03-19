export const extractQueryUrl = (value: string) => {
  function parseKeyPath(key: any) {
    const parts = [];
    const regex = /([^\[\]]+)/g;
    let match;
    while ((match = regex.exec(key))) {
      const part = match[1];
      parts.push(/^\d+$/.test(part) ? Number(part) : part);
    }
    return parts;
  }
  function setDeep(obj: any, keys: any, value: any) {
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLast = i === keys.length - 1;

      if (isLast) {
        const maybeNumber = Number(value);
        current[key] =
          !isNaN(maybeNumber) && value.trim() !== "" ? maybeNumber : value;
      } else {
        if (current[key] === undefined) {
          current[key] = typeof keys[i + 1] === "number" ? [] : {};
        }
        current = current[key];
      }
    }
  }

  const output = {};

  let query={};



  value.split("&").forEach((item)=>{
    const v=item.split("=");
    query = {...query,[v[0]]:v[1]}
  })

  for (const [key, value] of Object.entries(query)) {
    const path = parseKeyPath(key);
    setDeep(output, path, value);
  }

  return output;
};