import React from 'react';
import { useParams } from 'react-router-dom';

const Page4 = () => {
    const { id } = useParams()
    return (
        <div>
            <h1>Page4</h1>
            <h4>Id: {id} (passed as route params) </h4>
        </div>
    )
}

export default Page4