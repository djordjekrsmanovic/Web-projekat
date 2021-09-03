package services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import dto.PictureDTO;
import java.util.Base64;



@Path("/images")
public class ImageService {

	@Context
	ServletContext servletContext;
	
	public ImageService() {
		
	}
	
	@PostConstruct
	public void init() {
		
	}
	
	@POST
	@Path("/upload-restaurant-logo")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void saveImageLogo(PictureDTO pictureDTO) throws IOException {

		
		String[] parts = pictureDTO.pictureData.split(",");
		String imageString = parts[1];
		String extension=parts[0].split(";")[0].split("/")[1];
		byte[] decodedBytes = Base64.getDecoder().decode(imageString);
		
		BufferedImage buffImg = ImageIO.read(new ByteArrayInputStream(decodedBytes));
		String basePath=servletContext.getInitParameter("path");
		String name=pictureDTO.name.replaceAll(" ", "_");
		String photoPath=basePath+File.separator+"pictures"+File.separator+"logos"+File.separator+name;
		File file = new File(photoPath + "."+extension);
		ImageIO.write(buffImg, extension, file);
		System.out.println("Image " + ".png" + " uploaded.");

	}
}
