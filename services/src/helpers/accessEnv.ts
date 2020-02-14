const cache: { [key: string]: any} = {};

const acessEnv = (key: string, defautalue?: any) => {
  if (!(key in process.env)) {
    if (defautalue) return defautalue;
    throw new Error(`${key} not found in proccess.env!`)
  }

  if (cache[key]) return cache[key];
  
  cache[key] = process.env[key];

  return process.env[key];
}

export default acessEnv;