/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allows the brand SVG placeholders to be served via next/image.
    // Safe here because our SVGs contain no scripts; the CSP sandboxes them.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // When you host real product photos on an external CDN later, add its
    // hostname here, e.g.:
    // remotePatterns: [{ protocol: "https", hostname: "images.your-cdn.com" }],
  },
};

export default nextConfig;
