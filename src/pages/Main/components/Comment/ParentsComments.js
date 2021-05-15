import React from "react";
import { MdFiberNew } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import ChildComments from "./ChildComment";
import getFormatDate from "../../../../getFormatDate";

const ParentsComments = ({ writer, userData, comment, index, deleteReply }) => {
  return (
    <>
      <li key={index} className='parentComment'>
        <div className='commentUser'>
          {comment.deleted ? (
            <></>
          ) : (
            <>
              {comment.nickname}
              {writer === comment.userId ? <span className='myself'>작성자</span> : null}
            </>
          )}
        </div>
        <div>
          <div className='commentDetail'>
            {comment.deleted ? (
              <>삭제 된 댓글입니다.</>
            ) : (
              <>
                {comment.content}
                {userData.id === comment.userId ? (
                  <>
                    <BiEdit size='22' className='edit_icon comment_icon' />{" "}
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
            <span className='reply'>답글쓰기</span>
          </div>
        </div>
      </li>
      {comment.children &&
        comment.children.map((childComment, idx) => (
          <ChildComments
            writer={writer}
            userData={userData}
            comment={childComment}
            key={idx}
            deleteReply={deleteReply}
          />
        ))}
    </>
  );
};

export default ParentsComments;
