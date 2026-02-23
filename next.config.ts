// import type { NextConfig } from "next";
// import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// if (process.env.NODE_ENV === "development") {
//   await setupDevPlatform();
// }

// export default nextConfig;

// next.config.ts
import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
};

export default (async () => {
  if (process.env.NODE_ENV === "development") {
    await setupDevPlatform();
  }
  return nextConfig;
})();
