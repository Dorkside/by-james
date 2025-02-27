/**
 * LinkedIn Composable
 * 
 * Provides functionality for interacting with LinkedIn from Nuxt components
 */

import { ref } from 'vue';

export default function useLinkedIn() {
  const isPosting = ref(false);
  const postError = ref<string | null>(null);
  const postSuccess = ref(false);

  /**
   * Post an article to LinkedIn
   * @param article Article data
   */
  const postToLinkedIn = async (article: any) => {
    isPosting.value = true;
    postError.value = null;
    postSuccess.value = false;

    try {
      // For client-side, we need to call the server endpoint
      const response = await fetch('/api/linkedin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: article.slug || article._path?.split('/').pop(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post to LinkedIn');
      }

      postSuccess.value = true;
    } catch (error: any) {
      postError.value = error.message || 'An error occurred while posting to LinkedIn';
      console.error('LinkedIn posting error:', error);
    } finally {
      isPosting.value = false;
    }
  };

  /**
   * Get LinkedIn stats for an article
   * @param slug Article slug
   */
  const getLinkedInStats = async (slug: string) => {
    try {
      const response = await fetch(`/api/linkedin/stats?slug=${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch LinkedIn stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching LinkedIn stats:', error);
      return null;
    }
  };

  return {
    isPosting,
    postError,
    postSuccess,
    postToLinkedIn,
    getLinkedInStats,
  };
} 