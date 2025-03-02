/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/offers',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
