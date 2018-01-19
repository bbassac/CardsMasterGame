package cardmastergame.bean;

import org.jsondoc.core.annotation.ApiObject;
import org.jsondoc.core.annotation.ApiObjectField;

@ApiObject
public enum StackConstants {
    @ApiObjectField(description = "Current environnement")
    ENVIRONNEMENT ,
    @ApiObjectField(description = "All environnements cards")
    ENVIRONNEMENTS ,
    @ApiObjectField(description = "All pioche")
    PIOCHE,
    @ApiObjectField(description = "All invocation cards")
    INVOCATIONS,
    @ApiObjectField(description = "Cimetiere joueur 0")
    CIMETIERE0,
    @ApiObjectField(description = "Cimetiere joueur 1")
    CIMETIERE1,
    @ApiObjectField(description = "Plateau joueur 0")
    PLATEAU0,
    @ApiObjectField(description = "Plateau joueur 1")
    PLATEAU1,
    @ApiObjectField(description = "Main joueur 0")
    MAIN0,
    @ApiObjectField(description = "Main joueur 1")
    MAIN11
}
