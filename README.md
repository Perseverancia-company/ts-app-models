# App models

These are the app models for my apps.

<!-- I can simply ask AI to generate migrations haha -->

I have to rename tables to plural and create migrations for them, I'll do it little by little limited only to those I need to change.

Also I have to update every repository that uses this package, I could probably create an app that does it automatically.

Package migrations are separated to not add space to this package, [migrations](https://github.com/FelixRiddle/sequelize-migrations).

## Env

```bash
# MySQL database
MYSQL_DATABASE_NAME=perseverancia-development
MYSQL_USERNAME=root
MYSQL_PASSWORD=123
MYSQL_HOST=localhost
MYSQL_PORT=3306
```
