package KruDev.Back_Mate_Store.Controllers;

import KruDev.Back_Mate_Store.Exceptions.ProductNotFoundExe;
import KruDev.Back_Mate_Store.Models.Product;
import KruDev.Back_Mate_Store.Services.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("B-Mate-Store")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping("/products")
    public List<Product> getProducts(){
        var products = productService.listProducts();
        return products;
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id){
        Product product = productService.findProductById(id);
        if(product == null){
            throw new ProductNotFoundExe("The product you are looking for was not found: " + id);
        }
        return ResponseEntity.ok(product);
    };

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product productFound){
        Product product = productService.findProductById(id);
        if (product == null){
            throw new ProductNotFoundExe("The ID given does not exist: " + id);
        }
        product.setName(productFound.getName());
        product.setPrice(productFound.getPrice());
        product.setStock(productFound.getStock());
        product.setDescription(productFound.getDescription());
        productService.saveProduct(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Boolean>>
    deleteProduct(@PathVariable Integer id){
        Product product = productService.findProductById(id);
        if (product == null)
            throw new ProductNotFoundExe("The ID given does not exist: " + id);
        productService.deleteProduct(product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
