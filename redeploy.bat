CHCP 65001
cls
call git pull
call mvn clean package
call java -Xms256m -Xmx2g -Dproduction.mode=true -jar target\cardmastergame-1.0.jar