package dto;

import java.util.List;

import beans.Location;
import beans.Manager;
import beans.RestaurantStatus;
import beans.RestaurantType;

public class AdminRestaurantDTO {
	public String name;
	public RestaurantType restaurantType;
	public RestaurantStatus restaurantStatus;
	public Location location;
	public String picturePath;//neka sad ovako ostane ne znam sta treba da bude
	public int raiting;
	public Manager manager;
	
	public AdminRestaurantDTO(String name, RestaurantType restaurantType,
			RestaurantStatus restaurantStatus, Location location, String picturePath, int raiting,
			Manager manager) {
		super();
		this.name = name;
		this.restaurantType = restaurantType;
		this.restaurantStatus = restaurantStatus;
		this.location = location;
		this.picturePath = picturePath;
		this.raiting = raiting;
		this.manager = manager;
	}
	
	
}
