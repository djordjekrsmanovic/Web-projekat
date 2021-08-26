package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.CartItem;
import beans.Converter;
import beans.Deliverer;
import beans.Gender;
import beans.Location;
import beans.Order;
import beans.OrderStatus;
import beans.Product;
import beans.ProductType;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.RestaurantType;
import beans.User;
import beans.UserRole;

public class DelivererDAO extends GenericFileRepository<Deliverer, String> {

	private String contextPath;
	public DelivererDAO() {}
	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "deliverer.json";
	}

	@Override
	protected String getKey(Deliverer entity) {
		// TODO Auto-generated method stub
		return entity.getUsername();
	}

	public List<Deliverer> getDeliverers() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Deliverer> deliverers = objectMapper.convertValue(getList(), new TypeReference<List<Deliverer>>() {
		});
		return deliverers;
	}

	public Deliverer getDelivererByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		Deliverer deliverer = objectMapper.convertValue(getById(id), new TypeReference<Deliverer>() {
		});
		return deliverer;
	}
	
	public void deleteDeliverer(String id) {
		Deliverer deliverer=getDelivererByID(id);
		if (deliverer==null) {
			return;
		}
		deliverer.setDeleted(true);
		createOrUpdate(deliverer);
	}

	public void generateDeliverer() {
		Deliverer deliverer = new Deliverer("deliverer", "deliverer", "Milan", "Markovic", Gender.male,
				Converter.convertStringtoDate("13.3.1985."), false, false);
		// mogu se dodati porudzbine
		dodajPorudzbinu(deliverer);
		createOrUpdate(deliverer);
	}

	public DelivererDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public User loginDeliverer(String username, String password) {
		List<Deliverer> deliverers = getDeliverers();
		for(Deliverer d : deliverers) {
			if(d.getUsername().equals(username) && d.getPassword().equals(password)) {
				d.setRole(UserRole.DELIVERER);
				return (User) d;
			}			
		}
		return null;
	}
	
	public boolean validUserName(String username) {
		for (Deliverer deliverer:getDeliverers()) {
			if (deliverer.getUsername().contentEquals(username)) {
				return false;
			}
		}
		
		return true;
	}
	public void banDeliverer(String id) {
		Deliverer deliverer=getDelivererByID(id);
		if (deliverer==null) {
			return;
		}
		deliverer.setBanned(!deliverer.isBanned());
		createOrUpdate(deliverer);
		
	}
	
	public void updateProfile(Deliverer oldData, User newData) {
		oldData.setUsername(newData.getUsername());
		oldData.setPassword(newData.getPassword());
		oldData.setFirstName(newData.getFirstName());
		oldData.setLastName(newData.getLastName());
		oldData.setBirthDate(newData.getBirthDate());
		oldData.setGender(newData.getGender());
		this.createOrUpdate(oldData);
	}
	
	
	public List<Order> getMyOrders(User u){
		generateDeliverer();
		for(Deliverer d : this.getDeliverers()) {
			if(d.getUsername().equals(u.getUsername())) {
				return d.getOredersWaitingForDelivery();
			}		
		}
		return null;
	}
	
	private void dodajPorudzbinu(Deliverer d) {
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
		Order order2 = new Order("2234549891", cartItems, restaurant, Converter.convertStringtoDate("30.5.2021."),
				"djordje", OrderStatus.U_TRANSPORTU);
		Order order1 = new Order("1112334455",cartItems,restaurant, Converter.convertStringtoDate("23.7.2021."),"djordje", OrderStatus.U_TRANSPORTU);
		d.getOredersWaitingForDelivery().add(order1);
		d.getOredersWaitingForDelivery().add(order2);
	}
	
}