import React, { useContext, useState, useReducer } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserContext from "./UserContext";
import "./AddAuthorForm.css";
import { reducer } from "./AuthorQuiz";

const AuthorForm = (props) => {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         name: '',
  //         imageUrl: '',
  //         books: [],
  //         bookTemp: ''
  //     };
  //     this.onFieldChange = this.onFieldChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //     this.handleAddBook = this.handleAddBook.bind(this);
  // }

  //  const [state, dispatch] = useContext(UserContext);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [books, setBooks] = useState([]);
  const [bookTemp, setBookTemp] = useState("");

  const [state, dispatch] = useReducer(reducer, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  };
  const onFieldChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "name") {
      setName(value);
    }
    if (name === "imageUrl") {
      setImageUrl(value);
    }
    if (name === "bookTemp") {
      setBookTemp(value);
    }

    // this.setState({
    //     [event.target.name]: event.target.value
    // });
  };
  const handleAddBook = (event) => {
    setBooks(books.concat([bookTemp]));
    setBookTemp("");
    // this.setState({
    //     books: this.state.books.concat([this.state.bookTemp]),
    //     bookTemp: ''
    // })
  };
  // render() {
  return (
    <form onSubmit={() => handleSubmit}>
      <div className="AddAuthorForm__input">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={onFieldChange} />
      </div>
      <div className="AddAuthorForm__input">
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={onFieldChange}
        />
      </div>
      <div className="AddAuthorForm__input">
        {books.map((book) => (
          <p key={book}>{book}</p>
        ))}
        <label htmlFor="bookTemp">Books</label>
        <input
          type="text"
          name="bookTemp"
          value={bookTemp}
          onChange={onFieldChange}
        />
        <input
          type="button"
          value="+"
          onClick={() => {
            setBooks(books.concat([bookTemp]));
            setBookTemp("");
          }}
        />
      </div>
      <input
        type="submit"
        value="Add"
        onClick={() => {
          dispatch({ type: "ADD_AUTHOR", author: { name, imageUrl, books } });
          props.history.push("/");
        }}
      />
    </form>
  );
  // }
};

// <UserContext.Consumer>
//   {(value) => <AddAuthorForm {...value} />}
// </UserContext.Consumer>;

export const AddAuthorForm = (props) => {
  return (
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <AuthorForm {...props} />
    </div>
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    onAddAuthor: (author) => {
      dispatch({ type: "ADD_AUTHOR", author });
      props.history.push("/");
    },
  };
}

export default withRouter(AddAuthorForm);
