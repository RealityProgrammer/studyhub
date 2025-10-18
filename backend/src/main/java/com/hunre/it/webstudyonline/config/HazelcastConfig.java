package com.hunre.it.webstudyonline.config;

import com.hazelcast.config.Config;
import com.hazelcast.config.JoinConfig;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.NetworkConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hunre.it.webstudyonline.model.dto.auth.SignUpUserDto;
import com.hunre.it.webstudyonline.model.dto.auth.VerifyingUserDto;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HazelcastConfig {
    @Bean(name = "hazelcastServerInstance")
    public HazelcastInstance hazelcastServerInstance() {
        Config config = new Config();
        config.getJetConfig().setEnabled(true);

        NetworkConfig network = config.getNetworkConfig();
        JoinConfig join = network.getJoin();

        // Disable multicast
        join.getMulticastConfig().setEnabled(false);

        // Enable TCP/IP if needed
        join.getTcpIpConfig().setEnabled(true).addMember("127.0.0.1");

        MapConfig mapConfig = new MapConfig("otpCodes")
                .setTimeToLiveSeconds(60);
        config.addMapConfig(mapConfig);

        config.getSerializationConfig().getCompactSerializationConfig().addClass(SignUpUserDto.class);
        config.getSerializationConfig().getCompactSerializationConfig().addClass(VerifyingUserDto.class);

        return Hazelcast.newHazelcastInstance(config);
    }
}
