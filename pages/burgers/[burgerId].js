import styles from "../../styles/Burgers.module.css"
import Image from "next/image"
import { useRouter } from 'next/router'

const BurgerParams = ({ burger }) => {
  if (!burger) {
    return <div>Burger not found</div>;
  }

  return (
    <div className={styles.singleBurger}>
      <h1>{burger.name}</h1>
      <div className={styles.imageContainer}>
        <Image
          src={burger.image}
          alt={burger.name}
          width={150}
          height={150}
          priority={true}
          // layout="responsive"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div>
        <p>{burger.description}</p>
      </div>
    </div>
  )
}

export default BurgerParams

export const getStaticPaths = async () => {
  // const res = await fetch('http://localhost:3005/api/getMongoData')
  const res = await fetch(`https://nextjs-ssr-rose.vercel.app/api/getMongoData`)
  const data = await res.json()

  const paths = data.map(burger => {
    return {
      params: { burgerId: burger.id }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.burgerId
  try {
    // const res = await fetch(`http://localhost:3005/api/getMongoData/${id}`)
    const res = await fetch(`https://nextjs-ssr-rose.vercel.app/api/getMongoData/${id}`)
    const data = await res.json()
    const burger = data.find(burger => burger.id === id)

    return {
      props: { burger }
    }
  } catch (err) {
    return {
      props: { burger: null }
    }
  }
}



// export const getServerSideProps = async (context) => {
//   const host = context.req.headers.host;
//   const getServerPort = host.split(":")[1];
//   const id = context.params.burgerId;
//   // const apiUrl = `http://localhost:${getServerPort}/api/getMongoData/${id}`;
//   const apiUrl = `https://nextjs-ssr-rose.vercel.app/api/getMongoData/${id}`;

//   try {
//     const res = await fetch(apiUrl);
//     const data = await res.json();
//     const burger = data.find((burger) => burger.id === id);

//     return {
//       props: { burger },
//       // props: { burger: data },
//     };
//   } catch (err) {
//     return {
//       props: { burger: null },
//     };
//   }
// };