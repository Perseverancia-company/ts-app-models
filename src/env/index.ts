
/**
 * Unbiased database name
 */
export function databaseName() {
	return process.env.MYSQL_DATABASE_NAME ?? process.env.DATABASE_NAME ?? "perseverancia";
}

/**
 * Get development database name
 */
export function developmentDatabaseName() {
	return process.env.MYSQL_DATABASE_NAME ?? process.env.DATABASE_NAME ?? "perseverancia-development";
}

/**
 * Production database name
 */
export function productionDatabaseName() {
    return process.env.PRODUCTION_MYSQL_DATABASE_NAME ?? process.env.PRODUCTION_DATABASE_NAME ?? "perseverancia-production";
}

/**
 * Testing database name
 */
export function testingDatabaseName() {
    return process.env.TESTING_MYSQL_DATABASE_NAME ?? process.env.TESTING_DATABASE_NAME?? "perseverancia-testing";
}

/**
 * Use NODE_ENV to get the database name
 */
export function nodeEnvDatabaseName() {
    if (process.env.NODE_ENV === "production") {
        return productionDatabaseName();
    } else if (process.env.NODE_ENV === "development") {
        return developmentDatabaseName();
    } else if (process.env.NODE_ENV === "testing") {
		return testingDatabaseName();
	} else {
        return databaseName();
    }
}
