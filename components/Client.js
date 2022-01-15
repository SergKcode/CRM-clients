import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id:$id) 
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


const Client = ({client}) => {
    
    const [ deleteClient ] = useMutation( DELETE_CLIENT, {
        update(cache) {
            
            const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_USER });

     
            cache.writeQuery({
                query: GET_CLIENTS_USER,
                data: {
                    getClientsSeller : getClientsSeller.filter( currentClient => currentClient.id !== id )
                }
            })
        }
    }  );

    const { name, surname, company, email, id } = client;

    const confirmClientDeleting = () => {
        Swal.fire({
            title: '¿Do you wish to deleted it?',
            text: "This action could not be cancelled",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
          }).then( async (result) => {
            if (result.value) {

                try {
                 
                    const { data } = await deleteClient({
                        variables: {
                            id
                        }
                    });
                 
                    Swal.fire(
                        'deleted!',
                        data.deleteClient,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
          })
    }

    const editClient = () => {
        Router.push({
            pathname: "/editclient/[id]",
            query: { id }
        })
    }

    return ( 
            <tr>
                <td className="border px-4 py-2">{name}  {surname}</td>
                <td className="border px-4 py-2">{company}</td>
                <td className="border px-4 py-2">{email}</td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => confirmClientDeleting() }
                    >
                        Delete

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                </td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => editClient() }
                    >
                        Edit

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
            </tr>
     );
}
 
export default Client;