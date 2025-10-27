import Layout from '../components/Layout'
import Main from '../components/Main'

const Home = () => (
  <>
    <Layout title={process.env.NEXT_PUBLIC_COMPANY_NAME}>
      <Main />
    </Layout>
  </>
)

export default Home
