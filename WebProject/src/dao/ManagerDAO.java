package dao;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import beans.Buyer;
import beans.Gender;
import beans.Manager;
import beans.Restaurant;
import beans.ShoppingCart;

public class ManagerDAO  extends GenericFileRepository<Manager, String> {
	
	protected String getPath() {
		// TODO Auto-generated method stub
		return "src"+File.separator+"DataBase"+File.separator+"manager.json";
	}

	@Override
	protected String getKey(Manager entity) {
		// TODO Auto-generated method stub
		return entity.getUsername();
	}
	
	public ManagerDAO() {
		generateBuyers();
	}
	private void generateBuyers() {
		System.out.println("Kreiram");
		Manager manager=new Manager("bojan","bojan","Bojan","Prodanovic",Gender.male,convertStringtoDate("14.01.1999."),false,false,new Restaurant());
		create(manager);
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
}
