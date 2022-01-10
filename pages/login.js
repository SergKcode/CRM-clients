import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Layout from '../components/Layout';


const Login = () => {


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('Email not valid')
                        .required('Email must not be empty'),
            password: Yup.string()
                        .required('Password required')
        }), 
        onSubmit: async valores => {
            console.log(valores);
        

        }
    })


    return ( 
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">Login</h1>

                <div className="flex justify-center mt-5">
                    <div className='w-full max-w-sm'>
                            
                        <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit} >
                            <div className='mb-4'>
                                <label  className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>
                            <div className='mb-4'>
                                <label  className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>

                            <input
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                                type="submit"
                                value="Log in"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                
                            />

                        </form>
                    </div>
                </div>
            </Layout>

      
        </>
     );
}
 
export default Login;