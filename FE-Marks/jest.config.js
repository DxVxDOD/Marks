const preset = "ts-jest";
const testEnvironment = "jsdom";
const moduleNameMapper = {
  "\\.(css|scss)$": "identity-obj-proxy",
};

export default {
  preset,
  testEnvironment,
  moduleNameMapper,
};
