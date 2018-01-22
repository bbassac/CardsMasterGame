package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiPathParam;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
@Api(name = "Game API",description = "Api used to play the game")
public class GameController extends AbstractController{



    @CrossOrigin
    @RequestMapping(path = "/restart",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "URL used to restart a game")
    public String restart() throws IOException {

        customRepo.startNewGame();
        return "Loaded";
    }

    @CrossOrigin
    @RequestMapping(path = "/card/{id}",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "URL used to retrieve a card path from it's ID")
    public String getCardPath(@PathVariable("id") Integer id) throws IOException {

        return customRepo.getCardById(id);
    }

    @CrossOrigin
    @RequestMapping(path="/stack/{value}",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "return the content of provided stack")
    public Stack<Card> getStack(@ApiPathParam(description = "The type of STACK",allowedvalues = "ENVIRONNEMENT,ENVIRONNEMENTS,PIOCHE,INVOCATIONS") @PathVariable("value") StackConstants stackName) throws IOException {

        return customRepo.getStack(stackName);
    }

}