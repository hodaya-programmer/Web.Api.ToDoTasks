const PROXY_CONFIG = [
  {
    context: [
      "/ToDoTasks/**",
    ],
    target: "https://localhost:7230",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
