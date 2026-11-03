import type { Config } from "@react-router/dev/config";

export default {
  basename: "/example",
  prerender: ["/", "/forms", "/data", "/interactions", "/content"],
  ssr: true,
} satisfies Config;
