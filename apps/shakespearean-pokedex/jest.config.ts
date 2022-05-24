/* eslint-disable */
export default {
  displayName: "shakespearean-pokedex",
  preset: "../../jest.preset.js",
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nrwl/react/plugins/jest",
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/apps/shakespearean-pokedex",
  setupFilesAfterEnv: ["<rootDir>/src/setupTest.ts"]
};
