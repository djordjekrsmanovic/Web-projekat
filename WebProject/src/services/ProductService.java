package services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Product;
import dao.ProductDAO;
import dao.RestaurantDAO;

@Path("/products")
public class ProductService {
	@Context
	private ServletContext servletContext;
	
	public ProductService() {
		
	}
	
	@PostConstruct
	public void init() {
		
		if (servletContext.getAttribute("ProductDAO")==null) {
			servletContext.setAttribute("ProductDAO", new ProductDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("RestaurantDAO")==null) {
			servletContext.setAttribute("RestaurantDAO", new RestaurantDAO(servletContext.getInitParameter("path")));
		}
		
	}
	
	@GET
	@Path("/get-products/{restaurantName}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Product> getProducts(@PathParam("restaurantName")String name){
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		return restaurantDAO.getRestaurantByID(name).getProducts();
	}
}
