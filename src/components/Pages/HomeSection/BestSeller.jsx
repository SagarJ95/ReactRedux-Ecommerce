import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { productInfo } from "../../../feature/shopCart/ProductSlice";
const BestSeller = () => {
    const { items, status } = useSelector((state) => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status == 'idle') {
            dispatch(productInfo())
        }

    }, [dispatch, status])

    const best_seller = items.slice(1, 7)
    const bestlistinfo = items.slice(8, 12);
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
                                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
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
                                                <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        </>
    )
}

export default BestSeller;