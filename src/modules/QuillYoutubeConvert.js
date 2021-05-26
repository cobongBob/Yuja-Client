export const changeYoutubeUrlToIframe = (url) => {
  const match =
    url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
    url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/) ||
    url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?showinfo=0`;
  }
  return false;
};

export const findYoutubeUrl = (text) => {
  const reg = new RegExp(`https://www.youtube.com/watch\\?v=[a-zA-Z0-9_-]{11}`, "gi");
  const a = text.match(reg);
  if (a) {
    const emebedUrl = `https://www.youtube.com/embed/${a[0].substr(-11)}?showinfo=0`;
    const iframeYoutube = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${emebedUrl}"></iframe><p><br></p>`;
    return text.replace(reg, iframeYoutube);
  } else {
    return text;
  }
};
