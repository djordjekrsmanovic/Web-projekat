package dao;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Gender;
import beans.User;
import beans.UserRole;

public class AdminDAO extends GenericFileRepository<Administrator, String> {

	private String contextPath;
	
	public AdminDAO() {}

	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return contextPath + File.separator + "DataBase" + File.separator + "admin.json";

	}

	@Override
	protected String getKey(Administrator entity) {
		// TODO Auto-generated method stub
		return entity.getUsername();
	}

	public List<Administrator> getAdminstrators() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Administrator> admins = objectMapper.convertValue(getList(), new TypeReference<List<Administrator>>() {
		});
		return admins;
	}

	public Administrator getAdministratorsByID(String id) {
		ObjectMapper objectMapper = new ObjectMapper();
		Administrator administrator = objectMapper.convertValue(getById(id), new TypeReference<Administrator>() {
		});
		return administrator;
	}

	public void generateAdmins() {
		Administrator admin = new Administrator("admin", "admin", "Milan", "Markovic", Gender.male,
				convertStringtoDate("14.01.1999."), false, false);
		Administrator admin1 = new Administrator("admin2", "admin2", "Djordje", "Krsmanovic", Gender.male,
				convertStringtoDate("14.01.1999."), false, false);
		createOrUpdate(admin);
		createOrUpdate(admin1);
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

	public AdminDAO(String contextPath) {
		this.contextPath = contextPath;
	}
	
	public User loginAdmin(String username, String password) {
		List<Administrator> admins = getAdminstrators();		
		for(Administrator a : admins) {						
			if(a.getUsername().equals(username) && a.getPassword().equals(password)) {
				a.setRole(UserRole.ADMIN);
				return (User) a;
			}			
		}
		return null;
	}
	
	public boolean validUserName(String username) {
		for (Administrator admin:getAdminstrators()) {
			if (admin.getUsername().contentEquals(username)) {
				return false;
			}
		}
		
		return true;
	}

}
