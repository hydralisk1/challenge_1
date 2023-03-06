import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'

export default function NewPost({ setIsModalOn, setIsAdded }) {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [coffee, setCoffee] = useState()
  const [text, setText] = useState('')
  const [coffees, setCoffees] = useState([])

  const [errorMsg, setErrorMsg] = useState('')

  const [titleError, setTitleError] = useState(true)
  const [ratingError, setRatingError] = useState(true)
  const [textError, setTextError] = useState(true)

  const border = '1px solid black'
  const borderError = '1px solid red'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    fetch('/api/coffee')
      .then(res => {
        if(res.status < 400) return res.json()
        else throw new Error()
      })
      .then(res => setCoffees(res.coffees.map(coffee => ({id: coffee.id, name: coffee.name}))))
      .catch(err => console.log(err.message))

    return () => {document.body.style.overflow = ''}
  }, [])

  useEffect(() => {
    setTitleError(false)
    setRatingError(false)
    setTextError(false)
    setErrorMsg('')

    if(!text.length) {
      setTextError(true)
      setErrorMsg('Text is required.')
    }

    if(!rating.length) {
      setRatingError(true)
      setErrorMsg('Rating is required.')
    }else if(rating*1 > 5 || rating < 1) {
      setRatingError(true)
      setErrorMsg('Rating must be between 1.0 and 5.0.')
    }

    if(!title.length) {
      setTitleError(true)
      setErrorMsg('Title is required.')
    }
  }, [title, rating, text])

  const closeModal = () => {
    setIsModalOn(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(!titleError && !ratingError && !textError){
      fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, rating: rating*1, text, coffee: coffee*1 })
      })
        .then(res => {
          if(res.status < 400) {
            setIsAdded(true)
            setTitle('')
            setRating('')
            setText('')
            closeModal()
          }
          else {
            console.log(res.status)
            throw new Error()
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div
      className={styles.modalBackground}
      onMouseDown={closeModal}
    >
      <div
        className={styles.createPostForm}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className={styles.addCoffeeTitle}>
          Create Post
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.addPostTitle} style={{border: titleError ? borderError : border}}>
            <input
              type='text'
              value={title}
              placeholder='Title'
              onChange={e => setTitle(e.target.value)}
              className={styles.input}
              style={{fontSize: '1.2rem'}}
            />
          </div>
          <div className={styles.addRatingAndCoffee}>
            <span style={{border: ratingError ? borderError : border}}>
              <input
                type='text'
                value={rating}
                placeholder='Rating'
                onChange={e => {
                  if((!(/[^0-9][.]{2,}/.test(e.target.value)) && e.target.value*1 >= 1) || !e.target.value.length)
                    setRating(e.target.value)
                }}
                className={styles.input}
              />
            </span>
            <span>
              <span style={{fontSize: '14px', marginRight: '4px'}}>Coffee</span>
              <select
                value={coffee}
                onChange={e => setCoffee(e.target.value)}
              >
                {coffees.map(coffee => <option key={coffee.id} value={coffee.id}>{coffee.name}</option>)}
              </select>
            </span>
          </div>
          <div>
            <textarea
              value={text}
              placeholder='Post Text'
              onChange={e => setText(e.target.value)}
              style={{width: '100%', height: '100px', border: textError ? borderError : border, padding: '4px'}}
            />
          </div>
          <div className={styles.errorMessage} style={{fontSize: '1rem'}}>{ !!errorMsg.length && errorMsg }</div>
          <button style={{width: '100%', padding: '8px 0'}} type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
