package cardmastergame.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

import cardmastergame.bean.Card;

@RestController
@Api(description = "Player API Used for all player actions")
public class PlayerController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/pvs",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "get player Pvs",response = int.class)
    public int pvs(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId)  {
        return customRepo.getPlayerPvs(playerId);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/pvs/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Update player pvs ",response = int.class)
    public int updatePlayerPvs(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Pv value", type = "int",required = true)
            @PathVariable("value") int value)  {

        customRepo.updatePlayerPvs(playerId,value);
        return customRepo.getPlayerPvs(playerId);
    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/chakra",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get player chakras ",response = int.class)
    public int getChakra(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId)  {
        return customRepo.getChakras(playerId);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/chakra/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Update player chakra ",response = int.class)
    public int updateChakras(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Chakra value", type = "int",required = true)
            @PathVariable("value") int value){
        return customRepo.updateChakras(playerId,value);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/extra",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get player extra infos ",response = String.class)
    public String getExtra(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId)  {
        return customRepo.getExtra(playerId);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/extra/{value}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Update player extra info ",response = String.class)
    public String updateExtra(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId,

            @ApiParam(value = "Extra value", type = "String",required = true)
            @PathVariable("value") String value){
        return customRepo.updateExtra(playerId,value);

    }

    @CrossOrigin
    @RequestMapping(path = "/player/{playerId}/affinite",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "Get player affinite ",response = Card.class)
    public Card getAffinite(
            @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
            @PathVariable("playerId") int playerId)  {
        return customRepo.getAffinite(playerId);

    }

}
