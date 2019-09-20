import React, { Component } from 'react';
import './App.css';

class Product extends Component {
  
  constructor(props){
    super(props);
    this.state = {qty:0};
    this.buy = this.buy.bind(this); //bind every event
   this.remove = this.remove.bind(this); //bind every event
   this.show = this.show.bind(this);

  }

  buy(){ 
    if (this.props.qty !== 0){
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
    this.props.handleQty(this.props.name, -1, this.props.price);
  }
  }

  remove(){
    if (this.state.qty !== 0){
      this.setState({qty: this.state.qty - 1});
      this.props.handleTotal(-this.props.price);
      this.props.handleQty(this.props.name, 1, -this.props.price);

    }
  }

  show(){
    this.props.handleShow(this.props.name);
  }





  render(){
    return(
        <div>
          <table>
            <tr>
              <td>{this.props.name} </td></tr>
              <tr>qty <td>{this.props.qty} </td>       </tr>
              price<td>{this.props.price}</td>
             <tr> <td><button type="button "class="btn btn-default" onClick={this.buy}>+</button></td>
              <td><button type="button "class="btn btn-default" onClick={this.remove}>-</button></td>
      </tr>
          </table>       
           
        </div>

      );
  }
}


class Total extends Component{
  render(){
    return(
          <div>
      <h3>Total Balance: ksh{this.props.total}</h3>
    </div>
    );
  }
}

class SelectedItem extends Component{
  render(){
     return(
          <div>
            <tr>
              <td>{this.props.name}</td>&nbsp; &nbsp;
              <td>{this.props.qty}</td> &nbsp; &nbsp;
              <td>{this.props.price}</td>&nbsp; &nbsp;
              <td><button onClick={this.remove}>-</button></td>&nbsp; &nbsp;
                        
            </tr>
          </div>
    );
  }
}





class ProductForm extends Component{
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e){
    e.preventDefault();
    var product ={
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value),
      qty: parseInt(this.refs.qty.value)

    };
    this.props.handleCreate(product);
    this.refs.name.value="";
    this.refs.price.value="";
    this.refs.qty.value="";

  }

  render(){
    return(
      <form onSubmit={this.submit} >
        <input type="text" class="form-control"placeholder="Alcohol" ref="name" /><br/>
        <input type="text" class="form-control"placeholder="Quantity" ref="qty" /><br/>
        <input type="text" class="form-control"placeholder="Price" ref="price" /><br/>
        <button type="button "class="btn btn-info">Add to Inventory</button>
      </form>
    );
  }
}

class ProductList extends Component{
  constructor(props){
    super(props);
    this.state = {
      total:0, 
      productList: [
      {name: "Beer ", qty: 20, price: 200}, 
      {name: "vodka    ", qty: 50, price: 800},
      {name: "Brandy   ", qty: 30, price: 400},
      {name: "Rum      ", qty: 40, price: 500},
      ],
      orders: []
    };
    this.calcTotal =  this.calcTotal.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.calcQty = this.calcQty.bind(this);
  }

  calcTotal(price){
    this.setState({total: this.state.total + price});

  }

  showProduct(name){
    alert("You are buying " + name);
  }

  calcQty(name, qty, price){
     
    let products = this.state.productList.map(function(prod){
      if (prod.name === name){
        prod.qty = prod.qty + qty;
        
      }


    });


    if (this.state.orders.length !== 0){
       var y = false;
      var yy;
      for(var x = 0; x <= this.state.orders.length - 1; x++){
        if(typeof this.state.orders[x] != "undefined"){
          if(this.state.orders[x]["name"] === name){
          if (qty === 1){
            this.state.orders[x]["qty"] = this.state.orders[x]["qty"] - 1 ;
            this.state.orders[x]["price"] = this.state.orders[x]["price"] + price ;
            yy = this.state.orders[x]["qty"] ;
          }else{
            this.state.orders[x]["qty"] = this.state.orders[x]["qty"] + 1 ;
            this.state.orders[x]["price"] = this.state.orders[x]["price"] + price ;
          
          }

          y = true;
          break;
         }
       }

      }

        if (y === false){

            this.setState({
              orders: this.state.orders.concat({name: name, qty: 1, price: price})
            });

         
         }

        if(yy === 0){
           delete this.state.orders[x];
     }

    }else{

          this.setState({
      orders: this.state.orders.concat({name: name, qty: 1, price: price})
    });
    }

  }

  createProduct(product){
    this.setState({
     productList: this.state.productList.concat(product)
    });

  }

  checkout(){
    alert("Thank you for buying");
  }
 

  render(){
    
    var component = this;
    var products = this.state.productList.map(function(prod){
      return(
      <Product name={prod.name} qty={prod.qty} price={prod.price} handleShow={component.showProduct} handleTotal={component.calcTotal} handleQty={component.calcQty}/>
      );
    });

     var items = this.state.orders;
     var selected ;
    if (items.length !== 0){
          selected = this.state.orders.map(function(prod){
      return(
      <SelectedItem name={prod.name} qty={prod.qty} price={prod.price} />
      );
    });

    }



    return(
      <div>
        <div className = "col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <ProductForm handleCreate={this.createProduct}/><br/>
        Inventory <br/>
        {products}
        
        </div>

        <div className = "col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <div>
         <h3>Orders</h3>
         <div className="box"> 
             
              {selected}
           
         </div>
        </div>
       
        <Total total={this.state.total}/>
        <div class="form-check">
          Pay via<br></br>
  <label class="form-check-label">
    <input type="checkbox" class="form-check-input" value=""/>Cash
  </label>
</div>
<div class="form-check">
  <label class="form-check-label">
    <input type="checkbox" class="form-check-input" value=""/>Mpesa
  </label>
</div>
<div class="form-check">
  <label class="form-check-label">
    <input type="checkbox" class="form-check-input" value=""/>Visa
  </label>
</div>
        <button class= "btn btn-success" onClick={this.checkout}>Checkout</button>
        </div>
      </div>
    );
  }
}

export default ProductList;