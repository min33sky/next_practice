import React from "react";

export default function staticPage({ time }) {
  return <div>{time}</div>;
}

// 빌드 시에 데이터를 불러와 결과를 json으로 저장하여 사용
export async function getStaticProps() {
  return {
    props: {
      time: new Date().toISOString(),
    },
    revalidate: 3, // 3초마다 데이터 갱신해서 제공
  };
}
