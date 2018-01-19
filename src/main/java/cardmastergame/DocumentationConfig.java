package cardmastergame;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.handler.MappedInterceptor;

@Configuration
public class DocumentationConfig {

    @Bean
    public MappedInterceptor mappedInterceptor(DocumentationInterceptor documentationInterceptor) {
        return new MappedInterceptor(new String[]{"/jsondoc*"}, documentationInterceptor);
    }

}