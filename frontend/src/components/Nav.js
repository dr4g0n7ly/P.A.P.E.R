import React from 'react'

import './Nav.css'

const Nav = () => {

    async function refresh(e) {
        window.location.replace('/');
    }

    return (
        <>
            <div className="brand">
                <a className="reloadlink" onClick={refresh}>P.A.P.E.R</a>
            </div>
        </>
    )

}

export default Nav;
