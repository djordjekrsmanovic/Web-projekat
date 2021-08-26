package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.Location;
import beans.Product;
import beans.ProductType;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.RestaurantType;

public class RestaurantDAO extends GenericFileRepository<Restaurant, String> {

	private String contextPath;

	@Override

	protected String getPath() {
		// TODO Auto-generated method stub

		// return
		// "C:\\Users\\Djordje\\Desktop\\Web-projekat\\WebProject\\src\\DataBase\\restaurant.json";

		return contextPath + File.separator + "DataBase" + File.separator + "restaurant.json";

	}

	@Override
	protected String getKey(Restaurant entity) {
		// TODO Auto-generated method stub
		return entity.getName();
	}

	public List<Restaurant> getRestaurants() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Restaurant> restaurants = objectMapper.convertValue(getList(), new TypeReference<List<Restaurant>>() {
		});
		return restaurants;
	}

	public Restaurant getRestaurantByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		Restaurant restaurant = objectMapper.convertValue(getById(id), new TypeReference<Restaurant>() {
		});
		return restaurant;
	}

	public void generateRestaurant() {
		Address address = new Address("Spens", "5", "Novi Sad", "23000");
		Address address1 = new Address("Samarski put", "5", "Novi Sad", "23000");
		Location location = new Location(45.24, 19.84, address);
		Location location1 = new Location(44.34, 18.16, address1);

		Restaurant restaurant = new Restaurant("Plava frajla", RestaurantType.ETNO, RestaurantStatus.OPEN, location,
				"", "bojan");
		Restaurant restaurant1 = new Restaurant("Vidikovac", RestaurantType.ETNO, RestaurantStatus.OPEN, location1, "", "bojan");
		ProductDAO productDAO = new ProductDAO();
		Product product = new Product("cevapi", "cevapi", 550, ProductType.FOOD, 350,
				"Cevapi od svinjskog i juneceg mesa", "","Plava frajla");
		Product product1 = new Product("supa", "supa", 550, ProductType.FOOD, 350, "supa od svinjskog i juneceg mesa",
				"","Plava frajla");
		List<Product> products = new ArrayList<Product>();
		products.add(product);
		products.add(product1);
		restaurant.setProducts(products);
		System.out.println("Generisao sam restorane");
		createOrUpdate(restaurant);
		createOrUpdate(restaurant1);
	}

	public RestaurantDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public void addProductToRestaurant(Restaurant r, Product p) {
		Restaurant re = this.getRestaurantByID(r.getName());
		re.addProduct(p);
		this.createOrUpdate(re);
	}
	
	public Restaurant deleteRestaurant(String id) {
		Restaurant restaurant=getRestaurantByID(id);
		if (restaurant==null) {
			return null;
		}
		restaurant.setDeleted(!restaurant.isDeleted());
		return restaurant;
	}

}
