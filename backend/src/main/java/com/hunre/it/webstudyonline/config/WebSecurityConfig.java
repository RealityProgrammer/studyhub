package com.hunre.it.webstudyonline.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hunre.it.webstudyonline.jwt.JwtAuthenticationEntryPoint;
import com.hunre.it.webstudyonline.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;


    public WebSecurityConfig(UserDetailsService userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter, JwtAuthenticationEntryPoint authenticationEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/api/category/delete/**","/api/category/update/**","api/category").hasAnyRole("ADMIN")
                        .requestMatchers("/api/category/findById/**","/api/category/list").permitAll()
                        .requestMatchers("/api/role/**").permitAll()
                        .requestMatchers("/api/course","/api/course/update/**","/api/course/delete/**").hasAnyRole(new String[]{"ADMIN", "TEACHER"})
                        .requestMatchers("/api/course/findById/**","/api/course/findByCondition/**","/api/course/getBestseller","/api/course/list").permitAll()
                        .requestMatchers("/api/course/findCourseByEmailTeacher").permitAll()
                        .requestMatchers("/api/account/findByCondition/**","/api/account/findByAttribute/**").hasAnyRole("ADMIN")
                        .requestMatchers("/api/account/delete/**","/api/account/findByCondition/**").hasAnyRole("ADMIN")
                        .requestMatchers("/api/account/update/**","/api/account/updatePassWord/**").permitAll()
                        .requestMatchers("/api/account/list").hasAnyRole("ADMIN")
                        .requestMatchers("/api/account/findByRole/**","api/grade/addStudentIntoGrade/**","/api/grade/deleteStudentOuttoGrade/**").hasAnyRole(new String[]{"ADMIN", "TEACHER"})
                        .requestMatchers("/api/account/getUser").permitAll()
                        .requestMatchers("/api/coursedetails","/api/coursedetails/update/**","/api/coursedetails/delete/**","/api/coursedetails/updateRecord/**").hasAnyRole("ADMIN","TEACHER")
                        .requestMatchers("/api/coursedetails/list/**","/api/coursedetails/findById/**").permitAll()
                        .requestMatchers("/api/certificate/**").hasAnyRole("ADMIN","TEACHER")
                        .requestMatchers("/api/inforTeacher/update/**","/api/inforTeacher/delete/**","/api/inforTeacher/add/**").hasAnyRole("ADMIN","TEACHER")
                        .requestMatchers("/api/grade/delete/**","/api/grade/update/**","/api/grade/findById/**","/api/grade","/api/grade/findByUser**").hasAnyRole("ADMIN","TEACHER")
                        .requestMatchers("/api/grade/findByCourse**","/api/grade/list").permitAll()
                        .requestMatchers("/api/exam/list").authenticated()
                        .requestMatchers("/api/exam/findById/**","/api/exam/findByAttribute").permitAll()
                        .requestMatchers("/api/exam","/api/exam/update/**").hasAnyRole("ADMIN","TEACHER")
                        .requestMatchers("/api/exam_details/**").permitAll()
                        .requestMatchers("/api/bill/delete/**","api/bill/findBillByAttribute", "/api/bill/findBillBetweenDates").hasAnyRole("ADMIN")
                        .requestMatchers("/api/bill/getBillByEmail").hasAnyRole("USER")
                        .requestMatchers("/api/point/add").hasAnyRole("USER")
                        .requestMatchers("/api/bill/findById/**","/api/bill/list/**","/api/bill/create/**").authenticated()
                        .requestMatchers("/api/payment/**").permitAll()
                        .requestMatchers("/api/inforTeacher/list","/api/inforTeacher/findById/**").permitAll()
                        .requestMatchers("/api/cart/list").permitAll()
                        .requestMatchers("/api/bill_details/create").authenticated()
                        .requestMatchers("/api/bill_details/list/**").authenticated()
                        .requestMatchers("/api/cart/add","/api/cart/update/**","/api/cart/delete/**").authenticated()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs.yaml").permitAll()
                        .requestMatchers("/api/statistics/**").hasAnyRole("ADMIN", "TEACHER")
                        .anyRequest().authenticated()
                );

        httpSecurity.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .permitAll()
                );

        return httpSecurity.build();
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder(14);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:3001");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
