import { useState } from 'react';
import './styles/SearchPage.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = () => {
        // 검색 로직 추가
        setResults(['user1', 'user2', 'user3']);
    };

    return (
        <div className="search-page">
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

export default SearchPage;
