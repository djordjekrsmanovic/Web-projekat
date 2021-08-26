package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.CartItem;
import beans.Product;
import beans.ProductType;
import beans.ShoppingCart;

public class CartDAO extends GenericFileRepository<ShoppingCart, String> {

	private String contextPath;

	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "shoppingCart.json";
	}

	@Override
	protected String getKey(ShoppingCart entity) {
		// TODO Auto-generated method stub
		return entity.getOwnerID();
	}

	public List<ShoppingCart> getShoppingCarts() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<ShoppingCart> shoppingCarts = objectMapper.convertValue(getList(),
				new TypeReference<List<ShoppingCart>>() {
				});
		return shoppingCarts;
	}

	public ShoppingCart getShoppingCartByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		ShoppingCart shoppingCart = objectMapper.convertValue(getById(id), new TypeReference<ShoppingCart>() {
		});
		return shoppingCart;
	}

	public void generateShoppingCart() {
		Product product = new Product("cevapi", "cevapi", 550, ProductType.FOOD, 350,
				"Cevapi od svinjskog i juneceg mesa", "","Plava frajla");
		Product product1 = new Product("supa", "supa", 550, ProductType.FOOD, 350, "supa od svinjskog i juneceg mesa",
				"","Plava frajla");
		CartItem cartItem = new CartItem(product, 2);
		CartItem cartItem1 = new CartItem(product1, 4);
		List<CartItem> cartItems = new ArrayList<CartItem>();
		cartItems.add(cartItem);
		cartItems.add(cartItem1);
		ShoppingCart shoppingCart = new ShoppingCart(cartItems, "djordje");
		createOrUpdate(shoppingCart);

	}

	public CartDAO(String contextPath) {
		this.contextPath = contextPath;
	}
}
