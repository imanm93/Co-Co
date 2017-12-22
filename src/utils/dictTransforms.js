export const dictToArray = (dict) => {
  return Object.keys(dict).map(key => {
    return {
      id: key,
      name: dict[key]
    }
  });
}

export const dictToOptionsForSelect = (dict) => {
  return Object.keys(dict).map(key => {
    return {
      key: key,
      value: dict[key],
      text: dict[key]
    }
  });
}
