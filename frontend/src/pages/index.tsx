// pages/index.tsx

import { useQuery, gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query {
    countries {
      name
      emoji
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='countries'>
      <h1>List of Countries</h1>
      <ul>
        {data.countries.map((country: any, index: number) => (
          <li key={index}>
            {country.name} - {country.emoji}
          </li>
        ))}
      </ul>
    </div>
  );
}
