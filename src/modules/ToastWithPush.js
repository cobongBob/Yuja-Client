import { BoardTypeConvertUrl } from "./BoardTypeConvert";

export const toastWithPush = (txt, notification, history) => (
  <>
    {txt}
    <button onClick={() => pushToPage(notification, history)}>글 보러가기</button>
  </>
);

const pushToPage = (notification, history) => {
  let boardCode = notification.comment.board.boardType.boardCode;
  let boardId = notification.comment.board.id;
  const boardUrl = BoardTypeConvertUrl(boardCode, boardId);
  history.push(boardUrl);
};
