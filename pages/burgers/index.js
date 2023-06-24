import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/Burgers.module.css"
import Image from "next/image"

export const getServerSideProps = async (ctx) => {
  const { req: { headers: { host } } } = ctx;
  const getServerPort = host.split(":")[1];

  // const res = await fetch(`http://localhost:${getServerPort}/api/getMongoData`);
  const res = await fetch(`https://nextjs-ssr-rose.vercel.app/getMongoData`);
  // https://nextjs-ssr-rose.vercel.app/
  const data = await res.json();

  return {
    props: { data },
    // props: { data, host: getServerPort }
  }
}

const Burgers = ({ data }) => {
  const router = useRouter()

  return (
    <div>
      <h1>Burgers</h1>
      {data.map((burger) => (
        <Link
          // href={{
          //   pathname: `/burgers/${burger.id}`,
          //   // pathname: `/burgers/[burgerId]`,
          //   query: { host },
          // }}
          href={`/burgers/${burger.id}`}
          key={burger._id}
        >
          <div className={styles.burgerCard}>
            <div className={styles.imageContainer}>
              <Image
                src={burger.image}
                alt={burger.name}
                width={150}
                height={150}
                // layout="responsive"
                priority={true}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h3>{burger.name}</h3>
            <p>{burger.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Burgers

//Этот вариант с запуском как клиента, так и сервера npm run serve
// export const getStaticProps = async () => {
//   const res = await fetch('/api/getMongoData', { cache: 'no-store' })
//   const data = await res.json()

//   return {
//     props: { data },
//     revalidate: 60000
//   }
// }