export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "LunaSync Swagger setup",
    },

    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["src/swagger/auth.swagger.ts", "src/swagger/user.swagger.ts"],
};
