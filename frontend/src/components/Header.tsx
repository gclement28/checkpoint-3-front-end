import Link from 'next/link';

export default function Header() {
  return (
    <header className='header'>
      <Link href='/'>
        <h1>Checkpoint : frontend</h1>
      </Link>
      <Link href='/add-country'>Add country</Link>
    </header>
  );
}
