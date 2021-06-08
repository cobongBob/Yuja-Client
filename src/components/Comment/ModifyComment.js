import React, { useCallback, useState } from "react";

const ModifyComment = ({ comment, isModifying, setIsModifying, modifyComment }) => {
  const [modifyInput, setModifyInput] = useState({
    commentId: comment.commentId,
    content: comment.content,
  });
  const modifyInputHandler = useCallback(
    (e) => {
      setModifyInput({
        ...modifyInput,
        [e.target.name]: e.target.value,
      });
    },
    [modifyInput, setModifyInput]
  );
  return (
    <div>
      <textarea
        name='content'
        value={modifyInput.content}
        className='textarea'
        onChange={modifyInputHandler}
        maxLength={2000}
      />
      <button
        onClick={() => {
          modifyComment({ ...modifyInput });
          setModifyInput({ commentId: comment.commentId, content: "" });
          setIsModifying({ ...isModifying, modifying: false, modify_commentId: 0 });
        }}
      >
        수정
      </button>
      <button onClick={() => setIsModifying({ ...isModifying, modifying: false, modify_commentId: 0 })}>취소</button>
    </div>
  );
};

export default ModifyComment;
