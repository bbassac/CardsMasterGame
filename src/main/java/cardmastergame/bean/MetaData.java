package cardmastergame.bean;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="MetaData model", description="MetaData model")
public class MetaData {
	@ApiModelProperty(notes = "Card Name")
	private String name;
	@ApiModelProperty(notes = "Amount of ATK",example = "1")
	private String attack;
	@ApiModelProperty(notes = "Amount of defense / HP",example = "1")
	private String defense;
	@ApiModelProperty(notes = "Kind of Card")
	private String kind;
	@ApiModelProperty(notes = "Cost of card",example = "1")
	private String cost;
	@ApiModelProperty(notes = "Nature of chakra")
	private String chakra;
	@ApiModelProperty(notes = "Team (or equipment type)")
	private String team;

	public String getCost() {
		return cost;
	}
	public void setCost(String cost) {
		this.cost = cost;
	}
	public String getChakra() {
		return chakra;
	}
	public void setChakra(String chakra) {
		this.chakra = chakra;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAttack() {
		return attack;
	}
	public void setAttack(String attack) {
		this.attack = attack;
	}
	public String getDefense() {
		return defense;
	}
	public void setDefense(String defense) {
		this.defense = defense;
	}
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
		this.kind = kind;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}

	public MetaData cloneMetadata(){
		MetaData toReturn = new MetaData();
		toReturn.setName(this.getName());
		toReturn.setChakra(this.getChakra());
		toReturn.setTeam(this.getTeam());
		toReturn.setKind(this.getKind());
		toReturn.setCost(this.getCost());
		toReturn.setDefense(this.getDefense());
		toReturn.setAttack(this.getAttack());
		return  toReturn;


	}
}
