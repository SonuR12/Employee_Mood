type MoodEntry = {
  employeeId: string;
  employeeName: string;
  mood: "happy" | "neutral" | "sad";
  comment: string;
  timestamp: string;
};

export const moods: MoodEntry[] = [];
