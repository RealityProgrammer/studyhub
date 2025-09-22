package com.hunre.it.webstudyonline.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/dis")
public class ApiDiscord {
    @Value("${discord.bot_token}")
    private String botToken;
    @Value("${discord.guild_id}")
    private String guildId;

    private WebClient webClient;

    public ApiDiscord() {
        webClient= WebClient.builder()
                .baseUrl("https://discord.com/api/v10")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bot " + botToken)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
    @GetMapping
    public Mono<String> createVoiceChannel(@RequestParam String channelName) {
        return webClient.post()
                .uri("/guilds/" + guildId + "/channels")
                .bodyValue("{\"name\": \"" + channelName + "\", \"type\": 2, \"bitrate\": 64000, \"user_limit\": 10}")
                .retrieve()
                .bodyToMono(String.class);
    }
}
