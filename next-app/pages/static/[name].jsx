import axios from 'axios';

const Name = ({ user, time }) => {
  const username = user && user.name;
  return (
    <div>
      {username}
      {time}
    </div>
  );
};

/**
 * getStaticProps에서는 query 대신 params를 사용한다.
 * 그리고 getStaticPaths를 이용하여 params를 미리 지정해야 한다.
 */
export const getStaticProps = async ({ params }) => {
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
  } catch (error) {
    console.error(error);
    return {
      props: {
        time: new Date().toISOString(),
      },
    };
  }
};

/**
 * 페이지의 경로가 외부 데이터에 의존할 때 사용
 * fallback값은 지정한 경로 외의 경로에 대해 설정 (false라면 이외의 경로는 404 에러페이지로 이동)
 */
export async function getStaticPaths() {
  return {
    paths: [{ params: { name: 'min33sky' } }],
    fallback: true,
  };
}

export default Name;
