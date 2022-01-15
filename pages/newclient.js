import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router'

const NEW_CLIENT = gql`
    mutation newClient($input: ClientInput) {
        newClient(input: $input) {
            id
            name
            surname
            company
            email
            phone
        }
    }
`;

const GET_CLIENTS_USER = gql`
    query getClientsSeller {
        getClientsSeller {
            id
            name
            surname
            company
            email
        }
    }

`;

const NewClient = () => {

    const router = useRouter();

   
    const [message, saveMessage] = useState(null);


    //clean cache to update data showed in client table after add a new client
    const [ newClient ] = useMutation(NEW_CLIENT, {
        update(cache, { data: { newClient } } ) {
            
            const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_USER  });

          
            cache.writeQuery({
                query: GET_CLIENTS_USER,
                data: {
                    getClientsSeller : [...getClientsSeller, newClient ]
                }
            })
        }
    })


    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            company: '',
            email: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string() 
                        .required('Name required'),
            surname: Yup.string() 
                        .required('Surname required'),
            company: Yup.string() 
                        .required('Company required'),
            email: Yup.string()
                        .email('Email not valid') 
                        .required('Email required')
        }), 
        onSubmit: async values => {

            const {name, surname, company, email, phone } = values

            try {
                const { data } = await newClient({
                    variables: {
                        input: {
                            name, 
                            surname, 
                            company, 
                            email, 
                            phone
                        }
                    }
                });
                
                router.push('/'); 
            } catch (error) {
                saveMessage(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    saveMessage(null);
                }, 2000);
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
        <Layout>
            <h1 className="text-2xl text-gray-800 font-bold">New Client</h1>

            {message && showMessage() }

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
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
                                    placeholder="Name "
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
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
                                    placeholder="Surname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.surname}
                                />
                            </div>

                            { formik.touched.surname && formik.errors.surname ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.surname}</p>
                                </div>
                            ) : null  }


                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                    Company
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="company"
                                    type="text"
                                    placeholder="Company "
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.company}
                                />
                            </div>

                            { formik.touched.company && formik.errors.company ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.company}</p>
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

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Phone
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                            </div>

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                value="register"
                            />
                    </form>
                </div>
            </div>
        </Layout>
        
     );
}
 
export default NewClient;