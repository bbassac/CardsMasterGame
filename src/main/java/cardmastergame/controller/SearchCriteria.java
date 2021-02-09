package cardmastergame.controller;

public class SearchCriteria {
    private String key;
    private String operation;
    private String value;

    public SearchCriteria(String group, String group1, String group2) {
        key=group;
        operation=group1;
        value=group2;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getOperation() {
        return operation;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return "SearchCriteria{" +
                "key='" + key + '\'' +
                ", operation='" + operation + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
