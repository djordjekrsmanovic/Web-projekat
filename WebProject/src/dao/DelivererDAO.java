package dao;

import java.io.File;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Converter;
import beans.Deliverer;
import beans.Gender;
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
	
}
