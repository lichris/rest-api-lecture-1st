module.exports = {
  apps: [
    {
      name: 'lecture',
      script: './bin/www',
      instances: '2',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      merge_logs: true
      // error_file: './logs/aha-api-err.log',
      // out_file: './logs/aha-api-out.log'
    }
  ]
}