/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");
const { i18n } = require("./next-i18next.config");

const nextConfig = withLess({
  reactStrictMode: true,
  swcMinify: true,
  i18n,
});

module.exports = nextConfig;
