package beans;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Converter {
	public static  Date convertStringtoDate(String date) {
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
	
	public static RestaurantType getRestaurantType(String type) {
		if (type.equalsIgnoreCase("ETNO")) {
			return RestaurantType.ETNO;
		}else if(type.equalsIgnoreCase("JAPANESE")) {
			return RestaurantType.JAPANESE;
		}else if(type.equalsIgnoreCase("GRILL")) {
			return RestaurantType.GRILL;
		}else {
			return RestaurantType.ITALIAN;
		}
	}
	
	public static RestaurantStatus getRestaurantStatus(String status) {
		if (status.equalsIgnoreCase("OPEN")) {
			return RestaurantStatus.OPEN;
		}else {
			return RestaurantStatus.CLOSED;
		}
	}
	
	public static Gender getGender(String gender) {
		if (gender.equalsIgnoreCase("muski")) {
			return Gender.male;
		}else {
			return Gender.female;
		}
	}
}
