import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql} from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const AUTHENTICATE_USER =gql`
    mutation authenticateUser($input: AuthenticateInput) {
        authenticateUser(input: $input) {
            token
        }
    }
`

const Login = () => {

    const router = useRouter();

    const [message, saveMessage] = useState(null);

    const [ authenticateUser ] = useMutation(AUTHENTICATE_USER)


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
        onSubmit: async values => {
            console.log(values);

            const { email, password } = values;

            try {
                const { data } = await authenticateUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });
                console.log(data);
                saveMessage('Autenticando...');

                // Save token in localstorage
                setTimeout(() => {
                    const { token } = data.authenticateUser;
                    localStorage.setItem('token', token);
                }, 1000);
             
               
                setTimeout(() => {
                    saveMessage(null);
                    router.push('/');
                }, 2000);

            } catch (error) {
                saveMessage(error.message);
               

                setTimeout(() => {
                    saveMessage(null);
                }, 3000);
            }
        

        }
    })


    const showMessage = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }

    return ( 
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">Login</h1>

                {message && showMessage() }

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

                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null  }

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
                            
                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null  }
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