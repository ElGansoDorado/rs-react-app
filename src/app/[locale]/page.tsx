import { redirect } from 'next/navigation';

function Home() {
  redirect('/pokedex');
}

export default Home;
