import { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { productInfo } from '../../../feature/shopCart/ProductSlice'
import { categoryInfo } from '../../../feature/category/categorySlice'
import { addItem } from '../../../feature/cartList/cartSlice'

const ProductList = () => {
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { items, status } = useSelector((state) => state.products)
    const { list, category_status } = useSelector((state) => state.category)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(productInfo());
            dispatch(categoryInfo());
        }
    }, [dispatch, status]);

    const limitedItems = items.slice(0, 8);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        dispatch(productInfo(categoryId));
    };

    const handleCartData = (productId) => {
        dispatch(addItem(productId));
    }


    // if (status === 'loading') return <p>Loading...</p>
    if (status === 'rejected') return <p>product list failed try again...</p>
    return (
        <>
            <Fragment>
                <div className="container-fluid fruite py-5">
                    <div className="container py-5">
                        <div className="tab-class text-center">
                            <div className="row g-4">
                                <div className="col-lg-4 text-start">
                                    <h1>Our Organic Products</h1>
                                </div>
                                <div className="col-lg-8    text-end">

                                    <div className="mb-3">
                                        <button
                                            className={`btn me-2 ${selectedCategory === null ? "btn-primary" : "btn-outline-primary"}`}
                                            onClick={() => handleCategoryClick(null)}
                                        >
                                            All Products
                                        </button>
                                        {list.map((category) => (
                                            <button
                                                key={category.id}
                                                className={`btn me-2 ${selectedCategory === category.id ? "btn-primary" : "btn-outline-primary"}`}
                                                onClick={() => handleCategoryClick(category.id)}
                                            >
                                                {category.cat_name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content">

                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                {limitedItems.map((product) => (
                                                    <div className="col-md-6 col-lg-4 col-xl-3" key={product.id}>
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className={product.product_images} style={{ height: "300px", overflow: "hidden" }}>
                                                                <img src={product.product_images} className="img-fluid w-100 rounded-top" alt="" style={{
                                                                    width: "200px",
                                                                    height: "270px",
                                                                    objectFit: "cover",

                                                                }} />
                                                            </div>
                                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>{product.category_name}</div>
                                                            <div className="text-white  rounded position-absolute" style={{ top: 10, left: 250 }}><img src={product.country_flag} className="img-fluid w-100 rounded-top" alt="" style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                objectFit: "cover",

                                                            }} /></div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h4>{product.product_name}</h4>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                                                                    <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => handleCartData(product.id)}><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </>
    )
}

export default ProductList