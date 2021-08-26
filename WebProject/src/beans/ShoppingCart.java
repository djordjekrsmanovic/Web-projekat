package beans;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
	private List<CartItem> cartItems;
	private double price;
	private String ownerID;
	public ShoppingCart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ShoppingCart(String ownerID) {
		this.ownerID=ownerID;
		this.price=0;
		this.cartItems=new ArrayList<CartItem>();
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public ShoppingCart(List<CartItem> cartItems, double price,String ownerID) {
		super();
		this.cartItems = cartItems;
		this.price = price;
		this.ownerID=ownerID;
	}
	
	public ShoppingCart(List<CartItem> cartItems,String ownerID) {
		super();
		this.cartItems=cartItems;
		this.ownerID=ownerID;
		calculatePrice();
	}
	
	private void calculatePrice() {
		double calculatedPrice=0;
		for (CartItem cartItem:cartItems) {
			calculatedPrice+=cartItem.getAmount()*cartItem.getProduct().getPrice();
		}
		this.price=calculatedPrice;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItem(List<CartItem> cartItem) {
		this.cartItems = cartItem;
	}

	

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}



	public String getOwnerID() {
		return ownerID;
	}



	public void setOwnerID(String ownerID) {
		this.ownerID = ownerID;
	}

	public void addCartItem(CartItem cartItem) {
		cartItems.add(cartItem);
		calculatePrice();
	}
	
	

	@Override
	public String toString() {
		return "ShoppingCart [cartItems=" + cartItems + ", price=" + price + ", ownerID=" + ownerID
				+ ", getCartItems()=" + getCartItems() + ", getPrice()=" + getPrice() + ", getOwnerID()=" + getOwnerID()
				+ "]";
	}
	
	
	
}
