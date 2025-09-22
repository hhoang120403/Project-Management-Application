import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-4'>
      <Link to='/sign-in'>
        <Button className='bg-blue-500 text-white'>Login</Button>
      </Link>
      <Link to='/sign-up'>
        <Button variant='outline' className='bg-blue-500 text-white'>
          Sign Up
        </Button>
      </Link>
    </div>
  );
};
export default Home;
