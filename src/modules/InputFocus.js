/**
 * 인풋이 제대로 들어갔는지 확인한후 없으면 focus 시킨다.
 * @param {*} inputs 해당게시글의 inputData Json형태
 * @param {*} refs 순서는
 * [titleRef, channelNameRef, recruitingNumRef, payTypeRef, payAmountRef, managerRef, receptionMethodRef, workerRef]
 * @returns boolean
 */
export const isNotFilled = (inputs, refs) => {
  for (const input in inputs) {
    if (!inputs[input]) {
      if (input === "title") {
        refs[0] && refs[0].current.focus();
        return false;
      } else if (input === "channelName") {
        refs[1] && refs[1].current.focus();
        return false;
      } else if (input === "recruitingNum") {
        refs[2] && refs[2].current.focus();
        return false;
      } else if (input === "payType") {
        refs[3] && refs[3].current.focus();
        return false;
      } else if (input === "payAmount") {
        refs[4] && refs[4].current.focus();
        return false;
      } else if (input === "manager") {
        refs[7] && refs[7].current.focus();
        refs[5] && refs[5].current.focus();
        return false;
      } else if (input === "receptionMethod") {
        refs[7] && refs[7].current.focus();
        refs[6] && refs[6].current.focus();
        return false;
      }
    }
  }
  return true;
};
