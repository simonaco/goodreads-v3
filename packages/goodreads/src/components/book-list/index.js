import React, { Component } from 'react'
import { fetchBooksInProgress, fetchBooks } from './actions'
import { connect } from 'react-redux'
import { components } from '@goodreads-v2/component-library'
import { getBooks } from './selectors'
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
    const { books, authenticated } = this.props
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
  const { error } = state.auth
  const authenticated = error === null
  const books = getBooks(state)
  return { books, authenticated }
}

export default connect(mapStateToProps)(BookList)
