package cardmastergame.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(description = "Card API Used for all card actions")
public class CardController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/dmg/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Update damage points on card",response = int.class)
    public int updateDMGOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @PathVariable("value") int value)  {
        return customRepo.updateDmgPointsOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/dmg",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get damage points on card",response = int.class)
    public int getDMGOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId)  {
        return customRepo.getDmgOnCard(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/activated/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Change status of card : activated = true ",response = boolean.class)
    public boolean updateActivatedOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "value ", type = "boolean", required = true)
            @PathVariable("value") boolean value){
        return customRepo.updateActivatedOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/activated",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get status of card : activated = true ",response = boolean.class)
    public boolean getActivatedOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {
        return customRepo.getActivatedOnCard(playerId,cardId);
    }


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/set-not-active",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Set all cards to not activated ",response = boolean.class)
    public void setAllcardsNonActive(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId){
        customRepo.setAllcardsNonActive(playerId);
    }


    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/used/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Change status of card : used = true ",response = boolean.class)
    public boolean updateUsedOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "value ", type = "boolean", required = true)
            @PathVariable("value") boolean value){
        return customRepo.updateUsedOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/used",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get status of card : used = true ",response = boolean.class)
    public boolean getUsedOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId) {
        return customRepo.getUsedOnCard(playerId,cardId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/hidden/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Change status of card : hidden = true ",response = boolean.class)
    public boolean updateHiddendOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "value ", type = "boolean", required = true)
            @PathVariable("value") boolean value){
        return customRepo.updateHiddendOnCard(playerId,cardId,value);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/board/{cardId}/stuned/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Change status of card : stuned = true ",response = boolean.class)
    public boolean updateStunedOnCard(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Card Id ", type = "int", required = true)
            @PathVariable("cardId") int cardId,

            @ApiParam(value = "value ", type = "boolean", required = true)
            @PathVariable("value") boolean value){
        return customRepo.updateStunedOnCard(playerId,cardId,value);
    }

}