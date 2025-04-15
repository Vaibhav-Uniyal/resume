interface ResumeEntry {
  id: string;
  title: string;
  role: string;
  atsScore: number;
  date: string;
  originalResume: string;
  optimizedResume: string;
}

export const saveResumeToHistory = async (
  title: string,
  role: string,
  atsScore: number,
  originalResume: string,
  optimizedResume: string,
  userId: string
) => {
  try {
    const response = await fetch('/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        role,
        atsScore,
        originalResume,
        optimizedResume,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save resume');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving resume:', error);
    return null;
  }
};

export const getResumeHistory = async (userId: string) => {
  try {
    const response = await fetch(`/api/resumes?email=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting resume history:', error);
    return [];
  }
};

export const deleteResumeFromHistory = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/resumes/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting resume:', error);
    return false;
  }
};