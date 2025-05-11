import React from "react";

export default function CheckBoxes({
  isBoardAnnouncement,
  isAnnouncement,
  setIsAnnouncement,
}) {
  // if board is not announcement board
  if (!isBoardAnnouncement) {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isAnnouncement}
          onChange={(e) => setIsAnnouncement(e.currentTarget.checked)}
        />
        <label className="ml-2" htmlFor="announcement">
          공지사항
        </label>
      </div>
    );
  }
  return <></>;
}
