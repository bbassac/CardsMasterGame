package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Stack;

@RestController
@Api(description = "Game API Used for general actions")
public class GameController extends AbstractController{



    @CrossOrigin
    @RequestMapping(path = "/restart",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Start a new game",response = String.class)
    public String restart() {

        customRepo.startNewGame();
        return "Loaded";
    }

    @CrossOrigin
    @RequestMapping(path = "/card/{cardId}",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get the image card path",response = String.class)
    public String getCardPath(
            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") Integer id)  {

        return customRepo.getCardById(id);
    }

    @CrossOrigin
    @RequestMapping(path="/stack/{value}",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get a given stack",response = String.class)
    public Stack<Card> getStack(
            @ApiParam(value = "Stack Name ", type = "String", required = true,
                    allowableValues = "ENVIRONNEMENT,ENVIRONNEMENTS,DRAW,INVOCATIONS,GRAVEYARD0,GRAVEYARD1,BOARD0,BOARD1,HAND0,HAND1,TRAP0,TRAP1")
            @PathVariable("value") StackConstants stackName) {

        return customRepo.getStack(stackName);
    }

}