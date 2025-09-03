// Job Search Service - Integrates Adzuna API with job recommendations

export interface RealJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  url: string;
  postedDate: string;
  contractType: string;
  category: string;
  source: string;
}

export interface SearchUrls {
  linkedin: string;
  indeed: string;
  glassdoor: string;
  ziprecruiter: string;
}

export interface JobSearchResult {
  success: boolean;
  jobTitle: string;
  location: string;
  realJobs: RealJob[];
  searchUrls: SearchUrls;
  totalFound: number;
  source: string;
  error?: string;
}

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

// Function to search for real jobs using Adzuna API
export async function searchRealJobs(
  jobTitle: string, 
  location: string = 'us', 
  limit: number = 10
): Promise<JobSearchResult> {
  try {
    console.log(`Searching for real jobs: "${jobTitle}" in ${location}`);
    
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
    const searchUrls = generateSearchUrls(jobTitle, location);

    return {
      success: true,
      jobTitle,
      location,
      realJobs: transformedJobs,
      searchUrls,
      totalFound: data.count,
      source: 'Adzuna API'
    };
    
  } catch (error) {
    console.error('Error searching for real jobs:', error);
    
    // Fallback: Generate search URLs
    const searchUrls = generateSearchUrls(jobTitle, location);
    
    return {
      success: false,
      jobTitle,
      location,
      realJobs: [],
      searchUrls,
      totalFound: 0,
      source: 'Search URLs Only',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Function to generate search URLs for major job boards
export function generateSearchUrls(jobTitle: string, location: string = 'us'): SearchUrls {
  return {
    linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`,
    indeed: `https://www.indeed.com/jobs?q=${encodeURIComponent(jobTitle)}&l=${encodeURIComponent(location)}`,
    glassdoor: `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(jobTitle)}&locT=C&locId=${encodeURIComponent(location)}`,
    ziprecruiter: `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`
  };
}

// Function to enhance job recommendations with real jobs
export async function enhanceJobRecommendations(
  recommendations: any[], 
  location: string = 'us'
): Promise<any[]> {
  console.log(`Enhancing ${recommendations.length} job recommendations with real jobs`);
  
  const enhancedRecommendations = await Promise.all(
    recommendations.map(async (recommendation) => {
      try {
        // Search for real jobs for this recommendation
        const realJobsResult = await searchRealJobs(
          recommendation.title, 
          location, 
          10 // Limit to 10 real jobs per recommendation
        );
        
        return {
          ...recommendation,
          realJobs: realJobsResult.realJobs,
          searchUrls: realJobsResult.searchUrls,
          realJobsCount: realJobsResult.totalFound,
          hasRealJobs: realJobsResult.realJobs.length > 0
        };
      } catch (error) {
        console.error(`Error enhancing recommendation for "${recommendation.title}":`, error);
        
        // Return original recommendation with search URLs
        return {
          ...recommendation,
          realJobs: [],
          searchUrls: generateSearchUrls(recommendation.title, location),
          realJobsCount: 0,
          hasRealJobs: false
        };
      }
    })
  );
  
  return enhancedRecommendations;
}
