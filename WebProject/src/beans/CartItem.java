package beans;

public class CartItem {
	private Product product;
	private int amount;
	
	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartItem(Product product, int amount) {
		super();
		this.product = product;
		this.amount = amount;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	
	
	
}
