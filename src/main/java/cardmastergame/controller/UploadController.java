package cardmastergame.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@Api(description = "Upload custom Deck API")
public class UploadController extends AbstractController{


    @CrossOrigin
    @RequestMapping(path = "/upload/{playerId}",method = RequestMethod.PUT)
    @ResponseBody
    @ApiOperation(value = "Upload a file")

    public int uploadFile(@RequestParam("file") MultipartFile file,
                           RedirectAttributes redirectAttributes,
                          @ApiParam(value = "Player Id ", allowableValues ="0,1",required = true)
                              @PathVariable("playerId") int playerId) {
        System.out.println("Uploaded " +file.getOriginalFilename()+" for id " + playerId);

        BufferedReader br;
        List<String> result = new ArrayList<>();
        try {

            String line;
            InputStream is = file.getInputStream();
            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                result.add(line);
                System.out.println(line);
            }

        } catch (IOException e) {
            System.err.println(e.getMessage());
        }

        customRepo.filterDraw(playerId,result);

        return result.size();
    }


}