import React, {useState} from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql} from '@apollo/client'

const NEW_ACCOUNT = gql`
    mutation newUser($input: UserInput) {
        newUser(input: $input) {
            id
            name
            surname
            email
        }
    }
`;


const NewAccount = () => {

    const [ message, saveMessage ] = useState(null)

    //get products from GraphQL
    const [ newUser ] = useMutation( NEW_ACCOUNT )


     //Form validation
     const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: ''
        }, 
        validationSchema: Yup.object({
            name: Yup.string()
                        .required('Name required'), 
            surname: Yup.string()
                        .required('Surname required'),
            email: Yup.string()
                        .email('Email not valid')
                        .required('Email required'),
            password: Yup.string()
                        .required('Password must not be empty')
                        .min(6, 'Password should contains at least 6 characters')
        }),
        onSubmit: async values => {
            const {  name, surname, email, password } = values
           
            try{
               const { data } = await newUser({
                    variables: {
                        input:{
                            name,
                            surname,
                            email,
                            password
                        }
                    }
                })
                console.log('user created')
            }catch(error){
               saveMessage(error.message) 
            
            }
            
            
        }
    });

    const showMessagge=()=>{
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>

            </div>
        )
    }

    return ( 

       
        <>
            <Layout>

                { message && showMessagge()}
                <h1 className="text-center text-2xl text-white font-light">Create New Account</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="User Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            { formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                                    Surname
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="surname"
                                    type="text"
                                    placeholder="User surname"
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.surname && formik.errors.surname ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.surname}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null  }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password "
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null  }

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                                value="Create Account"
                            />

                        </form>
                    </div>
                </div>
            </Layout>

      
        </>
     );
}
 
export default NewAccount;