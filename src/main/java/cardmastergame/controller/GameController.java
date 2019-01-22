package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.bean.StackConstants;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;

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
    @ApiOperation(value = "Get a given stack")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = Deck.class),
            @ApiResponse(code = 401, message = "401"),
            @ApiResponse(code = 403, message = "403"),
            @ApiResponse(code = 404, message = "404"),
            @ApiResponse(code = 500, message = "500")})
    public Deck<Card> getStack(
            @ApiParam(value = "Stack Name ", type = "String", required = true,
                    allowableValues = "ENVIRONNEMENT,ENVIRONNEMENTS,DRAW,INVOCATIONS,GRAVEYARD0,GRAVEYARD1,BOARD0,BOARD1,HAND0,HAND1,TRAP0,TRAP1")
            @PathVariable("value") StackConstants stackName) {

        return customRepo.getStack(stackName);
    }

}