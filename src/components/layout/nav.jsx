import { Fragment, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartInfo } from '../../feature/cartList/cartSlice'

const Nav = () => {
    const { list, status } = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCartInfo())
        }

    }, [dispatch, status])

    let listinfo = [];

    if (list?.data?.length > 0) {
        listinfo = list.data[0].list;
    }
    return (
        <>
            <Fragment>
                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></a>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary" />
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <NavLink className={({ isActive }) => isActive ? 'nav-item nav-link custom_active' : 'nav-item nav-link'} to="/">Home</NavLink>
                                <NavLink to="/shop" className={({ isActive }) => isActive ? 'nav-item nav-link custom_active' : 'nav-item nav-link'}>Shop</NavLink>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item nav-link custom_active' : 'nav-item nav-link'}>Contact</NavLink>

                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button>
                                <NavLink to="/cart" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x" />
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}>{(listinfo.length == 0) ? 0 : listinfo.length}</span>
                                </NavLink>
                                <NavLink to="/login" className="my-auto">
                                    <i className="fas fa-user fa-2x" />
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </div>
            </Fragment>
        </>
    )
}

export default Nav