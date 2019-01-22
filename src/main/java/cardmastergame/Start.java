package cardmastergame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by b.bassac on 24/05/2016.
 */
@SpringBootApplication
@EnableSwagger2
public class Start {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Start.class, args);
    }

}