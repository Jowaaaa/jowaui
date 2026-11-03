import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("forms", "routes/forms.tsx"),
  route("data", "routes/data.tsx"),
  route("interactions", "routes/interactions.tsx"),
  route("content", "routes/content.tsx"),
] satisfies RouteConfig;
