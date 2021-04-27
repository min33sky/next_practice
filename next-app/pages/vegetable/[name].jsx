import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function name() {
  const { query } = useRouter();

  return (
    <div>
      <h2>Hello!! {query.name}</h2>
      <Link href="/">Mote to '/'</Link>
    </div>
  );
}
