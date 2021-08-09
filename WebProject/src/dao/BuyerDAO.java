package dao;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


import beans.Buyer;
import beans.Gender;
import beans.ShoppingCart;

public class BuyerDAO extends GenericFileRepository<Buyer, String> {


	@Override
	protected String getPath() {
		// TODO Auto-generated method stub
		return "src"+File.separator+"DataBase"+File.separator+"buyer.json";
	}

	@Override
	protected String getKey(Buyer entity) {
		// TODO Auto-generated method stub
		return entity.getUsername();
	}
	
	public BuyerDAO() {
		generateBuyers();
	}

	@SuppressWarnings("unused")
	private void generateBuyers() {
		System.out.println("Kreiram");
		Buyer buyer=new Buyer("djordje","djordje","Djordje","Krsmanovic",Gender.male,convertStringtoDate("14.01.1999."),false,false,new ShoppingCart(),0);
		create(buyer);
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
	
	public String login(String username, String password) {
		for(Buyer b : this.getList()) {
			if(username==b.getUsername()) {
				if(password==b.getPassword()) {
					return "Uspjesno logovanje!";
				}				
			} return "Pogrjesno korisnicko ime ili lozinka!";
		}
		return "Korisnik ne postoji!";
		} 
}
