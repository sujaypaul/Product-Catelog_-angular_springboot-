package com.nagarro.training.ProductCatalog.product;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Products {

	@Id
	private int id;
	private String title;
	private String description;
	private int price;
	private float rating;
	private float stock;
	private String avilability;
	private String brand;
	private String category;
	private String thumbnail;
	private String images0;
	private String images1;
	private String images2;
	private String images3;
	private String images4;
	private String images5;

	public Products() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Products(int id, String title, String description, int price, float rating, float stock, String avilability,
            String brand, String category, String thumbnail, String images0, String images1, String images2,
            String images3, String images4, String images5) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.stock = stock;
        this.avilability = avilability;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
        this.images0 = images0;
        this.images1 = images1;
        this.images2 = images2;
        this.images3 = images3;
        this.images4 = images4;
        this.images5 = images5;
    }
	
	


    public String getAvilability() {
        return avilability;
    }

    public void setAvilability(String avilability) {
        this.avilability = avilability;
    }

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public float getStock() {
		return stock;
	}

	public void setStock(float stock) {
		this.stock = stock;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getImages0() {
		return images0;
	}

	public void setImages0(String images0) {
		this.images0 = images0;
	}

	public String getImages1() {
		return images1;
	}

	public void setImages1(String images1) {
		this.images1 = images1;
	}

	public String getImages2() {
		return images2;
	}

	public void setImages2(String images2) {
		this.images2 = images2;
	}

	public String getImages3() {
		return images3;
	}

	public void setImages3(String images3) {
		this.images3 = images3;
	}

	public String getImages4() {
		return images4;
	}

	public void setImages4(String images4) {
		this.images4 = images4;
	}

	public String getImages5() {
		return images5;
	}

	public void setImages5(String images5) {
		this.images5 = images5;
	}

}
