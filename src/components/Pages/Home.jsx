import React, { Fragment } from 'react'
import Banner from './HomeSection/Banner'
import Feature from './HomeSection/Featurs';
import ProductList from './HomeSection/Productlist';
import BestSeller from './HomeSection/BestSeller';
import CustomerInfo from './HomeSection/CustomerInfo';
import Testimonial from './HomeSection/Testimonal';
import FruitsProducts from './HomeSection/FruitsProduct';

function Home() {
    return (
        <>
            <Fragment>
                <div>
                    <Banner />
                    {/* Featurs Section Start */}
                    <Feature />
                    {/* Featurs Section End */}
                    <FruitsProducts />
                    {/* Fruits Shop Start*/}
                    <ProductList />
                    {/* Fruits Shop End*/}
                    {/* Bestsaler Product Start */}
                    <BestSeller />
                    {/* Bestsaler Product End */}
                    {/* Fact Start */}
                    <CustomerInfo />
                    {/* Fact Start */}
                    {/* Tastimonial Start */}
                    <Testimonial />
                    {/* Tastimonial End */}
                </div>
            </Fragment>
        </>
    )
}

export default Home;