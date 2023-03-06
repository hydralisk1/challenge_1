import { useEffect, useState } from 'react'
import Image from 'next/image'
import NewPost from './newPost'
import styles from '@/styles/Home.module.css'
import starImg from '@/public/assets/star-solid.svg'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [order, setOrder] = useState('asc')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModalOn, setIsModalOn] = useState(false)
  const [isAdded, setIsAdded] = useState(true)

  useEffect(() => {
    if(isAdded)
      fetch(`/api/post?order=${order}`)
        .then(res => res.json())
        .then(res => setPosts(res.posts))
        .catch(err => console.log(err.message))
        .finally(() => {
          setIsAdded(false)
          setIsLoaded(true)
        })
  }, [order, isAdded])

  const stars = rating => Array(Math.round(rating)).fill(
    <Image
      src={starImg}
      alt='star'
      width={15}
    />
  )

  return (<>
    <div className={styles.postContainer}>
      <div className={styles.postTitle} >
        <div>
          <span className={styles.title}>Posts</span>
          <button onClick={() => setIsModalOn(true)}>New Post</button>
        </div>
        <div>
          <select
            value={order}
            onChange={e => {
              setIsAdded(true)
              setOrder(e.target.value)
            }}
          >
            <option value='asc'>asc</option>
            <option value='desc'>desc</option>
          </select>
        </div>
      </div>
      {isLoaded ?
        !posts.length ? <div>No posts yet</div> :
        posts.map(post => (
          <div key={post.id} className={styles.post}>
            <div className={styles.postHeader}>{post.title}</div>
            <div className={styles.rating}>
              {stars(post.rating).map((star, i) => <span key={i} className={styles.star}>{star}</span>)}
            </div>
            <div className={styles.postText}>{post.text}</div>
            <div className={styles.coffee}>
              {`${post.coffeeId.name} - ${post.coffeeId.caffine_content} mg per oz`}
            </div>
          </div>
        ))
      : <div>Loading...</div>}
    </div>
    {isModalOn && <NewPost setIsModalOn={setIsModalOn} setIsAdded={setIsAdded} />}
    </>
  )
}
