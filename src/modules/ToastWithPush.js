import { BoardTypeConvertUrl } from './BoardTypeConvert';
import { TiArrowForward } from 'react-icons/ti';

export const toastWithPush = (txt, notification, history) => (
  <>
    <button
      onClick={() => pushToPage(notification, history)}
      style={{
        float: 'left',
        border: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <TiArrowForward
        size={30}
        style={{
          color: '#ff9411',
        }}
      />
    </button>
    {txt}
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
