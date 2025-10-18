package com.hunre.it.webstudyonline.service.impl;


import com.hunre.it.webstudyonline.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class IEmailServiceImpl implements IEmailService {
    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendVerificationEmail(String to, String subject, String text) throws MessagingException {
        Logger logger = LoggerFactory.getLogger(IEmailServiceImpl.class);

        JavaMailSenderImpl impl = (JavaMailSenderImpl)emailSender;
        logger.info("Email: \"{}\", Password: \"{}\"", impl.getUsername(), impl.getPassword());

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        emailSender.send(message);
    }
}
