package cardmastergame.controller;

import org.springframework.web.bind.annotation.*;

import cardmastergame.LogUtils;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
public class DeckController extends AbstractController{

    @CrossOrigin
    @RequestMapping(path="/deck", method = RequestMethod.PUT,produces = "text/plain")
    @ResponseBody
    public byte[] getCollections(
        @RequestBody List<String> deck) throws IOException {

           
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
          
            for (String s: deck){
                 outputStream.write(s.getBytes());
                 outputStream.write("\r\n".getBytes());
         
            }
            outputStream.close();
  
           
     
        return outputStream.toByteArray();

    }



}