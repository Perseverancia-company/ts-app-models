
export default function printMysqlEnvironmentVariables() {
    // Mysql information
    const MYSQL_NAME = process.env.DATABASE_NAME ?? process.env.MYSQL_DATABASE_NAME;
    const MYSQL_USERNAME = process.env.DATABASE_USERNAME ?? process.env.MYSQL_USERNAME ?? "root";
    const MYSQL_PASSWORD = process.env.DATABASE_PASSWORD ?? process.env.MYSQL_PASSWORD ?? "";
    const MYSQL_HOST = process.env.DATABASE_HOST ?? process.env.MYSQL_HOST ?? "localhost";
    const MYSQL_PORT = process.env.MYSQL_PORT ?? 3306;
    
    console.log(`Mysql name: ${MYSQL_NAME}`);
    console.log(`Mysql username: ${MYSQL_USERNAME}`);
    console.log(`Mysql password: ${MYSQL_PASSWORD}`);
    console.log(`Mysql host: ${MYSQL_HOST}`);
    console.log(`Mysql port: ${MYSQL_PORT}`);
};
