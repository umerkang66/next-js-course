import type { NextPage } from 'next';
import Link from 'next/link';

/* Link tag automatically fetches the data of the page, we are to navigate to once we hover over the link */

const Home: NextPage = () => {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
