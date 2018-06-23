import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './items.js';
import itemsArray from './items.js';
import './ListItem.css';
// import couch.jpg, desk'.imgs/'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Equipity</h1>
          <p className="App-intro">
            Search available items, and click to add to wishlist.
        </p>
        </header>
        <Equipity></Equipity>
      </div>
    );
  }
}

class Equipity extends Component {
  constructor(props) {
    super(props);
    this.handleDelClick = this.handleDelClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.state = {
      wishListItems: [
        // {
        //   name: "testItem",
        //   price: 50.00,
        //   imgUrl: "imgs/couch.jpg",
        //   siteUrl: "http://www.testItem.com",
        //   quant: 2,
        // },
        // {
        //   name: "testItem2",
        //   price: 50.00,
        //   imgUrl: "imgs/lamp.jpg",
        //   siteUrl: "http://www.testItem.com",
        //   quant: 3
        // }
      ],
      somethingElse: true,
    }
  }

  handleDelClick(item) {
    // console.log(item);
    let newWL = this.state.wishListItems.filter((currI) => { return currI !== item });
    // console.log(newWL);
    this.setState({
      wishListItems: newWL
    })
    // console.log(this);
  }

  handleAddClick(item, quant) {
    let sameIndex = this.state.wishListItems.findIndex((wLItem) => {
      return item.name === wLItem.name
    })
    if (sameIndex > -1) {
      let newWL = this.state.wishListItems;
      newWL[sameIndex].quant = Number(newWL[sameIndex].quant) + Number(quant);
      this.setState({
        wishListItems: newWL
      })

    } else {
      let updateItem = item;
      updateItem.quant = quant;
      let newWL = this.state.wishListItems.concat(updateItem);
      this.setState({
        wishListItems: newWL
      })
    }
  }
  render() {
    return (
      <div className="container">
        <WishList items={this.state.wishListItems} delFunc={this.handleDelClick} />
        <SearchComp addFunc={this.handleAddClick} />

      </div>
    )
  }
}

class WishList extends Component {

  render() {
    return (
      <div className="wishListContainer">
        <h1>Wishlist Here!</h1>
        <ul className="wishList">
          {
            this.props.items.length === 0 ? <li id="noWishes"> Your wishlist is empty =( </li>
              :
              this.props.items.map((item, index) => {
                // console.log(item)
                return (
                  <div key={`wishList${index}`}>
                    <ListItem info={item} button={
                      <button className="deleteButton"
                        onClick={() => {
                          this.props.delFunc(item)
                        }}
                      >Delete!</button>}
                      quantSelector={"Qty: " + item.quant} />
                  </div>
                )
              })
          }
        </ul>
      </div>
    )
  }
}

class SearchComp extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchedItems: itemsArray
    }
  }

  handleSearch(str) {
    let newArr;
    if (!str) {
      newArr = itemsArray;
    } else {
      newArr = itemsArray.filter((item) => {
        return item.name.includes(str);
      })
    }
    this.setState({
      searchedItems: newArr
    }
    )
  }

  render() {
    return (
      <div className="searchCompContainer">
        <h1>Search Component Here!</h1>
        <SearchForm changeQuery={this.handleSearch} />
        <ul className="searchList">
          {
            this.state.searchedItems.map((item, index) => {
              return (
                <div key={`searchList${index}`}>
                  <ListItem info={item} button={
                    <button className="addButton"
                      onClick={() => {
                        let itemQuant = document.getElementById(`itemQuant_${item.name}`).value
                        this.props.addFunc(item, itemQuant);
                      }}
                    >Add this!</button>}
                    quantSelector={
                      <span id='quantContainer'>
                        <label htmlFor="itemQuant">How many?</label>
                        <input type="number" id={`itemQuant_${item.name}`} defaultValue='1' name="itemQuant"
                          min="1" max="100" />
                      </span>
                    } />

                </div>
              )
            })
          }
        </ul>
      </div>
    )
  }
}


class ListItem extends Component {
  //the click method returns the item object
  render() {
    return (
      <li className="listItem" key={this.props.name}>
        <img className="itemPic" alt={this.props.info.name + "img"} src={this.props.info.imgUrl} />
        <h5 className="itemName"> {this.props.info.name}</h5>
        <span>{this.props.quantSelector}</span>
        <h5 className="itemprice">$ {this.props.info.price}</h5>
        {this.props.button}
      </li>
    )
  }
}

class SearchForm extends Component {
  render() {
    return (
      <input id="searchBar" onChange={(e) => {
        this.props.changeQuery(e.target.value)
      }}
        type="text" placeholder="Search Items" />
    )
  }
}

export default App;
