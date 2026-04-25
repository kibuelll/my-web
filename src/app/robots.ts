import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://my-web-gamma-roan.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Mencegah bot mengindeks rute API kita
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
