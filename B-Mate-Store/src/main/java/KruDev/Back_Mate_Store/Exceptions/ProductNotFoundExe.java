package KruDev.Back_Mate_Store.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ProductNotFoundExe extends RuntimeException{
    public ProductNotFoundExe(String message){
        super(message);
    }
}
