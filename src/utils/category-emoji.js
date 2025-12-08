const CATEGORY_EMOJI = {
  Contribution: "🌏",
  Insight: "🔍",
  Paper: "📄",
  TIL: "📝",
  Thought: "💭",
  "Trouble Shooting": "🛠️",
}

export const getCategoryEmoji = (category) => {
  return CATEGORY_EMOJI[category] || "📂"
}

export default CATEGORY_EMOJI

