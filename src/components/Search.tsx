import { useState } from 'react';
import './styles/Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = () => {
        // 검색 로직을 여기에 추가
        setResults(['user1', 'user2', 'user3']); // 예시 데이터
    };

    return (
        <div className="search">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="사용자 검색"
            />
            <button onClick={handleSearch}>검색</button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
