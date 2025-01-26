export default {
	preset: "ts-jest",
	// collectCoverage: true,
	coverageReporters: ["json", "text", "lcov", "clover"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	moduleNameMapper: {
		"^~/(.*)$": "<rootDir>/$1",
		// This tells Jest to map any imports starting with @/ to the src directory.
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testMatch: [
		"**/__tests__/**/*.+(ts|js|(x)",
		"**/?(*.)+(spec|test).+(ts|js|(x)",
	],
	testEnvironment: "node",
};
