
import React from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik } from 'formik';


const GET_CLIENT= gql`
    query getClient($id:ID!) {
        getClient(id:$id) {
            name
            surname
            email
            phone
            company
        }
    }
`;

const UPDATE_CLIENT = gql`
    mutation updateClient($id: ID!, $input: ClientInput) {
        updateClient(id: $id, input: $input) {
            name
            email
        }
    }
`;

const EditClient = () => {
   
    const router = useRouter();
    const { query: { id } } = router;
  
    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: {
            id
        }
    });

  
    const [ updateClient ] = useMutation(  UPDATE_CLIENT );

   
    const schemaValidacion = Yup.object({
        name: Yup.string() 
                    .required('Name required'),
        surname: Yup.string() 
                    .required('Surname required'),
        company: Yup.string() 
                    .required('Company required'),
        email: Yup.string()
                    .email('Email no válido') 
                    .required('Email  required')
    });


    if(loading) return 'Loading...';


    const { getClient } = data;


    const updateInfoClient = async values => {
        const { name, surname, company, email, phone } = values;

        try {
            const { data } = await updateClient({
                variables: {
                    id,
                    input: {
                        name, 
                        surname, 
                        company, 
                        email, 
                        phone
                    }
                }
            });

           
            Swal.fire(
                'Updated',
                'Updating successful',
                'success'
            )

            // Redireccionar
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ getClient }
                        onSubmit={ ( values ) => {
                            updateInfoClient(values)
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
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                                            Surname
                                        </label>

                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="surname"
                                            type="text"
                                            placeholder="Surname "
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.surname}
                                        />
                                    </div>

                                    { props.touched.surname && props.errors.surname ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.surname}</p>
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
                                            placeholder="Company"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.company}
                                        />
                                    </div>

                                    { props.touched.company && props.errors.company ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.company}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                    </div>

                                    { props.touched.email && props.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.phone}
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Edit"
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
 
export default EditClient;