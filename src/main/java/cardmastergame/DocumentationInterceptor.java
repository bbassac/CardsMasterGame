package cardmastergame;

import org.eclipse.jetty.server.Request;
import org.jsondoc.spring.boot.starter.JSONDocProperties;
import org.jsondoc.springmvc.controller.JSONDocController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Field;
import java.net.URL;

@Component
public class DocumentationInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private JSONDocProperties jsonDocProperties;

    @Autowired
    private JSONDocController jsonDocController;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String baseURL = extractBaseURL(request);
        jsonDocProperties.setBasePath(baseURL);
        final Field basePath = jsonDocController.getClass().getDeclaredField("basePath");
        basePath.setAccessible(true);
        basePath.set(jsonDocController, jsonDocProperties.getBasePath());
        return super.preHandle(request, response, handler);
    }

    private String extractBaseURL(HttpServletRequest request) {
        String scheme = "http://";
        String server = ((Request) request).getHttpURI().getHost();
        String port = ":"+((Request) request).getHttpURI().getPort();

        return scheme+server+port;
    }
}