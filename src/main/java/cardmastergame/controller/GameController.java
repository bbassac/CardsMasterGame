package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.service.StackConstants;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(description = "CardService API Used for general actions")
public class GameController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path = "/restart",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Start a new game",response = String.class)
    public String restart() {
        playerService.startNewGame();
        cardService.startNewGame();
        return "Loaded";
    }



    @CrossOrigin
    @RequestMapping(path="/maxchakra",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get the max value of chakra")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = Integer.class),
            @ApiResponse(code = 401, message = "401"),
            @ApiResponse(code = 403, message = "403"),
            @ApiResponse(code = 404, message = "404"),
            @ApiResponse(code = 500, message = "500")})
    public int getMaxChakra() {

        return playerService.getMaxChakra();
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
                    allowableValues = "ALL,ENVIRONNEMENT,ENVIRONNEMENTS,DRAW0,DRAW1,INVOCATIONS,GRAVEYARD0,GRAVEYARD1,BOARD0,BOARD1,HAND0,HAND1,TRAP0,TRAP1")
            @PathVariable("value") StackConstants stackName) {

        return cardService.getStack(stackName);
    }

    @CrossOrigin
    @ResponseBody
    @ApiOperation(value = "Search card with parameters")
    @RequestMapping(path="/stack/search",method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = Card.class)})
    public Deck<Card> filterCards (
            @ApiParam(value = "filters", type = "String", required = true,
                    allowableValues = "?filters=name:b,chakra:Sp%C3%A9cial,cost=6,attack%3E2,defense%3C5 operators | like : | equals = | less < %3C | greater > %3E ")
            @RequestParam String filters){
        List<SearchCriteria> params = convertFiltersToCriteria(filters);
        return cardService.searchCards(params);
    }

}