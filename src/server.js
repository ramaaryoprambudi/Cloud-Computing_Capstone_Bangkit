// server.js
const Hapi = require("@hapi/hapi");
const authRoutes = require("./routes/authRoutes");
const { PORT } = require("./config/config");

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: "localhost",
  });

  // Mendaftarkan routes
  server.route(authRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
