package cardmastergame.bean;

import org.jsondoc.core.annotation.ApiObject;
import org.jsondoc.core.annotation.ApiObjectField;

@ApiObject(name="StackConstants",description = "Constants for stacks")
public enum StackConstants {
    @ApiObjectField(description = "Current environnement")
    ENVIRONNEMENT ,
    @ApiObjectField(description = "All environnements cards")
    ENVIRONNEMENTS ,
    @ApiObjectField(description = "All pioche")
    DRAW,
    @ApiObjectField(description = "All invocation cards")
    INVOCATIONS,
    @ApiObjectField(description = "Cimetiere joueur 0")
    GRAVEYARD0,
    @ApiObjectField(description = "Cimetiere joueur 1")
    GRAVEYARD1,
    @ApiObjectField(description = "Plateau joueur 0")
    BOARD0,
    @ApiObjectField(description = "Plateau joueur 1")
    BOARD1,
    @ApiObjectField(description = "Main joueur 0")
    HAND0,
    @ApiObjectField(description = "Main joueur 1")
    HAND1,
    @ApiObjectField(description = "Pile pièges joueur 0")
    TRAP0,
    @ApiObjectField(description = "Pile pièges  joueur 1")
    TRAP1
}
