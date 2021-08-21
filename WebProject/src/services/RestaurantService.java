package services;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restaurant;
import dao.ManagerDAO;
import dao.RestaurantDAO;
import dto.AdminRestaurantDTO;

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
		if (servletContext.getAttribute("ManagerDAO")==null) {
			servletContext.setAttribute("ManagerDAO", new ManagerDAO(servletContext.getRealPath("")));
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
	
	@GET
	@Path("/load-admin-restaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public List<AdminRestaurantDTO> loadRestaurantsForAdminView(){
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		ManagerDAO managerDAO=(ManagerDAO) servletContext.getAttribute("ManagerDAO");
		List<AdminRestaurantDTO> retValue=new ArrayList<AdminRestaurantDTO>();
		System.out.print("\n\n\n\nUSAO SAM U SERVIS RESTORANA");
		System.out.println("Broj restorana je " + restaurantDAO.getRestaurants().size());
		/*AdminRestaurantDTO(String name, RestaurantType restaurantType,
				RestaurantStatus restaurantStatus, Location location, String picturePath, int raiting, String managerID,
				Manager manager)*/
		for (Restaurant restaurant:restaurantDAO.getRestaurants()) {
			retValue.add(new AdminRestaurantDTO(restaurant.getName(),restaurant.getRestaurantType(),restaurant.getRestaurantStatus(),restaurant.getLocation(),restaurant.getPicturePath(),restaurant.getRaiting(),managerDAO.getManagerByID(restaurant.getManagerID())));
		}
		
		return retValue;
		
	}
	
	@GET
	@Path("get-restaurant/{param}")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant getRestaurant(@PathParam("param")String name) {
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		return restaurantDAO.getRestaurantByID(name);
	}
	
	@DELETE
	@Path("delete-restaurant/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant deleteRestaurant(@PathParam("id") String id) {
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		System.out.println("USAO SAM U BRISANJE RESTORANA");
		return restaurantDAO.deleteRestaurant(id);
	}
}
