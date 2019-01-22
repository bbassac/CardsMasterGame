package cardmastergame.controller;

import cardmastergame.repository.CollectionRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by b.bassac on 24/05/2016.
 */
public class AbstractController {

    @Autowired
    CollectionRepositoryCustom customRepo;


}
