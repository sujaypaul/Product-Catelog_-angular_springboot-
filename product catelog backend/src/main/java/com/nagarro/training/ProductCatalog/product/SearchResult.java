package com.nagarro.training.ProductCatalog.product;

public class SearchResult {

	private int id;
	private String title;
	private String brand;
	private String thumbnail;

	public SearchResult() {
		super();
	}

	public SearchResult(int id, String title, String brand, String thumbnail) {
		super();
		this.id = id;
		this.title = title;
		this.brand = brand;
		this.thumbnail = thumbnail;
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

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

}
