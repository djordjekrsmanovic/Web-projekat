package services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restaurant;
import dao.RestaurantDAO;

@Path("/restaurant")
public class RestaurantService {
	@Context
	private ServletContext servletContext;
	
	public RestaurantService() {
		
	}
	
	@PostConstruct
	public void init() {
		
		if (servletContext.getAttribute("RestaurantDAO")==null) {
			servletContext.setAttribute("RestaurantDAO", new RestaurantDAO(servletContext.getRealPath("")));
		}
	}
	
	@GET
	@Path("/load-restaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Restaurant> load(){
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		System.out.print("\n\n\n\nUSAO SAM U SERVIS RESTORANA");
		restaurantDAO.generateRestaurant();
		System.out.println("Broj restorana je " + restaurantDAO.getRestaurants().size());
		return restaurantDAO.getRestaurants();
	}
}
