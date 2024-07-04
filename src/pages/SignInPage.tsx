import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { TextField } from '@mui/material';
import './styles/Sign.css';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (email.trim() !== '' && password.trim() !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, password]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/signin', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            console.error('로그인 실패:', error);
            setError('아이디 또는 비밀번호를 잘못 입력했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-container">
            <div className="sign-box">
            <div className="iamstar-title">iamstar</div>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSignIn}>

                    <div className="mb-3">
                        <TextField
                            label="이메일"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: '#737373', fontFamily: 'seoulhangang' }
                            }}
                            InputProps={{
                                style: { color: '#737373', fontFamily: 'seoulhangang' }
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <TextField
                            label="비밀번호"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: '#737373', fontFamily: 'seoulhangang' }
                            }}
                            InputProps={{
                                style: { color: '#737373' }
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-2 rounded text-white ${isLoading || !isFormValid ? 'bg-gray-500' : 'bg-blue-500 active:bg-blue-300'}`}
                        disabled={isLoading || !isFormValid}>
                        로그인
                    </button>
                </form>
                <div className="mt-10 text-center">
                    <span className="text-gray-600">계정이 없으신가요? </span>
                    <Link to="/signup" className="text-blue-500 hover:underline active:text-blue-300">가입하기</Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
