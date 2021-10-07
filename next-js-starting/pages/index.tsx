import type { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = function () {
  return (
    <div>
      First Page
      <ul>
        <li>
          <Link href="/portfolio">PORTFOLIO</Link>
        </li>
        <li>
          <Link href="/client">CLIENT</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
