const StaticPage = ({ time }) => <div>{time}</div>;

export const getStaticProps = async () => ({
  props: {
    time: new Date().toISOString(),
  },
  revalidate: 3,
});

export default StaticPage;
