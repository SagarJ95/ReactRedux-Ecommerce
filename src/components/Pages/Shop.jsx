import { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { productInfo } from '../../feature/shopCart/ProductSlice'
import { categoryInfo } from '../../feature/category/categorySlice'
import { addItem } from '../../feature/cartList/cartSlice'
import { fetchCartInfo, removeItem, updateItem } from '../../feature/cartList/cartSlice'
const Shop = () => {

    const { items, status } = useSelector((store) => store.products)
    const { list, category_status } = useSelector((state) => state.category)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productInfo({ categoryId: null, page: page, sort_by_price: "low_to_high" }))
        dispatch(categoryInfo())
    }, [dispatch, page])

    const [selectedCategories, setSelectedCategories] = useState([]);
    const selectCategory = (e) => {
        const { value, checked } = e.target;
        let updatedCategories;
        if (checked) {
            updatedCategories = [...selectedCategories, value];
        } else {
            updatedCategories = selectedCategories.filter((id) => id !== value);
        }
        setSelectedCategories(updatedCategories);
        dispatch(productInfo({ categoryId: updatedCategories, page: page }))
    }


    const getProductId = (productId) => {
        dispatch(addItem({
            productId: productId,
            categoryId: selectedCategories.length > 0 ? selectedCategories : null,
            page,
            sort_by_price: "low_to_high"
        }))
    }

    const sorting = (e) => {
        const sort_by_price = e.target.value
        dispatch(productInfo({ categoryId: (selectedCategories.length > 0) ? selectedCategories : null, page: page, sort_by_price: sort_by_price }))
    }
    const listOfProduct = items?.data?.length > 0 ? items.data : [];
    const { current_page, total_pages } = items?.pagination ? items.pagination : [];

    const minusQty = (product_id, qty, cart_id) => {
        const updateQty = parseInt(qty) - 1;
        dispatch(updateItem({
            productId: product_id, updateQty, cartId: cart_id,
            categoryId: selectedCategories.length > 0 ? selectedCategories : null,
            page,
            sort_by_price: "low_to_high"
        }))
    }

    const plusQty = (product_id, qty, cart_id) => {
        const updateQty = parseInt(qty) + 1;
        dispatch(updateItem({
            productId: product_id, updateQty, cartId: cart_id,
            categoryId: selectedCategories.length > 0 ? selectedCategories : null,
            page,
            sort_by_price: "low_to_high"
        }))
    }

    return (
        <>
            <Fragment>
                <div>
                    {/* Single Page Header start */}
                    <div className="container-fluid page-header py-5">
                        <h1 className="text-center text-white display-6">Shop</h1>
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item active text-white">Shop</li>
                        </ol>
                    </div>
                    {/* Single Page Header End */}
                    {/* Fruits Shop Start*/}
                    <div className="container-fluid fruite py-5">
                        <div className="container py-5">
                            <h1 className="mb-4">Fresh fruits shop</h1>
                            <div className="row g-4">
                                <div className="col-lg-12">
                                    <div className="row g-4">
                                        <div className="col-xl-3">
                                            <div className="input-group w-100 mx-auto d-flex">
                                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                            </div>
                                        </div>
                                        <div className="col-6" />
                                        <div className="col-xl-3">
                                            <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                                <label htmlFor="fruits">Default Sorting:</label>
                                                <select style={{ color: "black" }} id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform" onClick={(e) => sorting(e)}>
                                                    <option value="low_to_high">Price : Low to High</option>
                                                    <option value="high_to_low">Price : High to Low</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-lg-3">
                                            <div className="row g-4">
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <h4>Categories</h4>
                                                        <ul className="list-unstyled fruite-categorie">
                                                            {list.map((cat) => (
                                                                <li key={cat.id}>
                                                                    <div className="d-flex justify-content-between fruite-name">
                                                                        <a href=""><input type="checkbox" value={cat.id} onClick={(e) => selectCategory(e)} />  {cat.cat_name} </a>
                                                                    </div>
                                                                </li>
                                                            ))}

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="row g-4 justify-content-center">
                                                {listOfProduct.map((product) => {
                                                    return (
                                                        <div className="col-md-6 col-lg-6 col-xl-4" key={product.id}>
                                                            <div className="rounded position-relative fruite-item">
                                                                <div className="fruite-img" style={{ height: "300px", overflow: "hidden" }}>
                                                                    <img src={product.thumbnail_product_image[0]} className="img-fluid w-100 rounded-top" alt="" style={{
                                                                        width: "200px",
                                                                        height: "270px",
                                                                        objectFit: "cover",

                                                                    }} />
                                                                </div>
                                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                    <h4>{product.product_name}</h4>
                                                                    {/* <p>{product.description}</p> */}
                                                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                                                        <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                                                                        {(product.cart_qty > 0) ? (

                                                                            < div className="input-group quantity mt-4" style={{ width: 100 }}>
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
                                                                            : (<a className="btn border border-secondary rounded-pill px-3 text-primary" onClick={(e) => getProductId(product.id)}><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>)
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                }

                                                <div className="col-12">
                                                    <div className="pagination d-flex justify-content-center mt-5">
                                                        {
                                                            (page != 1) ? <a href="#" className="rounded" onClick={(e) => {
                                                                e.preventDefault();
                                                                setPage(page - 1);
                                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                                            }}>«</a> : ''
                                                        }

                                                        {
                                                            Array.from({ length: total_pages }, (_, i) => {
                                                                const pageNum = i + 1;
                                                                return (
                                                                    <a
                                                                        key={pageNum}
                                                                        href="#"
                                                                        className={pageNum === current_page ? "active rounded" : "rounded"}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setPage(pageNum);
                                                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                                                        }}
                                                                    >
                                                                        {pageNum}
                                                                    </a>
                                                                );
                                                            })
                                                        }
                                                        {
                                                            (page != total_pages) ? <a href="#" className="rounded" onClick={(e) => {
                                                                e.preventDefault();
                                                                setPage(page + 1);
                                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                                            }}>»</a> : ''
                                                        }


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fruits Shop End*/}
                </div>

            </Fragment >
        </>
    )
}

export default Shop