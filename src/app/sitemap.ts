import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Gunakan domain Vercel yang sudah Anda atur
  const baseUrl = 'https://my-web-gamma-roan.vercel.app';

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Contoh jika nanti Anda menambahkan halaman '/projects' atau '/about'
    // {
    //   url: `${baseUrl}/projects`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
