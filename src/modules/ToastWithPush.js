export const toastWithPush = (txt, history) => (
  <>
    {txt}
    <button onClick={() => pushToPage(history)}>글 보러가기</button>
  </>
);

const pushToPage = (history) => {
  alert("구현중");
  console.log(123123, history);
};
