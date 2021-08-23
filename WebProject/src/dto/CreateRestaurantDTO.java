package dto;

public class CreateRestaurantDTO {
	public String restaurantName;
    public String restaurantType;
    public String restaurantStatus;
    public String restaurantStreet;
    public String restaurantNumber;
    public String restaurantCity;
    public String restuarantPostalNumber;
    public String selectedManager;
    public String username;
    public String password;
    public String firstName;
    public String lastName;
    public String gender;
    public String birthDate;
    public String URL;
    
	public CreateRestaurantDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreateRestaurantDTO(String restaurantName, String restaurantType, String restaurantStatus,
			String restaurantStreet, String restaurantNumber, String restaurantCity, String restuarantPostalNumber,
			String selectedManager, String username, String password, String firstName, String lastName,
			String gender, String birthDate,String URL) {
		super();
		this.restaurantName = restaurantName;
		this.restaurantType = restaurantType;
		this.restaurantStatus = restaurantStatus;
		this.restaurantStreet = restaurantStreet;
		this.restaurantNumber = restaurantNumber;
		this.restaurantCity = restaurantCity;
		this.restuarantPostalNumber = restuarantPostalNumber;
		this.selectedManager = selectedManager;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.URL=URL;
	}
	
	
    
    
}
