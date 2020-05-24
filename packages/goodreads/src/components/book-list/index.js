import React, { Component } from 'react'
import { fetchBooksInProgress, fetchBooks } from './actions'
import { connect } from 'react-redux'
import { components } from '@goodreads-v2/component-library'

const { BookGrid, BookCard } = components

class BookList extends Component {
  static defaultProps = {
    images: [],
    ratings: [],
  }

  componentDidMount = () => {
    const { dispatch, username } = this.props
    dispatch(fetchBooks())
    dispatch(fetchBooksInProgress(username))
  }

  render() {
    const { meta, images, ratings, authenticated } = this.props
    const books = meta.map((bookMeta, idx) => ({
      ...bookMeta,
      ...images[idx],
      ...ratings[idx],
    }))
    return (
      <BookGrid>
        {books.map((book) => (
          <BookCard
            key={`${book.id}${book.title}`}
            authenticated={authenticated}
            {...book}
          />
        ))}
      </BookGrid>
    )
  }
}

function mapStateToProps(state) {
  const { meta, images, ratings } = state.books
  const { error } = state.auth
  const authenticated = error === null
  return { meta, images, ratings, authenticated }
}

export default connect(mapStateToProps)(BookList)
