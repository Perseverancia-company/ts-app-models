# App models

These are the app models for my apps.

<!-- I can simply ask AI to generate migrations haha -->

I have to rename tables to plural and create migrations for them, I'll do it little by little limited only to those I need to change.

Also I have to update every repository that uses this package, I could probably create an app that does it automatically.

Package migrations are separated to not add space to this package, [migrations](https://github.com/FelixRiddle/sequelize-migrations).

## Env

```bash
# MySQL database
MYSQL_USERNAME=root
MYSQL_PASSWORD=123
MYSQL_HOST=localhost
MYSQL_PORT=3306

# Database name
# There are many ways to configure the database name, most of the time they depend on the state of the app
# By state ordered from highest priority to lowest

# This system allows for conscious database synchronization

# This one is general and also used for development
MYSQL_DATABASE_NAME=perseverancia
DATABASE_NAME=perseverancia

# Production
PRODUCTION_MYSQL_DATABASE_NAME=perseverancia-production
PRODUCTION_DATABASE_NAME=perseverancia-production

# Testing
TESTING_MYSQL_DATABASE_NAME=perseverancia-testing
TESTING_DATABASE_NAME=perseverancia-testing
```
