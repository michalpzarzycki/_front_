import Layout from '../components/Layout'
import Link from 'next/link'
const Index = () => {
    return <>
    <Layout children={"text"}/>
    <Link href='/signup'><a>Signup</a></Link>
    <Link href='/signin'><a>Signin</a></Link>
    </>
}


export default Index;