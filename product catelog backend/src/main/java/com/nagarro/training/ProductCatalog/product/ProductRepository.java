package com.nagarro.training.ProductCatalog.product;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Products, Integer>{
	
	public List<Result> findByBrandContaining(String brand);
	public List<Result> findByTitleContaining(String title);
	
	public Result getProductsById(Integer id);

    public List<Result> findByTitleContainingAndBrandContaining(String title, String brand);
    
    public List<Products> findByTitleContainingAndBrandContainingAndCategoryContaining(String title, String brand,String c);

}
