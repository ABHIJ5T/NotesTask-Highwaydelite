import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }
        try {
            await api.post('/auth/register', { name, email, password });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
                <div className="p-6">
                    <img src="/assets/top.png" alt="" className="w-12 h-12 mb-4" />
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Create account</h1>
                    <p className="text-gray-600 mb-6">Let's get you set up.</p>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Full name</label>
                            <input value={name} onChange={e => setName(e.target.value)} className="input" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="Create a strong password" />
                        </div>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        <button className="btn btn-primary w-full h-11">Create account</button>
                    </form>
                    <p className="mt-4 text-sm">Already have an account? <Link className="text-[var(--primary)]" to="/login">Sign in</Link></p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                    <img src="/assets/right-column.png" alt="decor" className="rounded-2xl w-full" />
                </div>
            </div>
        </div>
    );
}
