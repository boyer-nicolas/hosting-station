const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('MYSQL_HOST', 'mariadb'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('MYSQL_DATABASE', 'hostingstation'),
      user: env('MYSQL_USER', 'hostingstation'),
      password: env('MYSQL_PASSWORD', 'hostingstation'),
      ssl: false
    },
    debug: false,
  },
});
