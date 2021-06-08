import React from "react";
import { MdFiberNew } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import ChildComments from "./ChildComment";
import getFormatDate from "../../modules/getFormatDate";
import ModifyComment from "./ModifyComment";
import ReReplyComment from "./ReReplyComment";

const ParentsComments = ({
  writer,
  userData,
  comment,
  deleteReply,
  reReplyOpen,
  isReplying,
  setIsReplying,
  reReplyInsert,
  isModifying,
  setIsModifying,
  modifyComment,
}) => {
  return (
    <>
      <li className='parentComment'>
        {isModifying.isModifying && isModifying.modify_commentId === comment.commentId ? (
          <ModifyComment
            comment={comment}
            isModifying={isModifying}
            setIsModifying={setIsModifying}
            modifyComment={modifyComment}
          />
        ) : (
          <>
            {comment.deleted ? (
              <></>
            ) : (
              <div className='commentUser'>
                {comment.nickname}
                {writer === comment.userId ? <span className='myself'>작성자</span> : null}
              </div>
            )}
            <div>
              <div className='commentDetail'>
                {comment.deleted ? (
                  <>삭제 된 댓글입니다.</>
                ) : (
                  <>
                    {comment.content}
                    {userData.id === comment.userId ? (
                      <>
                        <BiEdit
                          size='22'
                          onClick={() => setIsModifying({ isModifying: true, modify_commentId: comment.commentId })}
                          className='edit_icon comment_icon'
                        />{" "}
                        <AiTwotoneDelete
                          onClick={() => deleteReply(comment.commentId)}
                          size='22'
                          className='delete_icon comment_icon'
                        />
                      </>
                    ) : null}
                  </>
                )}
              </div>
              <div className='commentDate'>
                {comment.createdDate.substr(0, 10)} {comment.createdDate.substr(11, 5)}
                {comment.createdDate.substr(0, 10) === getFormatDate(new Date()) ? (
                  <MdFiberNew className='new_icon' size='22' />
                ) : null}
                <span onClick={() => reReplyOpen(comment.commentId)} className='reply'>
                  답글쓰기
                </span>
                {isReplying.replying && isReplying.reply_commentId === comment.commentId && (
                  <ReReplyComment
                    comment={comment}
                    isReplying={isReplying}
                    setIsReplying={setIsReplying}
                    reReplyInsert={reReplyInsert}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </li>
      {comment.children &&
        comment.children.map((childComment, idx) => (
          <React.Fragment key={idx}>
            <ChildComments
              writer={writer}
              userData={userData}
              comment={childComment}
              deleteReply={deleteReply}
              reReplyOpen={reReplyOpen}
              isReplying={isReplying}
              setIsReplying={setIsReplying}
              reReplyInsert={reReplyInsert}
              isModifying={isModifying}
              setIsModifying={setIsModifying}
              modifyComment={modifyComment}
            />
          </React.Fragment>
        ))}
    </>
  );
};

export default ParentsComments;
