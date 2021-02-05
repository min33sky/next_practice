import axios from 'axios';
import React from 'react';

export default function name({ user, time }) {
  const username = user?.name;
  return (
    <div>
      {username}
      {time}
    </div>
  );
}

/**
 * getServerSideProps와 달리 query 대신 params를 사용한다.
 * getStaticPaths를 이용해서 params를 미리 지정해야 한다.
 */
export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`https://api.github.com/users/${params.name}`);

    if (res.status === 200) {
      const user = await res.data;
      return {
        props: {
          user,
          time: new Date().toISOString(),
        },
      };
    }

    return {
      props: {
        time: new Date().toISOString(),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        time: new Date().toISOString(),
      },
    };
  }
}

// 페이지의 경로가 외부 데이터에 의존할 때 사용
export async function getStaticPaths() {
  return {
    paths: [{ params: { name: 'jerrynim' } }],
    fallback: true, // 지정되지 않은 경로는 404 에러 페이지로 라우팅
  };
}
