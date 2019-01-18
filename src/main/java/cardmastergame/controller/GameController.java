package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
public class GameController extends AbstractController{



    @CrossOrigin
    @RequestMapping(path = "/restart",method = RequestMethod.GET)
    @ResponseBody
    public String restart() throws IOException {

        customRepo.startNewGame();
        return "Loaded";
    }

    @CrossOrigin
    @RequestMapping(path = "/card/{id}",method = RequestMethod.GET)
    @ResponseBody
    public String getCardPath(@PathVariable("id") Integer id) throws IOException {

        return customRepo.getCardById(id);
    }

    @CrossOrigin
    @RequestMapping(path="/stack/{value}",method = RequestMethod.GET)
    @ResponseBody
    public Stack<Card> getStack(@PathVariable("value") StackConstants stackName) throws IOException {

        return customRepo.getStack(stackName);
    }

}