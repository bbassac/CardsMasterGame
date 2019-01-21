package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.StackConstants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;


import java.util.Stack;

@RestController
@Api(description = "Trap API for card movements")
public class TrapController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/trap/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move Card from Hand to Trap")
    public void moveCardFromHandToTrap(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {
       customRepo.moveCardFromHandToTrapForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/traps",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get Trap list",response = Stack.class)
    public Stack<Card> displayTraps(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId) {
        return playerId == 0 ? customRepo.getStack(StackConstants.TRAP0) : customRepo.getStack(StackConstants.TRAP1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/trap/{cardId}/graveyard",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move card from Trap to Graveyard player")
    public void moveCardFromTrapToGraveyard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {
        customRepo.moveCardFromTrapToGraveyard(playerId,cardId);
    }

}