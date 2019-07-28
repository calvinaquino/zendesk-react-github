import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import { connect } from 'react-redux';

function App(props) {
  const [list, setList] = useState([]);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { users } = props;
  const { requester = {} } = users;

  let passwordRef = undefined;

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target;

      // fetch(`https://api.github.com/search/issues?q=${value}+org:clio`,{
      fetch(`https://api.github.com/search/issues?q=${value}+user:calvinaquino+repo:test-private`,{
      // fetch(`https://api.github.com/authorizations`,{
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // 'Authorization': 'Bearer fd5c0e1be3c0eccc6b0cc613018242bfc7b8c088',
          // 'Authenticate': `Basic ${Buffer.from().toString()}`,
        },
      },)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setList(data.items)
      })
      .catch(error => console.log(error));
    }
  }

  const onLoginKeyDown = (event) => {
    if (event.key === 'Enter') {
      setUsername(event.target.value)
      passwordRef.focus()
    }
  }

  const onPasswordKeyDown = () => {
    if (event.key === 'Enter') {
      const { value } = event.target;
      fetch(`https://api.github.com/auth`,{
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'Basic ' + new Buffer(username + ':' + value).toString('base64'),
          'scopes': 'repo',
        },
      },)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
    }
  }

  const renderLogin = () => {
    return (
      <div className="App">
        <header className="App-header">
        <input
            type="text"
            className="input"
            id="login"
            placeholder="Login"
            onKeyDown={onLoginKeyDown}
          />
          <input
            ref={input => passwordRef = input}
            type="password"
            className="input"
            id="password"
            placeholder="Password"
            onKeyDown={onPasswordKeyDown}
          />
        </header>
      </div>
    );
  }

  const renderSearch = () => {
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
            <a href={item.html_url} className="item-title" target="_blank">{item.title}</a>
            <p className="item-body">{item.body}</p>
          </div>
        ))}
      </div>
    );
  }

  // return (token ? renderSearch() : renderLogin());
  return renderSearch();
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