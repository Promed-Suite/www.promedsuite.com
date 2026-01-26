import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import auth from "@/routes/auth/auth.index";
import benefits from "@/routes/benefits/benefit.index";
import corporate from "@/routes/corporate/corporate.index";
import index from "@/routes/index.route";

const app = createApp();

configureOpenAPI(app);

const routes = [index, auth, benefits, corporate] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
