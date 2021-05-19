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
    default:
      return 0;
  }
};

export default BoardTypeConvert;
