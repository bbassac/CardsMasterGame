package cardmastergame.controller;

import cardmastergame.bean.Card;
import cardmastergame.bean.Deck;
import cardmastergame.service.StackConstants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(description = "Equipment API for card movements")
public class EquipmentController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/equipment/{cardId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move Card from Hand to Equipment")
    public void moveCardFromHandToEquipment(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {
        cardService.moveCardFromHandToEquipmentForPlayer(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/equipments",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get Equipment list",response = Deck.class)
    public Deck<Card> displayEquipments(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId) {
        return playerId == 0 ? cardService.getStack(StackConstants.EQUIPMENT0) : cardService.getStack(StackConstants.EQUIPMENT1);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/equipment/{cardId}/graveyard",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Move card from Equipment to Graveyard player")
    public void moveCardFromEquipmentToGraveyard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {
        cardService.moveCardFromEquipmentToGraveyard(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/equipment/{cardId}/activated/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Change status of card : activated = true ",response = boolean.class)
    public boolean updateActivatedOnEquipmentCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "value ", type = "boolean", required = true)
            @PathVariable("value") boolean value){
        return cardService.updateActivatedOnEquipmentCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/equipment/{cardId}/used/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Change status of card : used = true ",response = boolean.class)
    public boolean updateUsedOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "value ", type = "boolean", required = true)
            @PathVariable("value") boolean value){
        return cardService.updateUsedOnEquipmentCard(playerId,cardId,value);
    }

}