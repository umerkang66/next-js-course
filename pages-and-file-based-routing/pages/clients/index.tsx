import type { NextPage } from 'next';
import Link from 'next/link';

const ClientsPage: NextPage = () => {
  const clients = [
    { id: 'max', name: 'Maximilian' },
    { id: 'umer', name: 'Umer' },
    { id: 'jonas', name: 'Jonas' },
    { id: 'stephen', name: 'Stephen' },
    { id: 'andrei', name: 'Andrei' },
  ];

  return (
    <div>
      <h1>This is a Clients Page that contains multiple clients</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <h3>
              {/* <Link href={`/clients/${client.id}`}>{client.name}</Link> */}
              {/* Another syntax of Link */}
              <Link
                href={{
                  // We have to provide the pathname as the defining the route in the pages folder
                  pathname: '/clients/[id]',
                  // We have to set the "id" property in the query, because we have set that "id" in the upper pathname property
                  query: { id: client.id },
                }}
              >
                {client.name}
              </Link>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
