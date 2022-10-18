package com.nagarro.training.ProductCatalog.product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.training.ProductCatalog.user.Authenticate;
import com.nagarro.training.ProductCatalog.user.Cred;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private ServiceabilityRepo serviceRepo;

    @Autowired
    private Authenticate authenticate;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST, value = "ProductCatalog/search/detail={id}")
    public ResponseEntity<Products> getProductDetail(@RequestBody Cred cred, @PathVariable int id) {

        try {
            if (authenticate.check(cred)) {
                Products product = productRepo.findById(id).get();
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(product);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST, value = "ProductCatalog/search/price={id}")
    public ResponseEntity<Price> getProductPrice(@RequestBody Cred cred, @PathVariable int id) {

        try {
            if (authenticate.check(cred)) {
                Products product = productRepo.findById(id).get();
                Price price = new Price();
                price.setId(product.getId());
                price.setPrice(product.getPrice());
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(price);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST, value = "ProductCatalog/search/id={pid}/pincode={id}")
    public ResponseEntity<Integer> getProductService(@RequestBody Cred cred, @PathVariable(name = "pid") int pid,
            @PathVariable(name = "id") int id) {

        try {
            if (authenticate.check(cred)) {
                Products product = productRepo.findById(pid).get();
                if (product.getStock() > 0 && product.getAvilability().equalsIgnoreCase("Y")) {
                    Serviceability pincodeServicibility = serviceRepo.findById(id).get();
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body(pincodeServicibility.getDays());
                }
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @SuppressWarnings("unused")
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.GET, value = "ProductCatalog/search/id={id}")
    public ResponseEntity<List<Result>> getProductByCode(@PathVariable int id) {
        Result product = productRepo.getProductsById(id);

        List<Result> result = new ArrayList<>();
        result.add(product);
        if(product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.GET, value = "ProductCatalog/search/title={title}&brand={brand}")
    public List<Result> getProductByBrandandName(@PathVariable(name = "title") String title,
            @PathVariable(name = "brand") String brand) {
        List<Result> product = productRepo.findByTitleContainingAndBrandContaining(title, brand);
        return product;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST, value = "/search/id={id}")
    public ResponseEntity<List<Products>> getProductByCodewithprice(@PathVariable int id, @RequestBody Cred cred)
            throws Exception {
        Products product = productRepo.findById(id).get();

        if (authenticate.check(cred)) {
            List<Products> result = new ArrayList<>();
            result.add(product);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.POST, value = "/search/title={title}&brand={brand}")
    public ResponseEntity<List<Products>> getProductByBrandandNamewithprice(@PathVariable(name = "title") String title,
            @PathVariable(name = "brand") String brand, @RequestBody Cred cred) throws Exception {

        if (authenticate.check(cred)) {
            List<Products> product = productRepo.findByTitleContainingAndBrandContainingAndCategoryContaining(title,
                    brand, "");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(product);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}