import React, { useCallback, useState } from "react";

const ReReplyComment = ({ comment, isReplying, setIsReplying, reReplyInsert }) => {
  const [reReplyInput, setReReplyInput] = useState({
    content: "",
    parentId: comment.commentId,
  });
  const reReplyInputHandler = useCallback(
    (e) => {
      setReReplyInput({
        ...reReplyInput,
        [e.target.name]: e.target.value,
      });
    },
    [reReplyInput, setReReplyInput]
  );
  return (
    <div>
      <textarea
        name='content'
        value={reReplyInput.content}
        className='textarea'
        onChange={reReplyInputHandler}
        maxLength={2000}
      />
      <button
        onClick={() => {
          reReplyInsert({ ...reReplyInput });
          setReReplyInput({ content: "", parentId: 0 });
          setIsReplying({ ...isReplying, replying: false, reply_commentId: 0 });
        }}
      >
        등록
      </button>
      <button onClick={() => setIsReplying({ ...isReplying, replying: false, reply_commentId: 0 })}>취소</button>
    </div>
  );
};

export default ReReplyComment;
