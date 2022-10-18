package com.nagarro.training.ProductCatalog.product;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Serviceability {
	@Id
	private int pincode;
	private int days;

	public Serviceability(int pincode, int days) {
		super();
		this.pincode = pincode;
		this.days = days;
	}

	public Serviceability() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

}
