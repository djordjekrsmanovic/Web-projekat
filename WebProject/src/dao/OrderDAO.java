package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.Buyer;
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
		Order order1 = new Order("1112334455",cartItems,restaurant, Converter.convertStringtoDate("23.7.2021."),"djordje", OrderStatus.U_TRANSPORTU);
		Order order2 = new Order("2234549891", cartItems, restaurant, Converter.convertStringtoDate("30.5.2021."),
				"djordje", OrderStatus.U_TRANSPORTU);
		createOrUpdate(order);
		createOrUpdate(order1);
		createOrUpdate(order2);
	}

	public OrderDAO(String contextPath) {	
		this.contextPath = contextPath;
		generateOrder();
	}
	
	public List<Buyer> getBuyersForManager(String managerID, List<Buyer> kupci){
		List<Buyer> retLista = new ArrayList<Buyer>();
		for(Buyer k : kupci) {
			for(Order o : k.getOrders()) {			
			if(o.getRestaurant().getManagerID().equals(managerID)) {				
				retLista.add(k);
			}
			}
		}
		return retLista;
	}
	
	public List<Order> getOrdersForManager(String managerID){
		List<Order> retLista = new ArrayList<Order>();
		for(Order o : this.getOrders())	{
			if(o.getRestaurant().getManagerID().equals(managerID)) {
				retLista.add(o);
			}
		}
		return retLista;
	}

	public Order changeStatus(String id) {
		for(Order o : this.getOrders()) {
			if(o.getId().equals(id)) {
				o.setStatus(OrderStatus.CEKA_DOSTAVLJACA);
				this.update(o);
				return o;
			}
		}
		return null;
	}
	
	public void deliverOrder(Order ord) {
		for(Order o : this.getOrders()) {
			if(o.getId().equals(ord.getId())) {
				o.setStatus(OrderStatus.DOSTAVLJENA);
				this.update(o);
			}
		}
	}
	
}
