package cardmastergame.service;

import io.swagger.annotations.ApiModelProperty;

public enum StackConstants {

    @ApiModelProperty(notes = "Current environnement")
    ENVIRONNEMENT ,
    @ApiModelProperty(notes = "All environnements cards")
    ENVIRONNEMENTS ,
    @ApiModelProperty(notes = "Pioche joueur 0")
    DRAW0,
    @ApiModelProperty(notes = "Pioche joueur 0")
    DRAW1,
    @ApiModelProperty(notes = "All invocation cards")
    INVOCATIONS,
    @ApiModelProperty(notes = "Cimetiere joueur 0")
    GRAVEYARD0,
    @ApiModelProperty(notes = "Cimetiere joueur 1")
    GRAVEYARD1,
    @ApiModelProperty(notes = "Plateau joueur 0")
    BOARD0,
    @ApiModelProperty(notes = "Plateau joueur 1")
    BOARD1,
    @ApiModelProperty(notes = "Main joueur 0")
    HAND0,
    @ApiModelProperty(notes = "Main joueur 1")
    HAND1,
    @ApiModelProperty(notes = "Pile pièges joueur 0")
    TRAP0,
    @ApiModelProperty(notes = "Pile pièges  joueur 1")
    TRAP1,
    @ApiModelProperty(notes = "Toutes cartes piege")
    ALL,
    @ApiModelProperty(notes = "Pile equipment joueur 0")
    EQUIPMENT0,
    @ApiModelProperty(notes = "Pile equipment  joueur 1")
    EQUIPMENT1,
}
