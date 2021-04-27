import Link from 'next/link';

function Tomato() {
  return (
    <div>
      <h2>Link to Main Page</h2>
      <Link href="/">
        <a>Move to /</a>
      </Link>
    </div>
  );
}

export default Tomato;
