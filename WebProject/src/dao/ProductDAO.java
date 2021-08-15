package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Product;
import beans.ProductType;
import beans.Restaurant;

public class ProductDAO extends GenericFileRepository<Product, String> {

	private String contextPath;

	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "product.json";
	}

	@Override
	protected String getKey(Product entity) {
		// TODO Auto-generated method stub
		return entity.getId();
	}

	public List<Product> getProducts() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Product> products = objectMapper.convertValue(getList(), new TypeReference<List<Product>>() {
		});
		return products;
	}

	public Product getProductByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		Product product = objectMapper.convertValue(getById(id), new TypeReference<Product>() {
		});
		return product;
	}

	public void generateProducts() {
		Product product = new Product("cevapi", "cevapi", 550, ProductType.FOOD, 350,
				"Cevapi od svinjskog i juneceg mesa", "");
		Product product1 = new Product("supa", "supa", 550, ProductType.FOOD, 350, "supa od svinjskog i juneceg mesa",
				"");
		createOrUpdate(product);
		createOrUpdate(product1);
	}

	public ProductDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public List<Product> getRestaurantProducts(String restaurantName){
		RestaurantDAO restaurantDAO=new RestaurantDAO(contextPath);
		Restaurant restaurant=restaurantDAO.getRestaurantByID(restaurantName);
		List<Product> products=new ArrayList<Product>();
		for (String product:restaurant.getProducts()) {
			products.add(getProductByID(product));
		}
		return products;
	}

}
