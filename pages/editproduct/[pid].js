import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            name
            price
            stock
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $input: ProductInput) {
            updateProduct(id:$id, input:$input) {
                id
                name
                stock
                price
            }
    }
`;

const EditProduct = () => {
    const router = useRouter();
    const { query: { id } } = router;
  
    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            id
        }
    });

    const [ updateProduct ] = useMutation(UPDATE_PRODUCT);

    // Schema de validación
    const schemaValidacion = Yup.object({
        name: Yup.string() 
                    .required('Name required'), 
        stock: Yup.number()
                    .required('Add stock available')
                    .positive('Negative numbers are not accepted')
                    .integer('The number should be a integer'),
        price: Yup.number()
                    .required('Price required')
                    .positive('Negative numbers are not accepted')
    });


    if(loading) return 'Loading...';

    if(!data) { 
        return 'Action not allowed';
    }

    const updateInfoProduct = async values => {
        
        const { name, stock, price } = values;
        try {
            const {data} =  await updateProduct({
                variables: {
                    id, 
                    input: {
                        name,
                        stock,
                        price
                    }
                }
            });
         

            
            router.push('/products')

            Swal.fire(
                'Created',
                'Creation sucessful',
                'success'
            )
            
        } catch (error) {
            console.log(error);
        }
    }

    const { getProduct } = data;

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Edit product</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik 
                        enableReinitialize
                        initialValues={getProduct}
                        validationSchema={ schemaValidacion }
                        onSubmit={ values => {
                            updateInfoProduct(values)
                        }} 
                    >

                        {props => {
                            return (


                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}
                    >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.name}
                                />
                            </div>

                            { props.touched.name && props.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.name}</p>
                                </div>
                            ) : null  } 

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                    Stock
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="stock"
                                    type="number"
                                    placeholder="Stock available"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.stock}
                                />
                            </div>

                            { props.touched.stock && props.errors.stock ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.stock}</p>
                                </div>
                            ) : null  } 

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                    price
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="price"
                                    type="number"
                                    placeholder="Price"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.price}
                                />
                            </div>

                            { props.touched.price && props.errors.price ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.price}</p>
                                </div>
                            ) : null  } 

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                value="Save changes"
                            />
                    </form>
                    )
                }}
                    </Formik>
                </div>
            </div>
        </Layout>
     );
}
 
export default EditProduct;