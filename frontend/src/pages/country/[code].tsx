// pages/country/[code].tsx

import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export default function CountryDetails() {
  const router = useRouter();
  const { code } = router.query;

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country;

  return (
    <div>
      <h1>
        {country.name} - {country.emoji}
      </h1>
      <p>Code: {country.code}</p>
      {country.continent && <p>Continent: {country.continent.name}</p>}
    </div>
  );
}
