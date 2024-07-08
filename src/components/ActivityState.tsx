import React from 'react';
import Switch from '@mui/material/Switch';

const ActivityState = () => {
    const [online, setOnline] = React.useState(true);

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnline(event.target.checked);
    };

    return (
        <div className="fixed flex flex-col items-center justify-center space-y-10 top-0 right-0 h-full w-60 border-l border-gray-200 shadow-lg font-seoulhangang">
            <div className="flex items-center justify-between mb-4">
                <span className="text-xl">현재 활동 중</span>
                <Switch checked={online} onChange={handleStatusChange} />
            </div>
            <div>
                <h2 className="font-bold mb-2">친구들</h2>
                <ul>
                    <li className="flex items-center mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>friend1</span>
                    </li>
                    <li className="flex items-center mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>friend2</span>
                    </li>
                    <li className="flex items-center mb-2">
                        <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                        <span>friend3</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ActivityState;
