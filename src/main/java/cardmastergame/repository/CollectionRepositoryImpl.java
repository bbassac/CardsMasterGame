package cardmastergame.repository;

import org.springframework.stereotype.Repository;

/**
 * Created by b.bassac on 24/05/2016.
 */
@Repository

public class CollectionRepositoryImpl implements CollectionRepositoryCustom {

    @Override
    public String hello() {
        return "Hello";
    }
}
