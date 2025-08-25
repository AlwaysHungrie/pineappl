module.exports = {
  apps: [{
    name: 'nextjs-app',
    script: 'npm',
    args: 'start',
    env: {
      PORT: 3000,
      NODE_ENV: 'production'
    },
    instances: 1,
    exec_mode: 'fork'
  }]
}