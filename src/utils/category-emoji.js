const CATEGORY_EMOJI = {
  Contribution: "🌏",
  Insight: "🔍",
  Paper: "📄",
  TIL: "📝",
  Thought: "💭",
  Bugfix: "🛠️",
}

export const getCategoryEmoji = (category) => {
  return CATEGORY_EMOJI[category] || "📂"
}

export default CATEGORY_EMOJI

