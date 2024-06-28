import { Link } from 'react-router-dom';

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
        <nav className="fixed top-0 left-0 h-full w-60 border-r border-gray-200 flex flex-col items-center justify-center space-y-10 shadow-lg font-seoulhangang">
            <div className="fixed top-10 items-center">
                <span className="text-2xl font-bold font-charmonman">iamstar</span>
            </div>

            <ul className="space-y-11">
                {navItems.map((item) => (
                    <li key={item.name} className="flex items-center space-x-4">
                        <img className="object-cover h-5 w-5 relative -top-0.5" src={item.src} alt={item.name} />
                        <Link
                            to={item.path}
                            className="text-black hover:text-blue-600">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default LeftNavBar;
