/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 */

module.exports = {
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
