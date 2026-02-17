package com.devops.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry
                .addMapping("/**")//כל הנתיבים של השרת
                .allowedOrigins("http://localhost:5173")//שרת שיכול לשלוח אלינו מידע או לקבל מידע
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")//פרוטוקולים HTTP הפרוטוקול OPTIONS כי בהתחלה נשלח מהשרת rect בדיקה
                .allowedHeaders("*");
    }
}
