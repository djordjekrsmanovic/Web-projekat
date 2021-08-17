package dao;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.Gender;
import beans.Location;
import beans.Manager;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.RestaurantType;
import beans.User;

public class ManagerDAO extends GenericFileRepository<Manager, String> {

	private String contextPath;

	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "manager.json";
	}

	@Override
	protected String getKey(Manager entity) {
		// TODO Auto-generated method stub
		return entity.getUsername();
	}

	public ManagerDAO() {
		generateManagers();
	}

	public void generateManagers() {
		System.out.println("Kreiram");
		Address address = new Address("Spens", "5", "Novi Sad", "23000");

		Location location = new Location(45.24, 19.84, address);

		Restaurant restaurant = new Restaurant("Plava frajla", RestaurantType.ETNO, RestaurantStatus.OPEN, location,
				"");
		Manager manager = new Manager("bojan", "bojan", "Bojan", "Prodanovic", Gender.male,
				convertStringtoDate("14.01.1999."), false, false, restaurant);
		createOrUpdate(manager);
	}

	private Date convertStringtoDate(String date) {
		DateFormat format = new SimpleDateFormat("dd.MM.yyyy");
		Date retDate = null;
		try {
			retDate = format.parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			retDate = null;
		}
		return retDate;
	}

	public List<Manager> getManagersList() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Manager> managers = objectMapper.convertValue(getList(), new TypeReference<List<Manager>>() {
		});
		return managers;
	}

	public Manager getManagerByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		Manager manager = objectMapper.convertValue(getById(id), new TypeReference<Manager>() {
		});
		return manager;
	}

	public ManagerDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	public User loginManager(String username, String password) {
		List<Manager> managers = getManagersList();
		for(Manager m : managers) {
			if(m.getUsername() == username && m.getPassword()==password) {
				return (User) m;
			}			
		}
		return null;
	}
	
	public boolean validUserName(String username) {
		for (Manager manager:getManagersList()) {
			if (manager.getUsername().contentEquals(username)) {
				return false;
			}
		}
		
		return true;
	}
	
}
