package cardmastergame.controller;

import cardmastergame.bean.Card;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
public class StackController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path="/stack/{value}",method = RequestMethod.GET)
    @ResponseBody
    public Stack<Card> getStack(@PathVariable("value") String stackName) throws IOException {

      return customRepo.getStack(stackName);
    }

    @CrossOrigin
    @RequestMapping(path="/stack/{value}/{player}",method = RequestMethod.GET)
    @ResponseBody
    public void pioche(@PathVariable("value") String stackName,@PathVariable("player") int player) throws IOException {

        customRepo.pickCardFromStackToPlayer(stackName,player);
    }
}