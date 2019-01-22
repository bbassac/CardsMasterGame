package cardmastergame.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

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

}
