import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'
import { uniq } from 'lodash'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import BookOrMagazine from './BookOrMagazine';

const App = ({ classes = {} }) => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const allIsbns = uniq([{isbn: 'none'}].concat(books.concat(magazines)).map(data => data.isbn));
  const allTitles = uniq([{title: 'none'}].concat(books.concat(magazines)).map(data => data.title));

  const fetchData = async (file) => {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value)
    const results = Papa.parse(csv, { header: true })
    return results.data
  }

  const handleChange = (val, callback) => {
    if (val === 'none') {
      callback('');
    } else {
      callback(val);
    }
  }

  useEffect(() => {
    const init = async () => {
      const authors = await fetchData('authors.csv');
      const books = await fetchData('books.csv');
      const magazines = await fetchData('magazines.csv');
      setAuthors(authors)
      setBooks(books)
      setMagazines(magazines)
    }

    init();
  }, []);
  return (
    <div className="app">
      <FormControl style={{display: 'flex', width: '200px'}}>
        <InputLabel id="isbn">Find by ISBN</InputLabel>
        <Select
          labelId="isbn"
          value={isbn}
          onChange={event => handleChange(event.target.value, setIsbn)}
        >
          {allIsbns && allIsbns.map(data => <MenuItem value={data} key={data}>{data}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl style={{display: 'flex', width: '200px'}}>
        <InputLabel id="title">Find by Title</InputLabel>
        <Select
          labelId="title"
          value={title}
          onChange={event => handleChange(event.target.value, setTitle)}
        >
          {allTitles && allTitles.map(data => <MenuItem value={data} key={data}>{data}</MenuItem>)}
        </Select>
      </FormControl>
      {
        books.concat(magazines)
          .filter(data => data.isbn === isbn || !isbn)
          .filter(data => data.title === title || !title)
          .map((book, index) => <BookOrMagazine key={index} data={book} />)
      }
    </div>
  )
};

export default App;
