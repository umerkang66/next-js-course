import type { NextPage } from 'next';
import Link from 'next/link';

const users = [
  {
    id: 'umer',
    name: 'Umer Kang',
  },
  {
    id: 'kang',
    name: 'Kang Kang',
  },
];

const ClientPage: NextPage = () => {
  return (
    <div>
      This is Client Page
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <Link
                passHref
                href={{
                  pathname: '/client/[id]',
                  query: { id: user.id },
                }}
              >
                <a>
                  <h1>{user.name}</h1>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientPage;
