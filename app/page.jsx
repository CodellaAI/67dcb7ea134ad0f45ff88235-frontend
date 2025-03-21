
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setStatus(null);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/insert`, {
        timestamp: new Date(),
        message: 'Button clicked!'
      });
      
      setStatus({
        success: true,
        message: 'Data inserted successfully!',
        data: response.data
      });
    } catch (error) {
      console.error('Error inserting data:', error);
      setStatus({
        success: false,
        message: 'Failed to insert data. Please try again.',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Click to Insert App</h1>
        
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Inserting...' : 'Insert Data to MongoDB'}
        </button>
        
        {status && (
          <div className={`mt-6 p-4 rounded-md ${
            status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <p className="font-medium">{status.message}</p>
            {status.success && status.data && (
              <div className="mt-2 text-sm">
                <p>ID: {status.data.id}</p>
                <p>Timestamp: {new Date(status.data.timestamp).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
