package beans;

public class ShoppingCart {
	private CartItem cartItem;
	private User cartOwner;
	private double price;
	
	public ShoppingCart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ShoppingCart(CartItem cartItem, User cartOwner, double price) {
		super();
		this.cartItem = cartItem;
		this.cartOwner = cartOwner;
		this.price = price;
	}

	public CartItem getCartItem() {
		return cartItem;
	}

	public void setCartItem(CartItem cartItem) {
		this.cartItem = cartItem;
	}

	public User getCartOwner() {
		return cartOwner;
	}

	public void setCartOwner(User cartOwner) {
		this.cartOwner = cartOwner;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	
}
