package cardmastergame.controller;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/start")
public class GameController extends AbstractController{


    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String getCollections() throws IOException {

        customRepo.startNewGame();
        return "Loaded";
    }

}