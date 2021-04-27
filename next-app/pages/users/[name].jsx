import axios from 'axios';
import css from 'styled-jsx/css';
import Profile from '../../components/Profile';
import Repositories from '../../components/Repositories';

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }
`;

const Name = ({ user, repos }) => (
  <div className="user-contents-wrapper">
    <Profile user={user} />
    <Repositories user={user} repos={repos} />
    <style jsx>{style}</style>
  </div>
);

// ? 다시 호출하려면 페이지 이동을 통해 페이지를 다시 불러와야한다.
export const getServerSideProps = async ({ query }) => {
  const { name, page } = query;

  console.log('name, page: ', name, page);

  try {
    let user;
    let repos;

    const userRes = await axios.get(`https://api.github.com/users/${name}`);

    if (userRes.status === 200) {
      user = await userRes.data;
    }

    const repoRes = await axios.get(
      `https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`
    );

    if (repoRes.status === 200) {
      repos = await repoRes.data;
    }

    return {
      props: {
        user,
        repos,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
};

export default Name;
