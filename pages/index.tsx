import type { NextPage } from 'next'
import { io } from 'socket.io-client';
import Example from '@/components/example';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { decrement, increment } from '@/store/counter';
import axios from '@/utils/axios';
import { useEffect } from 'react';

const Home: NextPage = () => {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch();

  const socket = io({
    transports: ['websocket', 'polling']
  });
  socket.emit("hello", "world");

  useEffect(() => {
    axios.get('https://no-disposable.email/check/sharklasers.com').then(console.log);
  }, [])
  
  return (
    <>
      <Example />
      <h1>Redux</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </>
  )
}

export default Home
