import React, { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

const AdminStats = ({ allStats }) => {
  const signedUpData = useMemo(
    () => ({
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
        {
          label: "최근 일주일 안에 가입한 회원 수",
          data: allStats && allStats.signedUp,
          lineTension: 0,
          backgroundColor: "#ffd400",
          borderWidth: 1,
          borderColor: "#ffd400",
        },
      ],
    }),
    [allStats]
  );

  const visitorsData = useMemo(
    () => ({
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
        {
          label: "최근 일주일 동안의 방문자수",
          data: allStats && allStats.visitors,
          lineTension: 0,
          backgroundColor: "#ffd400",
          borderWidth: 1,
          borderColor: "#ffd400",
        },
      ],
    }),
    [allStats]
  );
  const boardData = useMemo(
    () => ({
      labels: [
        "유튜브 공고",
        "편집자 포트폴리오",
        "썸네일러 포트폴리오",
        "윈윈 게시판",
        "합방 게시판",
        "건의 게시판",
        "자유 게시판",
        "신고 게시판",
        "공지",
        "고객지원",
      ],
      datasets: [
        {
          data: allStats && allStats.totalBoards,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#7FFFD4",
            "#A52A2A",
            "#0000FF",
            "#000000",
            "#8B008B",
            "#00BFFF",
            "#CD5C5C",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#7FFFD4",
            "#A52A2A",
            "#0000FF",
            "#000000",
            "#8B008B",
            "#00BFFF",
            "#CD5C5C",
          ],
        },
      ],
    }),
    [allStats]
  );
  // const optForBoard = {
  //   responsive: false,
  // };
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "날짜",
              fontFamily: "Montserrat",
              fontColor: "black",
            },
            ticks: {
              maxTicksLimit: 20,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "유저수",
              fontFamily: "Montserrat",
              fontColor: "black",
            },
            ticks: {
              beginAtZero: true,
              stepSize: 20,
              min: 0,
              max: 100,
            },
          },
        ],
      },
    }),
    []
  );
  const legend = useMemo(
    () => ({
      display: true,
      labels: {
        fontColor: "black",
      },
      position: "top",
    }),
    []
  );
  return (
    <div className='admin_board'>
      <h1>유자 통계</h1>
      <div>
        <Bar data={visitorsData} legend={legend} options={options} />
      </div>
      <div>
        <Bar data={signedUpData} legend={legend} options={options} />
      </div>
      <div>
        <h2>모든 게시글 현황</h2>
        <Doughnut data={boardData} />
      </div>
    </div>
  );
};

export default AdminStats;
