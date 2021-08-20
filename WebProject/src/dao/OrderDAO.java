package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.CartItem;
import beans.Converter;
import beans.Location;
import beans.Order;
import beans.OrderStatus;
import beans.Product;
import beans.ProductType;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.RestaurantType;

public class OrderDAO extends GenericFileRepository<Order, String> {

	private String contextPath;

	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "order.json";
	}

	@Override
	protected String getKey(Order entity) {
		// TODO Auto-generated method stub
		return entity.getId();
	}

	public List<Order> getOrders() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Order> orders = objectMapper.convertValue(getList(), new TypeReference<List<Order>>() {
		});
		return orders;
	}

	public Order getOrderByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		Order order = objectMapper.convertValue(getById(id), new TypeReference<Order>() {
		});
		return order;
	}

	public void generateOrder() {
		/*
		 * private String id; private List<CartItem> products; private Restaurant
		 * restaurant; private Date dateAndTime; private double price; private String
		 * buyerID; private OrderStatus status;
		 */

		Product product = new Product("cevapi", "cevapi", 550, ProductType.FOOD, 350,
				"Cevapi od svinjskog i juneceg mesa", "");
		Product product1 = new Product("supa", "supa", 550, ProductType.FOOD, 350, "supa od svinjskog i juneceg mesa",
				"");
		CartItem cartItem = new CartItem(product, 2);
		CartItem cartItem1 = new CartItem(product1, 4);
		List<CartItem> cartItems = new ArrayList<CartItem>();
		cartItems.add(cartItem);
		cartItems.add(cartItem1);

		Address address = new Address("Spens", "5", "Novi Sad", "23000");

		Location location = new Location(45.24, 19.84, address);
		Restaurant restaurant = new Restaurant("Plava frajla", RestaurantType.ETNO, RestaurantStatus.OPEN, location,
				"","bojan");
		Order order = new Order("1234567891", cartItems, restaurant, Converter.convertStringtoDate("13.3.2021."),
				"djordje", OrderStatus.CEKA_DOSTAVLJACA);
		createOrUpdate(order);
	}

	public OrderDAO(String contextPath) {
		this.contextPath = contextPath;
	}

}
