import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartInfo, removeItem, updateItem } from '../../feature/cartList/cartSlice'
// import { removeItem } from '../../feature/cartList/addCart'
const Cart = () => {
    const { list, status } = useSelector((state) => state.cart)
    const dispatch = useDispatch()


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCartInfo())
        }
    }, [dispatch, status])

    let listinfo = [];
    let listOfSum = {};

    if (list?.data?.length > 0) {
        listinfo = list.data[0].list;
        listOfSum = list.data[0].listofsum;
    }

    const removeProduct = (id) => {
        dispatch(removeItem(id))
    }

    const minusQty = (product_id, qty, cart_id) => {
        const updateQty = parseInt(qty) - 1;
        dispatch(updateItem({ productId: product_id, updateQty, cartId: cart_id }))
    }

    const plusQty = (product_id, qty, cart_id) => {
        const updateQty = parseInt(qty) + 1;
        dispatch(updateItem({ productId: product_id, updateQty, cartId: cart_id }))
    }

    return (
        <>
            <Fragment>
                <div>
                    {/* Single Page Header start */}
                    <div className="container-fluid page-header py-5">
                        <h1 className="text-center text-white display-6">Cart</h1>
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item active text-white">Cart</li>
                        </ol>
                    </div>
                    {/* Single Page Header End */}
                    {/* Cart Page Start */}
                    <div className="container-fluid py-5">
                        <div className="container py-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listinfo.map((productinfo) => (
                                            <tr key={productinfo.cart_id}>
                                                <th scope="row">
                                                    <div className="d-flex align-items-center">
                                                        <img src={productinfo.product_image[0]} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt="" />
                                                    </div>
                                                </th>
                                                <td>
                                                    <p className="mb-0 mt-4">{productinfo.product_name}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4">{productinfo.price} $</p>
                                                </td>
                                                <td>
                                                    <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => minusQty(productinfo.product_id, productinfo.qty, productinfo.
                                                                cart_id)}>
                                                                <i className="fa fa-minus" />
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm text-center border-0" value={productinfo.qty} />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => plusQty(productinfo.product_id, productinfo.qty, productinfo.
                                                                cart_id)}>
                                                                <i className="fa fa-plus" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4">{productinfo.price} $</p>
                                                </td>
                                                <td>
                                                    <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => removeProduct(productinfo.
                                                        cart_id)}>
                                                        <i className="fa fa-times text-danger" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                            <div className="row g-4 justify-content-end">
                                <div className="col-8" />
                                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                                    <div className="bg-light rounded">
                                        <div className="p-4">

                                            <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="mb-0 me-4">Quantity</h5>
                                                <div className>
                                                    <p className="mb-0">{(listOfSum.qty) ? listOfSum.qty : 0}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between ">
                                                <h5 className="mb-0 me-4">Subtotal:</h5>
                                                <p className="mb-0">${(listOfSum.price) ? listOfSum.price : 0}</p>
                                            </div>

                                        </div>
                                        <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                            <h5 className="mb-0 ps-4 me-4">Total</h5>
                                            <p className="mb-0 pe-4">${(listOfSum.price) ? listOfSum.price : 0}</p>
                                        </div>
                                        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cart Page End */}
                </div>

            </Fragment >
        </>
    )
}

export default Cart