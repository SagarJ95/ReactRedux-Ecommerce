import React, { useEffect } from 'react'
import Nav from './nav';

function Headers() {

    return (
        <>
            <div>
                {/* Spinner Start */}
                {/* <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
                    <div className="spinner-grow text-primary" role="status" />
                </div> */}
                {/* Spinner End */}
                {/* Navbar start */}
                <div className="container-fluid fixed-top">
                    <div className="container topbar bg-primary d-none d-lg-block">
                        <div className="d-flex justify-content-between">
                            <div className="top-info ps-2">
                                <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
                                <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>
                            </div>
                            <div className="top-link pe-2">
                                <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                                <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                                <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                            </div>
                        </div>
                    </div>
                    <Nav />
                </div>
                {/* Navbar End */}
            </div>

        </>
    )
}

export default Headers;