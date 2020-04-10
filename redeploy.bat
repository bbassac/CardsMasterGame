CHCP 65001
cls
call git pull
call mvn clean package
call java -jar target\cardmastergame-1.0.jar