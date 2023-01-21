const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: { '@/*/(.*)': '<rootDir>/src/$1' },
}

export default jestConfig
