package dao;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Buyer;
import beans.Gender;
import beans.User;
import beans.UserRole;

public class BuyerDAO extends GenericFileRepository<Buyer, String> {

	private String contextPath;
	
	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		System.out.println(contextPath);
		return contextPath+File.separator+"DataBase"+File.separator+"buyer.json";
		
	}

	@Override
	protected String getKey(Buyer entity) {
		// TODO Auto-generated method stub
		return entity.getUsername();
	}
	
	public BuyerDAO() {
		
	}

	
	public void generateBuyers() {
		System.out.println("Kreiram");
		Buyer buyer=new Buyer("djordje","djordje","Djordje","Krsmanovic",Gender.male,convertStringtoDate("14.01.1999."),false,false,0);
		createOrUpdate(buyer);
		
		
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
	
	public List<Buyer> getBuyersList(){
		ObjectMapper objectMapper=new ObjectMapper();
		List<Buyer> buyers = objectMapper.convertValue(getList(), new TypeReference<List<Buyer>>() { });
		return buyers;
	}
	
	public Buyer getBuyerByID(String id) {
		ObjectMapper objectMapper=new ObjectMapper();
		Buyer buyer=objectMapper.convertValue(getById(id), new TypeReference<Buyer>() { });
		return buyer;
	}
	
	public BuyerDAO(String contextPath) {
		this.contextPath=contextPath;
	}
	
	public void deleteBuyer(String id) {
		Buyer buyer=getBuyerByID(id);
		if(buyer==null) {
			return;
		}
		buyer.setDeleted(true);
		createOrUpdate(buyer);
	}
	
	public User loginBuyer(String username, String password) {
		List<Buyer> buyers = getBuyersList();
		for(Buyer b : buyers) {
			if(b.getUsername().equals(username) && b.getPassword().equals(password)) {
				b.setRole(UserRole.BUYER);
				return (User) b;
			}			
		}
		return null;
	}
	
	public boolean validUserName(String username) {
		for (Buyer buyer:getBuyersList()) {
			if (buyer.getUsername().contentEquals(username)) {
				return false;
			}
		}
		
		return true;
	}

	public void banBuyer(String id) {
		Buyer buyer=getBuyerByID(id);
		if(buyer==null) {
			return;
		}
		buyer.setBanned(!buyer.isBanned());
		createOrUpdate(buyer);
		
	}
}
