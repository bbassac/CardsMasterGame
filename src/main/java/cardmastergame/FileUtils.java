package cardmastergame;

import java.io.File;

public class FileUtils {

    public static String getCurrentJarImgPath() {
        return getCurrentJarStaticPath() + "\\img";
    }

    public static String getCurrentJarStaticPath() {
        String staticDir = "\\static";
        String prop="";
        File currentDire = null;
        try {
            currentDire = getJarFile(Start.class);
        } catch (Exception e) {
            System.out.println("Error loding root path " + e.getMessage());
        }
        if(currentDire.isFile()){
            prop=currentDire.getParentFile()+"\\classes"+staticDir;

        }else if (currentDire.isDirectory()){
            prop =  currentDire.getPath()+"\\.."+staticDir;

        }
        return prop;
    }
    
    private static java.io.File getJarFile(Class _class) throws Exception {
        String path = _class.getPackage().getName().replace(".","/");
        String url = _class.getClassLoader().getResource(path).toString();
        url = url.replace(" ","%20");
        java.net.URI uri = new java.net.URI(url);
        if (uri.getPath()==null){
            path = uri.toString();
            if (path.startsWith("jar:file:")){

                //Update Path and Define Zipped File
                path = path.substring(path.indexOf("file:/"));
                path = path.substring(0,path.toLowerCase().indexOf(".jar")+4);

                if (path.startsWith("file://")){ //UNC Path
                    path = "C:/" + path.substring(path.indexOf("file:/")+7);
                    path = "/" + new java.net.URI(path).getPath();
                }
                else{
                    path = new java.net.URI(path).getPath();
                }
                return new java.io.File(path);
            }
        }
        else{
            return new java.io.File(uri);
        }
        return null;
    }
}
