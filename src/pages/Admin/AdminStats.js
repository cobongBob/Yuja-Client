import React, { useRef, useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart} from "chart.js";
import "./AdminStats.scss";

const AdminStats = ({ allStats }) => {
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
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#7FFFD4",
            "#A52A2A",
            "#0000FF",
            "#000000",
          ],
        },
      ],
    }),
    [allStats]
  );

  const totalBoards = allStats.totalBoards.reduce((a,b) => a+b,0);
  const totalVisitors = allStats.visitors.reduce((a,b) => a+b,0);
  const totalRegistered = allStats.signedUp.reduce((a,b) => a+b, 0);

  console.log(allStats);

  const signedUpCanvas = useRef(null);
  useEffect(() => {
    const signedUpDOM = signedUpCanvas.current.getContext("2d");

    new Chart(signedUpDOM, {
      type: "bar",
      data:{
        labels: allStats.last7Days,
        datasets: [{
            label: "해당 날짜 가입자 수",
            data: allStats && allStats.signedUp,
            backgroundColor: "#ffd400",
            borderWidth: 1,
            borderColor: "#ffd400",
          }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: {
            min: 0,
            max: Math.max.apply(null, allStats.signedUp)+Math.ceil(Math.max.apply(null, allStats.signedUp)*0.1)
          }
        }
    }
    });
  }, [allStats]);

  const visitorCanvas = useRef(null);
  useEffect(() => {
    const visitorDOM = visitorCanvas.current.getContext("2d");

    new Chart(visitorDOM, {
      type: "bar",
      data:{
        labels: allStats.last7Days,
        datasets: [{
            label: "해당 날짜 방문자 수",
            data: allStats && allStats.visitors,
            backgroundColor: "#ffd400",
            borderWidth: 1,
            borderColor: "#ffd400",
          }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: {
                suggestedMin: 0,
                suggestedMax: Math.max.apply(null, allStats.visitors)+Math.ceil(Math.max.apply(null, allStats.visitors)*0.1),
              }
            },
    }
    });
  }, [allStats]);

  const userIncCanvas = useRef(null);
  useEffect(() => {
    const userIncDom = userIncCanvas.current.getContext("2d");

    new Chart(userIncDom, {
      type: "line",
      data: {
        labels: allStats.allDates,
        datasets: [{
          label: "해당 날짜 유자 이용자",
          data: allStats && allStats.userInc,
          backgroundColor: "#ffd400",
          borderWidth: 1,
          borderColor: "#ffd400",
        }] 
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: Math.max.apply(null, allStats.userInc)+Math.ceil(Math.max.apply(null, allStats.userInc)*0.1)
            }
        }
    }
    });
  }, [allStats]);
  return (
    <div className='admin_board'>
      <h1>유자 통계</h1>
      <div id="firstTwoChartsWrap">
        <h2 id="last7">최근 7일 통계</h2>
        <div className="chart1">
          <h2>방문자 수 : {totalVisitors}</h2>
          <canvas ref={visitorCanvas}></canvas>
        </div>
        <div className="chart2">
          <h2>회원 가입한 유저 수 : {totalRegistered}</h2>
          <canvas ref={signedUpCanvas}></canvas>
        </div>
      </div>
      <div id="secondTwoChartsWrap">
        <h2 id="cumul">누적 통계</h2>
        <div className="chart3">
          <h2>게시글 : {totalBoards} 개</h2>
          <Doughnut data={boardData} />
        </div>
        <div className="chart4">
          <h2>출시 이후 유저 증감</h2>
          <canvas ref={userIncCanvas}></canvas>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
