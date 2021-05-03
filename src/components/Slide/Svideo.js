import React from 'react';
import './Evideo.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';

const Svideo = () => {
  const settings = {
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow></PrevArrow>,
    nextArrow: <NextArrow></NextArrow>,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    draggable: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment className='SvideoWrapper'>
      <Slider {...settings}>
        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum1.png' alt='' />
                <div className='item-title'>
                  <h2>
                    김보민 <span>편집자</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    넷프릭스 편집 경력, 밀리터리, 드라마 용어 완벽 섭렵
                    김보민입니다. 저는 초밥을 좋아합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum2.png' alt='' />
                <div className='item-title'>
                  <h2>
                    김진섭<span>월 500만원</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    더미텍스트를 찾아보려 했는데 영어밖에 없어서 화가 난
                    더미텍스트??? 얘는 또 뭔 버그에 걸려있어
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum3.png' alt='' />
                <div className='item-title'>
                  <h2>
                    김냠냠 <span>건 20만원</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    그림을 매우 잘 그리는 썸네일러 김냠냠입니다. 여기는 본인이
                    직접 입력해서 3줄 정도로 들어갈 콘텐츠입니다. 3줄이 넘어가면
                    ... 처리를 합니다. 오늘 쌀국수 먹었었는데 너무 비쌌어요
                    상처를 치료해줄 사람 어디 없나 헤마다가 혼자서 덧나 365일
                    1년 내내 내 영혼의 키를 잡은 잭스패로우
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum4.png' alt='' />
                <div className='item-title'>
                  <h2>
                    서연호 <span>편집자</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    문도 e스킬이 잭스 e스킬에 막히기 때문에 보통 상성상 문도가
                    불리합니다. 멀리서 식칼 파밍만 해야합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum5.png' />
                <div className='item-title'>
                  <h2>
                    유종현 <span>편집자</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>2페이지의 한줄만 보여드리는 예제입니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum6.png' alt='' />
                <div className='item-title'>
                  <h2>
                    박옥자<span>편집자</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>이거 또 한줄만 가면 이러는거야?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum7.png' alt='' />
                <div className='item-title'>
                  <h2>
                    최재연 <span>편집자</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    그림을 매우 잘 그리는 썸네일러 김냠냠입니다. 여기는 본인이
                    직접 입력해서 3줄 정도로 들어갈 콘텐츠입니다. 3줄이 넘어가면
                    ... 처리를 합니다. 오늘 쌀국수 먹었었는데 너무 비쌌어요
                    상처를 치료해줄 사람 어디 없나 헤마다가 혼자서 덧나 365일
                    1년 내내 내 영혼의 키를 잡은 잭스패로우
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum8.png' alt='' />
                <div className='item-title'>
                  <h2>
                    윤종민<span>편집자</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    문도 e스킬이 잭스 e스킬에 막히기 때문에 보통 상성상 문도가
                    불리합니다. 멀리서 식칼 파밍만 해야합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum9.png' alt='' />
                <div className='item-title'>
                  <h2>
                    석현일 <span>분 50만</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    넷프릭스 편집 경력, 밀리터리, 드라마 용어 완벽 섭렵
                    김보민입니다. 저는 초밥을 좋아합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum10.png' />
                <div className='item-title'>
                  <h2>
                    토레타<span>건 200만</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    더미텍스트를 찾아보려 했는데 영어밖에 없어서 화가 난
                    더미텍스트??? 얘는 또 뭔 버그에 걸려있어
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum11.png' alt='' />
                <div className='item-title'>
                  <h2>
                    리액트<span>월 1천만</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    그림을 매우 잘 그리는 썸네일러 김냠냠입니다. 여기는 본인이
                    직접 입력해서 3줄 정도로 들어갈 콘텐츠입니다. 3줄이 넘어가면
                    ... 처리를 합니다. 오늘 쌀국수 먹었었는데 너무 비쌌어요
                    상처를 치료해줄 사람 어디 없나 헤마다가 혼자서 덧나 365일
                    1년 내내 내 영혼의 키를 잡은 잭스패로우
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='thumbnails'>
            <div className='thumbnails-item'>
              <div className='item item_red'>
                <img src='/img/board_pic/thumbnailer_pic/thum12.png' />
                <div className='item-title'>
                  <h2>
                    Alice<span>Editor</span>
                  </h2>
                </div>
                <div className='item-content'>
                  <p>
                    Delivery was quick....and I bought the CD for the music and
                    yes the music is as expected, HOWEVER, the description of
                    the CD did NOT state that it is either an Asian Master
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </React.Fragment>
  );
};

export default Svideo;
