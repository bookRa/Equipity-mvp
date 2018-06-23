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

class Equipity extends Component{
  render(){
    return(
      <div className="container">
        <WishList  />
        <SearchComp  />
      </div>
    )
  }
}

class WishList extends Component{
  render(){
    return(
      <div className="wishListContainer">
       <h1>Wishlist Here!</h1>
      </div>
    )
  }
}

class SearchComp extends Component{
  constructor(props){
    super(props);
    this.state={
      searchedItems: itemsArray
    }
  }

  render(){
    return(
      <div className="searchCompContainer">
       <h1>Search Component Here!</h1>
       {/* <SearchForm /> TODO IMPLEMENT */}
       <ul className="searchList">
         {
           this.state.searchedItems.map((item)=>{
             console.log(item)
             return (
             <div>
               <ListItem info={item} button={
               <button>Add this!</button>}/>
              </div>
             )
           })
         }
       </ul>
      </div>
    )
  }
}

class ListItem extends Component{
  
  render(){
    return(
      <li className="listItem" key={this.props.name}>
        <img className="itemPic" src={this.props.info.imgUrl} />
        <h5 className="itemName"> {this.props.info.name}</h5>
        <h5 className="itemprice">$ {this.props.info.price}</h5>
        {this.props.button}
      </li>
    )
  }
}

export default App;







// class Equipity extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       itemList: [{ name: 'testName', location: 'www.example.com', price: '$10.00' }]
//     }
//   }

//   handleSubmit(i) { //handles the submition of search form.
//     let composedItem = { name: i, location: 'www.example.com', price: '$10.00' }
//     this.setState({
//       itemList: this.state.itemList.concat(composedItem)
//     })

//   }


//   render() {
//     return (
//       <div className="container">
//         <h2>Enter your Item</h2>
//         <SearchForm onSubmit={(item) => this.handleSubmit(item)} />
//         <ItemList items={this.state.itemList} />
//       </div>
//     )
//   }
// }

// class SearchForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchValue: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//     // this.searchSubmit= this.searchSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({ searchValue: event.target.value });
//   }

//   // searchSubmit(event){

//   //   // this.props.handleSubmit(this.state.searchValue)
//   //   alert(this.state.searchValue + " was pressed");
//   // }

//   render() {
//     return (
//       <form onSubmit={(event) => {
//         // this.searchSubmit();
//         event.preventDefault();
//         this.props.onSubmit(this.state.searchValue);
//         this.setState({ searchValue: '' })
//       }
//       }>
//         <input
//           value={this.state.searchValue}
//           onChange={this.handleChange}
//           className="Search" type="text" placeholder="Hello World" />
//         <button type="submit" value="Enter Item">Enter Item</button>
//       </form>
//     )
//   }
// }

// class ItemList extends Component {
//   render() {
//     return (
//       <ol className='mainList'>
//         {this.props.items.map((item, index) => {
//           return <li className="listItem" key={index}>
//             <h4 className="testName">{item.name}</h4>
//             <a className="testUrl">{item.location} </a>
//             <span className="testPrice">{item.price}</span>
//           </li>
//         })}
//       </ol>
//     )
//   }
// }
