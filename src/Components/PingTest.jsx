import { useEffect, useState } from 'react';

const PingTest = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/ping')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error('Error fetching from backend:', err);
        setMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <div className="p-4 text-white bg-gray-800 rounded-xl mt-4">
      <p>Backend says: {message}</p>
    </div>
  );
};

export default PingTest;
