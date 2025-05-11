// Map of board types to their Korean names
const boardTypeMap = {
  announcement: "공지사항",
  "job-announcement": "취업공고",
  buyandsell: "사고팔기",
  housing: "하우징/룸메이트",
  sponsor: "스폰서/후원사",
  // Every Kisa
  community: "자유게시판",
  concern: "고민게시판",
  academic: "공부게시판",
  career: "취업·진로",
  livingqa: "생활 Q&A",
  "": "일반",
};

const everyKisaBoards = new Set([
  "community",
  "concern",
  "academic",
  "career",
  "livingqa",
]);

const announcementBoards = ["announcement", "job-announcement"];

// Create a reverse mapping of Korean names to board types
const koreanBoardTypeMap = Object.fromEntries(
  Object.entries(boardTypeMap).map(([key, value]) => [value, key])
);

/**
 * Get the Korean name of a board type
 * @param boardType - The English board type
 * @returns The Korean name of the board type, or a default message if not found
 */
export function getKoreanBoardType(boardName: string): string {
  return boardTypeMap[boardName] || "존재하지 않는 게시판";
}

/**
 * Get the English board type from its Korean name
 * @param boardType - The Korean name of the board type
 * @returns The English board type, or "none" if not found
 */
export function getEnglishBoardType(boardName: string): string {
  return koreanBoardTypeMap[boardName] || "none";
}

/**
 * Check whether a board type is for EveryKISA
 */
export function isEveryKisaBoard(boardType: string): boolean {
  return everyKisaBoards.has(boardType);
}

/**
 * Check whether a board type is for announcements (can't leave comments or write posts except KISA)
 */
export function isAnnouncementBoard(boardType: string): boolean {
  return announcementBoards.includes(boardType);
}
