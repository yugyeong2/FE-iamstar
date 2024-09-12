import { Link } from 'react-router-dom';
import './styles/LeftNavBar.css';

const navItems = [
    { name: '홈', path: '/', src: 'image/home.png' },
    { name: '검색', path: '/search', src: 'image/search.png' },
    { name: '탐색 탭', path: '/explore', src: 'image/compass.png' },
    { name: '메시지', path: '/messages', src: 'image/chat.png' },
    { name: '만들기', path: '/create', src: 'image/plus.png' },
    { name: '저장', path: '/collection', src: 'image/bookmark.png' },
];

const LeftNavBar = () => {
    return (
        <nav className="left-navbar">
            <div className="logo-container">
                <span className="logo-text">iamstar</span>
            </div>

            <ul className="nav-list">
                {navItems.map((item) => (
                    <li key={item.name} className="nav-item">
                        <Link to={item.path} className="nav-link">
                            <img className="nav-icon" src={item.src} alt={item.name} />
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default LeftNavBar;