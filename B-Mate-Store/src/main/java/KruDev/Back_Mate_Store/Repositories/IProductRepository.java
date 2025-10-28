package KruDev.Back_Mate_Store.Repositories;

import KruDev.Back_Mate_Store.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {
}
