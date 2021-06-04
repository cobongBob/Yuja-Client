const BoardTypeConvert = (board_type) => {
  switch (board_type) {
    case "Youtuber":
      return 1;
    case "Editor":
      return 2;
    case "Thumb":
      return 3;
    case "Winwin":
      return 4;
    case "Collabo":
      return 5;
    case "CustomService":
      return 6;
    case "Free":
      return 7;
    case "Report":
      return 8;
    case "Notice":
      return 9;
    case "QnA":
      return 10;
    default:
      return 0;
  }
};
export const BoardTypeConvertReverse = (board_code) => {
  switch (board_code) {
    case 1:
      return "Youtuber";
    case 2:
      return "Editor";
    case 3:
      return "Thumb";
    case 4:
      return "Winwin";
    case 5:
      return "Collabo";
    case 6:
      return "CustomService";
    case 7:
      return "Free";
    case 8:
      return "Report";
    case 9:
      return "Notice";
    case 10:
      return "QnA";
    default:
      return 0;
  }
};
export const BoardTypeConvertUrl = (reportedBoardCode, reportedBoardId) => {
  let boardUrl = "";
  const reportedBoardType = BoardTypeConvertReverse(reportedBoardCode);
  if (reportedBoardCode === 1) {
    boardUrl = `/Ydetail/${reportedBoardId}`;
  } else if (reportedBoardCode === 2) {
    boardUrl = `/EDetail/Editor/${reportedBoardId}/1`;
  } else if (reportedBoardCode === 3) {
    boardUrl = `/ThumbDetail/Thumb/${reportedBoardId}/1`;
  } else {
    boardUrl = `/BoardDetail/${reportedBoardType}/${reportedBoardId}/1`;
  }
  return boardUrl;
};

export default BoardTypeConvert;
