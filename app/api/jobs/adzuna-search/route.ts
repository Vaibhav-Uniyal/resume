import { NextRequest, NextResponse } from 'next/server';

// Adzuna API credentials
const ADZUNA_APP_ID = 'f4f4901f';
const ADZUNA_API_KEY = '5cac1377252c520c48006986f449d892';
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs';

interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    area: string[];
    display_name: string;
  };
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: boolean;
  description: string;
  redirect_url: string;
  created: string;
  contract_type?: string;
  category: {
    label: string;
    tag: string;
  };
}

interface AdzunaResponse {
  results: AdzunaJob[];
  count: number;
}

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, location = 'us', limit = 10 } = await request.json();

    if (!jobTitle) {
      return NextResponse.json(
        { error: 'Job title is required' },
        { status: 400 }
      );
    }

    console.log(`Searching Adzuna for: "${jobTitle}" in ${location}`);

    // Build Adzuna API URL
    const searchParams = new URLSearchParams({
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_API_KEY,
      what: jobTitle,
      where: location,
      results_per_page: limit.toString(),
      'content-type': 'application/json',
      sort_by: 'relevance'
    });

    const adzunaUrl = `${ADZUNA_BASE_URL}/${location}/search/1?${searchParams}`;

    console.log('Adzuna API URL:', adzunaUrl);

    // Fetch jobs from Adzuna
    const response = await fetch(adzunaUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Adzuna API error:', response.status, response.statusText);
      throw new Error(`Adzuna API error: ${response.status}`);
    }

    const data: AdzunaResponse = await response.json();
    console.log(`Found ${data.count} jobs from Adzuna`);

    // Transform Adzuna jobs to our format
    const transformedJobs = data.results.map((job: AdzunaJob) => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      salary: job.salary_min && job.salary_max 
        ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
        : job.salary_min 
        ? `$${job.salary_min.toLocaleString()}+`
        : 'Salary not specified',
      description: job.description.substring(0, 200) + '...',
      url: job.redirect_url,
      postedDate: new Date(job.created).toLocaleDateString(),
      contractType: job.contract_type || 'Full-time',
      category: job.category.label,
      source: 'Adzuna'
    }));

    // Generate search URLs for major job boards
    const searchUrls = {
      linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`,
      indeed: `https://www.indeed.com/jobs?q=${encodeURIComponent(jobTitle)}&l=${encodeURIComponent(location)}`,
      glassdoor: `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(jobTitle)}&locT=C&locId=${encodeURIComponent(location)}`,
      ziprecruiter: `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`
    };

    return NextResponse.json({
      success: true,
      jobTitle,
      location,
      realJobs: transformedJobs,
      searchUrls,
      totalFound: data.count,
      source: 'Adzuna API'
    });

  } catch (error) {
    console.error('Error fetching jobs from Adzuna:', error);
    
    // Fallback: Return search URLs even if Adzuna fails
    const { jobTitle, location = 'us' } = await request.json().catch(() => ({ jobTitle: 'Software Developer', location: 'us' }));
    
    const searchUrls = {
      linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`,
      indeed: `https://www.indeed.com/jobs?q=${encodeURIComponent(jobTitle)}&l=${encodeURIComponent(location)}`,
      glassdoor: `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(jobTitle)}&locT=C&locId=${encodeURIComponent(location)}`,
      ziprecruiter: `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`
    };

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch real jobs from Adzuna',
      jobTitle,
      location,
      realJobs: [],
      searchUrls,
      totalFound: 0,
      source: 'Search URLs Only'
    });
  }
}
