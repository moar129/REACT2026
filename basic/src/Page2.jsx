import React from 'react'
import { Link } from 'react-router-dom';

const Page2 = () => (
    <div>
        <h1>Page2 for React-Router Basic!</h1>
        <Link to='/page3'>Page3</Link><br></br>
        <Link to='/page4/hej'>Page4</Link>
    </div>
)

export default Page2