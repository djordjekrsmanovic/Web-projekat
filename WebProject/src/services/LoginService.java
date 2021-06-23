package services;


import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path ("/login")
public class LoginService {
	
	@POST
	@Path("")
	@Produces(MediaType.TEXT_PLAIN)
	public String login() {
		
		return "Uspjesno logovanje!";
	}
	
	@GET
	@Path("/registracija")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		System.out.println("test");
		return "OK";
	}
}
