import { BoardTypeConvertUrl } from './BoardTypeConvert';
import { TiArrowForward } from 'react-icons/ti';

export const toastWithPush = (txt, notification, history) => (
  <>
    {txt}
    <button
      onClick={() => pushToPage(notification, history)}
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        color: '#ff9411',
      }}
    >
      <TiArrowForward size={30} />
    </button>
  </>
);

const pushToPage = (notification, history) => {
  let boardCode = notification.comment.board.boardType.boardCode;
  let boardId = notification.comment.board.id;
  const boardUrl = BoardTypeConvertUrl(boardCode, boardId);
  history.push(boardUrl);
};

export const noticeWithPush = (notification, history) => {
  pushToPage(notification, history);
};
