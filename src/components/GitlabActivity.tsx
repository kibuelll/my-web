'use client';

import { useEffect, useState } from 'react';
import { ThemeInput, ActivityCalendar, } from 'react-activity-calendar';

interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function GitLabCalendar() {
  const [data, setData] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State untuk filter tahun
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const fetchGitLabData = async () => {
      try {
        const res = await fetch('/api/gitlab-activity');
        if (!res.ok) throw new Error('Gagal memuat API');

        const result: ContributionData[] = await res.json();
        setData(result);

        // Ekstrak semua tahun dari data yang ditarik (misal: "2023", "2024")
        const years = Array.from(
          new Set(result.map((item) => item.date.split('-')[0]))
        ).sort((a, b) => b.localeCompare(a)); // Urutkan dari yang terbaru

        setAvailableYears(years);
        if (years.length > 0) {
          setSelectedYear(years[0]); // Jadikan tahun terbaru sebagai default
        }

      } catch (error) {
        console.error('Error fetching GitLab data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitLabData();
  }, []);

  if (loading) return <p className="text-gray-500 animate-pulse">Memuat seluruh riwayat GitLab...</p>;

  const explicitTheme: ThemeInput = {
    light: ['#ebedf0', '#c0e6ff', '#7bc9ff', '#3b82f6', '#1d4ed8'],
    dark: ['#1e1e2e', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1'],
  };

  // Filter data sesuai tahun yang dipilih
  let filteredData = data.filter((item) => item.date.startsWith(selectedYear));

  // Trik agar kalender selalu menampilkan lebar 1 tahun penuh,
  // meskipun kontribusi pertama di tahun itu baru dimulai di bulan Juni.
  if (filteredData.length > 0) {
    if (!filteredData.some(d => d.date === `${selectedYear}-01-01`)) {
      filteredData.push({ date: `${selectedYear}-01-01`, count: 0, level: 0 });
    }
    if (!filteredData.some(d => d.date === `${selectedYear}-12-31`)) {
      filteredData.push({ date: `${selectedYear}-12-31`, count: 0, level: 0 });
    }
    filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  return (
    <div className="p-6 bg-transparent rounded-lg shadow-md border border-secondary">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Kontribusi
        </h3>

        {/* Tombol Filter Tahun */}
        <div className="flex flex-wrap gap-2">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${selectedYear === year
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-max">
            <ActivityCalendar
              data={filteredData}
              theme={explicitTheme}
              colorScheme="light" // Ubah jadi "dark" jika default tema Anda gelap
              labels={{
                totalCount: `{{count}} contributions in ${selectedYear}`,
              }}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Tidak ada kontribusi di tahun {selectedYear}.</p>
      )}
    </div>
  );
}