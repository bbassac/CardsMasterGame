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
@Api(name = "Trap API",description = "Used for Trap management")
public class TrapController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/trap/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Move a card from the hand of a player to the trap stack")
    public void moveCardFromHandToTrap(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                                       @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {
       customRepo.moveCardFromHandToTrapForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/traps",method = RequestMethod.GET)
    @ResponseBody
    @ApiMethod(description = "deck of traps")
    public Stack<Card> displayTraps(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId) throws IOException {
        return playerId == 0 ? customRepo.getStack(StackConstants.TRAP0) : customRepo.getStack(StackConstants.TRAP1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/trap/{cardId}/graveyard",method = RequestMethod.PUT)
    @ResponseBody
    @ApiMethod(description = "Move a card from the traps of a player to the graveyard")
    public void moveCardFromTrapToGraveyard(@ApiPathParam(description = "The player ID", allowedvalues = "0,1") @PathVariable("playerId") int playerId,
                                       @ApiPathParam(description = "Card ID", allowedvalues = "int") @PathVariable("cardId") int cardId) throws IOException {
        customRepo.moveCardFromTrapToGraveyard(playerId,cardId);
    }

}