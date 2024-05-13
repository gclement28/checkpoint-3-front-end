// pages/add-country.tsx

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_COUNTRY = gql`
  mutation AddCountry($name: String!, $code: String!, $emoji: String!) {
    addCountry(data: { name: $name, code: $code, emoji: $emoji }) {
      name
      code
      emoji
    }
  }
`;

const AddCountryPage: React.FC = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [emoji, setEmoji] = useState('');

  const [addCountry] = useMutation(ADD_COUNTRY, {
    update(cache, { data: { addCountry } }) {
      cache.modify({
        fields: {
          countries(existingCountries = []) {
            const newCountryRef = cache.writeFragment({
              data: addCountry,
              fragment: gql`
                fragment NewCountry on Country {
                  name
                  code
                  emoji
                }
              `,
            });
            return [...existingCountries, newCountryRef];
          },
        },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCountry({ variables: { name, code, emoji } });
    setName('');
    setCode('');
    setEmoji('');
  };

  return (
    <div className='addCountry'>
      <h1>Add a Country</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'></label>
          <input
            type='text'
            id='name'
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='code'></label>
          <input
            type='text'
            id='code'
            placeholder='Code:'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='emoji'></label>
          <input
            type='text'
            id='emoji'
            placeholder='Emoji'
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            required
          />
        </div>
        <button className='btn' type='submit'>
          Add Country
        </button>
      </form>
    </div>
  );
};

export default AddCountryPage;
