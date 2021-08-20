package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.Location;
import beans.Product;
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
				"");
		Restaurant restaurant1 = new Restaurant("Vidikovac", RestaurantType.ETNO, RestaurantStatus.OPEN, location1, "");
		ProductDAO productDAO = new ProductDAO();
		List<Product> products = productDAO.getProducts();
		restaurant.setProducts(products);
		createOrUpdate(restaurant);
		createOrUpdate(restaurant1);
	}

	public RestaurantDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public void addProductToRestaurant(Restaurant r, Product p) {
		r.addProduct(p);
	}

}
