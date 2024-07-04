import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { TextField } from '@mui/material';
import './styles/Sign.css';

interface SignUpResponse {
    username: string;
}

const SignUpPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsFormValid(email.trim() !== '' && password.trim() !== '' && username.trim() !== '' && fullName.trim() !== '');
    }, [email, password, username, fullName]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // 회원가입 요청
            const signUpResponse = await api.post<SignUpResponse>('/signup', {
                email,
                password,
                username,
                fullName,
            });
            console.log(`SignUpResponse: ${JSON.stringify(signUpResponse.data)}`);
            
            alert(`회원가입에 성공했습니다. ${signUpResponse.data.username}님, 환영합니다!`);
            navigate('/signin'); // 로그인 페이지로 이동
        } catch (error) {
            console.error('회원가입 실패:', error);
            setError('회원가입에 실패했습니다. 입력한 정보를 확인하세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-container">
            <div className="sign-box">
                <div className="iamstar-title">iamstar</div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSignUp}>
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
                    <div className="mb-3">
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
                    <div className="mb-3">
                        <TextField
                            label="사용자 이름"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="mb-3">
                        <TextField
                            label="성명"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
                    <button
                        type="submit"
                        className={`w-full p-2 rounded text-white ${isLoading || !isFormValid ? 'bg-gray-500' : 'bg-blue-500 active:bg-blue-300'}`}
                        disabled={isLoading || !isFormValid}>
                        회원가입
                    </button>
                </form>
                <div className="mt-10 text-center">
                    <span className="text-gray-600">이미 계정이 있으신가요? </span>
                    <Link to="/signin" className="text-blue-500 hover:underline active:text-blue-300">로그인하기</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
