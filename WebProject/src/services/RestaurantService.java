package services;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Address;
import beans.Converter;
import beans.Location;
import beans.Manager;
import beans.Restaurant;
import beans.RestaurantStatus;
import dao.ManagerDAO;
import dao.RestaurantDAO;
import dto.AdminRestaurantDTO;
import dto.ChangeManagerDTO;
import dto.CreateRestaurantDTO;

@Path("/restaurant")
public class RestaurantService {
	@Context
	private ServletContext servletContext;
	
	public RestaurantService() {
		
	}
	
	@PostConstruct
	public void init() {
		
		if (servletContext.getAttribute("RestaurantDAO")==null) {
			servletContext.setAttribute("RestaurantDAO", new RestaurantDAO(servletContext.getInitParameter("path")));
		}
		if (servletContext.getAttribute("ManagerDAO")==null) {
			servletContext.setAttribute("ManagerDAO", new ManagerDAO(servletContext.getInitParameter("path")));
		}
	}
	
	@GET
	@Path("/load-restaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Restaurant> load(){
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		System.out.print("\n\n\n\nUSAO SAM U SERVIS RESTORANA");
		System.out.println("Broj restorana je " + restaurantDAO.getRestaurants().size());
		List<Restaurant> restaurants=new ArrayList<Restaurant>();
		restaurants=restaurantDAO.getRestaurants();
		List<Restaurant> retVal=new ArrayList<Restaurant>();
		for (Restaurant restaurant:restaurants) {
			if(restaurant.getRestaurantStatus()==RestaurantStatus.OPEN && restaurant.isDeleted()==false) {
				retVal.add(restaurant);
			}
		}
		
		for (Restaurant restaurant:restaurants) {
			if(restaurant.getRestaurantStatus()==RestaurantStatus.CLOSED && restaurant.isDeleted()==false) {
				retVal.add(restaurant);
			}
		}
		return retVal;
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
			if(restaurant.isDeleted()==false) {
				retValue.add(new AdminRestaurantDTO(restaurant.getName(),restaurant.getRestaurantType(),restaurant.getRestaurantStatus(),restaurant.getLocation(),restaurant.getPicturePath(),restaurant.getRaiting(),managerDAO.getManagerByID(restaurant.getManagerID())));
			}
			
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
	public List<Restaurant> deleteRestaurant(@PathParam("id") String id) {
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		System.out.println("USAO SAM U BRISANJE RESTORANA");
		restaurantDAO.deleteRestaurant(id);
		return restaurantDAO.getRestaurants();
	}
	
	@POST
	@Path("/add-restaurant")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Restaurant addRestaurant(CreateRestaurantDTO restaurantDTO) {
		System.out.println("Usao sam u dodavanje restorana");
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		ManagerDAO managerDAO=(ManagerDAO) servletContext.getAttribute("ManagerDAO");
		if (restaurantDTO.username=="") {
			Address address=new Address(restaurantDTO.restaurantStreet,restaurantDTO.restaurantNumber,restaurantDTO.restaurantCity,restaurantDTO.restuarantPostalNumber);
			Location location=new Location(0,0,address);
			Restaurant restaurant=new Restaurant(restaurantDTO.restaurantName,Converter.getRestaurantType(restaurantDTO.restaurantType),Converter.getRestaurantStatus(restaurantDTO.restaurantStatus),location,restaurantDTO.URL,restaurantDTO.selectedManager);
			Manager manager=managerDAO.getManagerByID(restaurantDTO.selectedManager);
			manager.setRestaurant(restaurant);
			managerDAO.createOrUpdate(manager);
			restaurantDAO.create(restaurant);
			return restaurant;
		}else {
			Address address=new Address(restaurantDTO.restaurantStreet,restaurantDTO.restaurantNumber,restaurantDTO.restaurantCity,restaurantDTO.restuarantPostalNumber);
			Location location=new Location(0,0,address);
			Restaurant restaurant=new Restaurant(restaurantDTO.restaurantName,Converter.getRestaurantType(restaurantDTO.restaurantType),Converter.getRestaurantStatus(restaurantDTO.restaurantStatus),location,restaurantDTO.URL,restaurantDTO.selectedManager);
			Manager manager=new Manager(restaurantDTO.username,restaurantDTO.password,restaurantDTO.firstName,restaurantDTO.lastName,Converter.getGender(restaurantDTO.gender),Converter.convertStringtoDate(restaurantDTO.birthDate),false,false,restaurant);
			managerDAO.create(manager);
			restaurantDAO.create(restaurant);
			return restaurant;
		}
		
	}
	
	@POST
	@Path("/change-manager")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Restaurant changeManager(ChangeManagerDTO data) {
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		ManagerDAO managerDAO=(ManagerDAO) servletContext.getAttribute("ManagerDAO");
		Restaurant restaurant=restaurantDAO.getRestaurantByID(data.restaurantName);
		Manager manager=managerDAO.getManagerByID(data.managerUserName);
		if (manager==null || restaurant==null) {
			return null;
		}
		Manager formerManager=managerDAO.getManagerByID(restaurant.getManagerID());
		formerManager.setRestaurant(null);
		restaurant.setManagerID(manager.getUsername());
		manager.setRestaurant(restaurant);
		managerDAO.createOrUpdate(manager);
		managerDAO.createOrUpdate(formerManager);
		restaurantDAO.createOrUpdate(restaurant);
		return restaurant;
	}
	
	@GET
	@Path("check-name/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean checkName(@PathParam("id")String id) {
		boolean ret=true;
		RestaurantDAO restaurantDAO=(RestaurantDAO) servletContext.getAttribute("RestaurantDAO");
		for (Restaurant restaurant:restaurantDAO.getRestaurants()) {
			if (restaurant.getName().equals(id)) {
				ret=false;
				break;
			}
		}
		return ret;
	}
	
}
