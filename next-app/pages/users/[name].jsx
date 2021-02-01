import axios from "axios";
import css from "styled-jsx/css";
import Profile from "../../components/Profile";
import Repositories from "../../components/Repositories";

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }
`;

export default function name({ user, repos }) {
  if (!user) return null;

  return (
    <div className="user-contents-wrapper">
      <Profile user={user} />
      <Repositories user={user} repos={repos} />
      <style jsx>{style}</style>
    </div>
  );
}

//! 새로고침으로는 재호출이 안되고 페이지를 이동해야 호출이 된다
export async function getServerSideProps({ query }) {
  const { name, page } = query;
  try {
    let user;
    let repos;

    const res = await axios.get(`https://api.github.com/users/${name}`);
    // 유저가 있는지 확인
    if (res.status === 200) {
      user = await res.data;
    }
    const repoRes = await axios.get(
      `https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`
    );
    if (repoRes.status === 200) {
      repos = await repoRes.data;
    }
    console.log(repos);
    return {
      props: { user, repos },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
}

//  ! next 9.3 이전 서버사이드 랜더링 방식
// name.getInitialProps = async ({ query }) => {
//   const { name } = query;
//   try {
//     const res = await axios.get(`https://api.github.com/user/${name}`);
//     if (res.status === 200) {
//       const user = await res.data;
//       return {
//         props: {
//           user,
//         },
//       };
//     }
//     return {
//       props: {},
//     };
//   } catch (e) {
//     console.log(e);
//     return {};
//   }
// };
