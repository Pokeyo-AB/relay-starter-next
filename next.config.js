/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    relay: {
      artifactDirectory: "./__generated__",
      eagerEsModules: true,
      language: "typescript",
    },
  },
};

module.exports = nextConfig;
