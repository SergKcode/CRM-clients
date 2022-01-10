import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

const Home = () =>(
    <div>
      <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
      </Layout>
    </div>
)

export default Home