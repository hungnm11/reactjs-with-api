import React from 'react';
import {PARAMS} from './core/rest-endpoint';
import fetch from './core/fetch';

class API extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.getData = this
      .getData
      .bind(this);
  }

  componentDidMount() {
    // const url = "http://www.omdbapi.com?s=star&=&r=json&plot=short"; fetch(url)
    // .then(response => response.json()) .then(json => { console.log('JSON',json);
    //    this.setState({     data: json.Search, total: json.totalResults     });
    // });
    this.getData();
  }

  getData() {
    const params = {
      key: '38947934'
    };
    return fetch(PARAMS, params).then(result => {
      this.setState({data: result.Search, total: result.totalResults});
    });
  }

  render() {
    console.log('ITEMS: ', this.state);
    const item = this
      .state
      .data
      .map(item => {
        return (
          <li key={item.imdbID}>
            <p><img src={item.Poster}/></p>
            {item.Title}
          </li>
        );
      });

    return (
      <div>Items:
        <ul>
          {item}
        </ul>
      </div>
    );
  }
}

export default API;