package KruDev.Back_Mate_Store.Services;

import KruDev.Back_Mate_Store.Models.Product;
import KruDev.Back_Mate_Store.Repositories.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService{

    @Autowired
    private IProductRepository productRepository;


    @Override
    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product findProductById(Integer productID) {
        Product product = productRepository.findById(productID).orElse(null);
        return product;
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }
}
