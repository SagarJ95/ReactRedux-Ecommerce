import axios from "axios";
import { Fragment, useState } from "react";


const Login = () => {

    const [fromData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = fromData;

    const onChange = (e) => {
        setFormData({ ...fromData, [e.target.name]: e.target.value });
    }

    const HandleSubmitForm = async (e) => {
        e.preventDefault()

        const body = {
            email: fromData.email,
            password: fromData.password
        }

        const storeInfo = await axios.post("https://keepinbasket.ortdemo.com/login", body, {
            headers: {
                Accept: "application/json"
            }
        })

        if (storeInfo.status === 200) {
            const token = storeInfo.data.data[0].token
            localStorage.setItem("access_token", token)
            setTimeout(() => {
                location.href = "/"
            }, 1000)
        } else {

        }
    }

    return (
        <>
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                    <h1 className="text-primary">Login</h1>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <form className="" onSubmit={(e) => { HandleSubmitForm(e) }}>
                                    <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter  Email" name="email" value={email} onChange={(e) => onChange(e)} />
                                    <input type="Password" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter  Password" name="password" value={password} onChange={(e) => onChange(e)} />

                                    <input type="submit" className="w-100 btn form-control border-secondary py-3 bg-white text-primary " value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;