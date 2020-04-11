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
  ],

  deploy: {
    production: {
      key: '~/lecture.pem',
      user: 'ubuntu',
      host: '54.180.116.182',
      ref: 'origin/master',
      repo: 'git@github.com:lichris/rest-api-lecture-1st.git',
      path: '/home/ubuntu/lecture/development',
      'post-deploy':
        'npm i && npm run build && cd /home/ubuntu/lecture/production && npm i --only=production && ~/.npm-global/bin/pm2 reload all'
    }
  }
}