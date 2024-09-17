import { auth } from '@/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FormEvent, useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email);
    setMessage('Check your mail inbox');
    setEmail('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center gap-5">
      {message ? (
        <div className="bg-emerald-300 text-emerald-600 rounded-lg p-3">
          {message}
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-2xl">Reset Password</h1>
          <form onSubmit={formSubmit}>
            <input
              required
              className="p-1 text-black rounded-lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="ml-1  px-3 py-1 bg-blue-500 text-white hover:bg-blue-400 duration-150 inline-block mx-auto">
              Send Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
