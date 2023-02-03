const getCustomVariables = () => {
  const processEnvVariables = { ...process.env }
  // Return a new object with the properties that has PROJECT_KEY_ prefix
  const projectEnvVariables = Object.keys(processEnvVariables)
    .filter((key) => key.includes('SHYFT_'))
    .reduce((obj, key) => ({ ...obj, [key]: processEnvVariables[key] }), {})
  return projectEnvVariables
}

module.exports = {
  env: getCustomVariables(),
  images: {
    domains: ['storage.googleapis.com', 'lh3.googleusercontent.com', 'storage.opensea.io']
  }
}
