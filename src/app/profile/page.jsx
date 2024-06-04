"use client";

import { useState } from "react";

const column = [
    { id: 'id', label: 'id' },
    { id: 'gender', label: 'gender' },
    { id: 'first_name', label: 'frist name' },
    { id: 'last_name', label: 'last fname' },
];

function Profile() {
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState('');
    const [value, setValue] = useState({});

    const handleChange = (e) => {
        setParams({ ...params, [e.target.id]: e.target.value });
    };

    const fecthDataApi = async () => {
        try {
            setLoading(true);
            let url = params.query ? `?${params.query}=${params.value}` : '';
            const response = await fetch(`/api/users${url}`, {
                headers: {
                    Accept: "appliaction/json",
                    methode: "GET"
                },
            });

            if (response.ok) {
                const data = await response.json();
                setValue({ ...value, data: data.data });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full grid place-items-center">
            <div>
                <div className="w-full flex p-2">
                    <div className="w-full p-2">
                        <p>param</p>
                        <input id="query" value={params?.query || ''} onChange={handleChange} className="w-full text-black" />
                    </div>
                    <div className="w-full p-2">
                        <p>value</p>
                        <input id="value" value={params?.value || ''} onChange={handleChange} className="w-full text-black" />
                    </div>
                </div>
                <button onClick={fecthDataApi} className="p-3 bg-gray-50 text-slate-950">call api</button>
            </div>
            <table>
                <thead>
                    <tr>
                        {column.map((col, idx) => (
                            <td key={idx} className="p-2">{col.label}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {value.data ? value.data.map((list, idx) => (
                        <tr key={idx}>
                            {column.map((col, idxCol) => (
                                <td key={idxCol} className="p-2">
                                    {col.id === "id" && list.id}
                                    {col.id === "gender" && list.gender}
                                    {col.id === "first_name" && list.first_name}
                                    {col.id === "last_name" && list.last_name}
                                </td>
                            ))}
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    );
}

export default Profile;