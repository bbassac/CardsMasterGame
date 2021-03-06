package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.service.StackConstants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

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
        cardService.moveCardFromHandToPiegeForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/traps",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get Trap list",response = Deck.class)
    public Deck<Card> displayTraps(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId) {
        return playerId == 0 ? cardService.getStack(StackConstants.TRAP0) : cardService.getStack(StackConstants.TRAP1);
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
        cardService.moveCardFromPiegeToGraveyardForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/trap/{cardId}/used/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Change status of card : activated = true ",response = boolean.class)
    public boolean updateActivatedOnTrapCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "value ", type = "boolean", required = true)
            @PathVariable("value") boolean value){
        return cardService.updateUsedOnTrapCard(playerId,cardId,value);
    }

}