interface AIResponse {
  keywords: string[];
  response: string;
  context?: string;
  examples?: string[];
}

export const enhancedAIResponses: AIResponse[] = [
  {
    keywords: ['points', 'earn', 'eco'],
    response: "You can earn Eco Points through multiple activities:",
    context: "Point System",
    examples: [
      "Daily quizzes (2-5 points per correct answer)",
      "Verified cleanups (10-50 points)",
      "Educational content (5 points)",
      "Community challenges (variable points)"
    ]
  },
  // Add more responses...
]; 