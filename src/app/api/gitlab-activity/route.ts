import { NextResponse } from 'next/server';

interface GitLabEvent {
  created_at: string;
}

interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function GET() {
  const token = process.env.GITLAB_PAT;
  const username = process.env.GITLAB_USERNAME;

  if (!token || !username) {
    return NextResponse.json({ error: 'Kredensial GitLab tidak ditemukan di .env' }, { status: 500 });
  }

  try {
    let allEvents: GitLabEvent[] = [];
    let page = 1;
    let hasMore = true;

    // Looping untuk mengambil semua halaman data (maksimal 100 item per halaman)
    while (hasMore) {
      const response = await fetch(
        `https://gitlab.com/api/v4/users/${username}/events?per_page=100&page=${page}`,
        {
          headers: {
            'PRIVATE-TOKEN': token,
          },
          next: { revalidate: 3600 },
        }
      );

      console.log(response, "=-=-=-=-")

      if (!response.ok) {
        throw new Error(`GitLab API error: ${response.status}`);
      }

      const events: GitLabEvent[] = await response.json();

      if (events.length === 0) {
        // Jika array kosong, berarti semua data sudah ditarik
        hasMore = false;
      } else {
        allEvents = [...allEvents, ...events];
        page++;

        // Batas aman untuk mencegah API timeout di server Next.js (50 halaman = 5000 event)
        if (page > 50) hasMore = false; 
      }
    }

    const contributions: Record<string, number> = {};

    allEvents.forEach((event) => {
      const date = event.created_at.split('T')[0];
      contributions[date] = (contributions[date] || 0) + 1;
    });

    const formattedData: ContributionData[] = Object.keys(contributions).map((date) => {
      const count = contributions[date];
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      
      if (count > 0 && count <= 3) level = 1;
      else if (count > 3 && count <= 6) level = 2;
      else if (count > 6 && count <= 10) level = 3;
      else if (count > 10) level = 4;

      return { date, count, level };
    });

    formattedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error in GitLab API Route:', error);
    return NextResponse.json({ error: 'Gagal mengambil data GitLab' }, { status: 500 });
  }
}