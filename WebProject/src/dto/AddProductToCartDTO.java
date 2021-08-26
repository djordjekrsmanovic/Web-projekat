package dto;

public class AddProductToCartDTO {
	public String productID;
	public String restaurantID;
	public String BuyerUsername;
	public int amount;
	
	
	public AddProductToCartDTO(String id, String restaurantID, String buyerUsername,int amount) {
		super();
		this.productID = id;
		this.restaurantID = restaurantID;
		BuyerUsername = buyerUsername;
		this.amount=amount;
	}


	public AddProductToCartDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
