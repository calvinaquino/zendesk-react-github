import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { connect } from 'react-redux';

function App(props) {
  const [list, setList] = useState([]);

  const { users } = props;
  const { requester = {} } = users;

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target;

      fetch(`https://api.github.com/search/issues?q=${value}+user:calvinaquino`,{
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      },)
      .then(res => res.json())
      .then(data => setList(data.items))
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          className="input"
          id="addInput"
          placeholder="Search Github issues"
          onKeyDown={onKeyDown}
        />
      </header>
      {list.map(item => (
        <div key={item.html_url} className="item">
          <a href={item.html_url} className="item-title">{item.title}</a>
          <p className="item-body">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

App.propTypes = {
  users: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(App);
// export default App;