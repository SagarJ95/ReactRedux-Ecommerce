import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { productInfo } from "../../../feature/shopCart/ProductSlice";
import { addItem } from '../../../feature/cartList/cartSlice'
import { updateItem } from '../../../feature/cartList/cartSlice'

const BestSeller = () => {
    const { items, status } = useSelector((state) => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status == 'idle') {
            dispatch(productInfo({ categoryId: null, page: 1 }))
        }

    }, [dispatch, status])

    const best_seller = items?.data?.length > 0 ? items.data.slice(1, 7) : [];
    const bestlistinfo = items?.data?.length > 0 ? items.data.slice(8, 12) : [];

    const minusQty = (product_id, qty, cart_id) => {
        const updateQty = parseInt(qty) - 1;
        dispatch(updateItem({ productId: product_id, updateQty, cartId: cart_id }))
    }

    const plusQty = (product_id, qty, cart_id) => {
        const updateQty = parseInt(qty) + 1;
        dispatch(updateItem({ productId: product_id, updateQty, cartId: cart_id }))
    }

    const handleCartData = (productId) => {
        dispatch(addItem({ productId: productId }));
    }

    return (
        <>
            <Fragment>
                <div className="container-fluid py-5">
                    <div className="container py-5">
                        <div className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
                            <h1 className="display-4">Bestseller Products</h1>
                            <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
                        </div>
                        <div className="row g-4">
                            {
                                best_seller.map((product) => (
                                    <div className="col-lg-6 col-xl-4" key={product.id}>
                                        <div className="p-4 rounded bg-light">
                                            <div className="row align-items-center">
                                                <div className="col-6">
                                                    <img src={product.product_images} style={{ width: "150px", height: "150px" }} className="img-fluid rounded-circle w-100" alt={product.product_name} />
                                                </div>
                                                <div className="col-6">
                                                    <a href="#" className="h5">{product.product_name}</a>
                                                    <h4 className="mb-3">{product.price} $</h4>
                                                    {(product.cart_qty > 0) ? (

                                                        < div className="input-group quantity mt-4" style={{ width: 100, marginLeft: "25%" }}>
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => minusQty(product.id, product.cart_qty, product.
                                                                    cart_id)}>
                                                                    <i className="fa fa-minus" />
                                                                </button>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm text-center border-0" value={product.cart_qty} />
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => plusQty(product.id, product.cart_qty, product.
                                                                    cart_id)}>
                                                                    <i className="fa fa-plus" />
                                                                </button>
                                                            </div>
                                                        </div>)
                                                        : (<a className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => handleCartData(product.id)}><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>)
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            {
                                bestlistinfo.map((pro) => (
                                    <div className="col-md-6 col-lg-6 col-xl-3" key={pro.id}>
                                        <div className="text-center">
                                            <img src={pro.product_images} style={{ width: "390px", height: "390px" }} className="img-fluid rounded" alt={pro.product_name} />
                                            <div className="py-4">
                                                <a href="#" className="h5">{pro.product_name}</a>
                                                <h4 className="mb-3">3.12 $</h4>
                                                {(pro.cart_qty > 0) ? (

                                                    < div className="input-group quantity mt-4 ml-5" style={{ width: 100, marginLeft: "37%" }}>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => minusQty(pro.id, pro.cart_qty, pro.
                                                                cart_id)}>
                                                                <i className="fa fa-minus" />
                                                            </button>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm text-center border-0" value={pro.cart_qty} />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => plusQty(pro.id, pro.cart_qty, pro.
                                                                cart_id)}>
                                                                <i className="fa fa-plus" />
                                                            </button>
                                                        </div>
                                                    </div>)
                                                    : (<a className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => handleCartData(pro.id)}><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>)
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Fragment >
        </>
    )
}

export default BestSeller;